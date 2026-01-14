/**
 * InfinitePay Checkout API Service
 * 
 * Integração com a API pública de links de checkout InfinitePay
 * Documentação: https://developer.infinitepay.io
 */

import axios from 'axios';

// ============================================
// CONFIGURATION
// ============================================
const isDevelopment = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true;

const CONFIG = {
    // Em desenvolvimento, usa o proxy do Vite para contornar CORS
    // Em produção, chama diretamente a API
    API_BASE_URL: isDevelopment ? '/api/infinitepay' : 'https://api.infinitepay.io',
    // Sua InfiniteTag (handle) - substitua pelo seu
    HANDLE: 'snilenfx',
    // URLs de redirecionamento
    REDIRECT_URL: typeof window !== 'undefined'
        ? `${window.location.origin}/pagamento-concluido`
        : 'https://seusite.com/pagamento-concluido',
    // URL do webhook (opcional, configure no seu backend)
    WEBHOOK_URL: '',
    // IMPORTANTE: Defina como TRUE para usar a API real em desenvolvimento
    // Isso permite testar pagamentos reais durante o desenvolvimento
    FORCE_PRODUCTION_API: true,
};

// ============================================
// TYPES
// ============================================
export interface CheckoutItem {
    quantity: number;
    price: number; // Em centavos: R$ 10,00 = 1000
    description: string;
}

export interface CustomerData {
    name: string;
    email: string;
    cpf: string;
    phone?: string;
    address?: {
        cep: string;
        street?: string;
        number?: string;
        complement?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
    };
}

export interface CardData {
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
    installments: number;
}

export interface CheckoutLinkRequest {
    handle: string;
    items: CheckoutItem[];
    order_nsu?: string;
    redirect_url?: string;
    webhook_url?: string;
    customer?: {
        name: string;
        email: string;
        phone_number?: string;
    };
    address?: {
        cep: string;
        street?: string;
        neighborhood?: string;
        number?: string;
        complement?: string;
    };
}

export interface CheckoutLinkResponse {
    success: boolean;
    checkout_url?: string;
    order_nsu?: string;
    error?: {
        code: string;
        message: string;
    };
}

export interface PaymentStatusRequest {
    handle: string;
    order_nsu: string;
    transaction_nsu?: string;
    slug?: string;
}

export interface PaymentStatusResponse {
    success: boolean;
    paid: boolean;
    amount: number;
    paid_amount: number;
    installments: number;
    capture_method: 'credit_card' | 'pix';
}

export interface PaymentResponse {
    success: boolean;
    transactionId?: string;
    status: 'approved' | 'pending' | 'declined' | 'error' | 'redirect';
    message: string;
    checkoutUrl?: string;
    orderNsu?: string;
    data?: {
        qrCode?: string;
        qrCodeBase64?: string;
        copyPaste?: string;
        expiresAt?: string;
        nsu?: string;
        authorizationCode?: string;
        boletoCode?: string;
        boletoUrl?: string;
        dueDate?: string;
    };
    error?: {
        code: string;
        message: string;
        details?: string;
    };
}

// ============================================
// VALIDATION UTILITIES
// ============================================
export const Validators = {
    email: (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email.trim());
    },

    cpf: (cpf: string): boolean => {
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(cleaned)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cleaned[i]) * (10 - i);
        }
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleaned[9])) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cleaned[i]) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleaned[10])) return false;

        return true;
    },

    cep: (cep: string): boolean => {
        const cleaned = cep.replace(/\D/g, '');
        return cleaned.length === 8;
    },

    phone: (phone: string): boolean => {
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.length >= 10 && cleaned.length <= 11;
    },

    cardNumber: (number: string): boolean => {
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.length < 13 || cleaned.length > 19) return false;

        let sum = 0;
        let isEven = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    },

    cardExpiry: (expiry: string): boolean => {
        const match = expiry.match(/^(\d{2})\/(\d{2})$/);
        if (!match) return false;

        const month = parseInt(match[1]);
        const year = parseInt('20' + match[2]);

        if (month < 1 || month > 12) return false;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;

        return true;
    },

    cardCvv: (cvv: string): boolean => {
        const cleaned = cvv.replace(/\D/g, '');
        return cleaned.length >= 3 && cleaned.length <= 4;
    },

    name: (name: string): boolean => {
        const trimmed = name.trim();
        return trimmed.length >= 3 && trimmed.includes(' ');
    },
};

// ============================================
// FORMATTING UTILITIES
// ============================================
export const Formatters = {
    cpf: (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    },

    cep: (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    },

    phone: (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    },

    cardNumber: (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{4})/g, '$1 ')
            .trim()
            .slice(0, 19);
    },

    cardExpiry: (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .slice(0, 5);
    },

    currency: (value: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    },

    phoneToInternational: (phone: string): string => {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.startsWith('55')) return `+${cleaned}`;
        return `+55${cleaned}`;
    },
};

// ============================================
// API SERVICE CLASS
// ============================================
class InfinitePayService {
    private isSandbox: boolean;

    constructor() {
        // Detectar se está em modo sandbox (desenvolvimento)
        // Pode ser forçado para produção com FORCE_PRODUCTION_API
        const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true;
        this.isSandbox = isDev && !CONFIG.FORCE_PRODUCTION_API;
        console.log(`[InfinitePay] Mode: ${this.isSandbox ? 'SANDBOX' : 'PRODUCTION'}${isDev && CONFIG.FORCE_PRODUCTION_API ? ' (forçado em dev)' : ''}`);
    }

    /**
     * Gera um order_nsu único
     */
    private generateOrderNsu(): string {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `LP-${timestamp}-${random}`;
    }

    /**
     * Cria um link de checkout InfinitePay
     */
    async createCheckoutLink(
        items: { description: string; quantity: number; priceInCents: number }[],
        customer?: CustomerData,
        orderNsu?: string
    ): Promise<CheckoutLinkResponse> {
        const nsu = orderNsu || this.generateOrderNsu();

        const payload: CheckoutLinkRequest = {
            handle: CONFIG.HANDLE,
            items: items.map(item => ({
                quantity: item.quantity,
                price: item.priceInCents,
                description: item.description,
            })),
            order_nsu: nsu,
            redirect_url: CONFIG.REDIRECT_URL,
        };

        // Adicionar webhook se configurado
        if (CONFIG.WEBHOOK_URL) {
            payload.webhook_url = CONFIG.WEBHOOK_URL;
        }

        // Adicionar dados do cliente se disponíveis
        if (customer) {
            payload.customer = {
                name: customer.name,
                email: customer.email,
                phone_number: customer.phone ? Formatters.phoneToInternational(customer.phone) : undefined,
            };

            // Adicionar endereço se disponível
            if (customer.address?.cep) {
                payload.address = {
                    cep: customer.address.cep.replace(/\D/g, ''),
                    street: customer.address.street,
                    neighborhood: customer.address.neighborhood,
                    number: customer.address.number,
                    complement: customer.address.complement,
                };
            }
        }

        console.log('[InfinitePay] Creating checkout link:', payload);

        // Em modo sandbox, simular resposta
        if (this.isSandbox) {
            await this.simulateDelay(1000);

            // Simular resposta da API
            const mockUrl = `https://checkout.infinitepay.io/${CONFIG.HANDLE}/${this.generateMockSlug()}`;

            console.log('[InfinitePay] SANDBOX - Mock checkout URL:', mockUrl);

            return {
                success: true,
                checkout_url: mockUrl,
                order_nsu: nsu,
            };
        }

        // Chamada real à API
        try {
            const response = await axios.post(
                `${CONFIG.API_BASE_URL}/invoices/public/checkout/links`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('[InfinitePay] Checkout link created:', response.data);

            // A API retorna 'url' ou 'checkout_url' dependendo da versão
            const checkoutUrl = response.data.url || response.data.checkout_url;

            return {
                success: true,
                checkout_url: checkoutUrl,
                order_nsu: nsu,
            };
        } catch (error: any) {
            console.error('[InfinitePay] Error creating checkout link:', error.response?.data || error.message);

            return {
                success: false,
                error: {
                    code: error.response?.status?.toString() || 'UNKNOWN',
                    message: error.response?.data?.message || error.message || 'Erro ao criar link de checkout',
                },
            };
        }
    }

    /**
     * Processa pagamento - cria link de checkout e redireciona
     */
    async processPayment(
        items: { description: string; quantity: number; priceInReais: number }[],
        customer: CustomerData
    ): Promise<PaymentResponse> {
        console.log('[InfinitePay] Processing payment for items:', items);

        // Converter preços para centavos
        const itemsInCents = items.map(item => ({
            description: item.description,
            quantity: item.quantity,
            priceInCents: Math.round(item.priceInReais * 100),
        }));

        const result = await this.createCheckoutLink(itemsInCents, customer);

        if (!result.success || !result.checkout_url) {
            return {
                success: false,
                status: 'error',
                message: result.error?.message || 'Erro ao criar link de pagamento',
                error: result.error,
            };
        }

        return {
            success: true,
            status: 'redirect',
            message: 'Redirecionando para o checkout InfinitePay...',
            checkoutUrl: result.checkout_url,
            orderNsu: result.order_nsu,
        };
    }

    /**
     * Verifica status do pagamento
     */
    async checkPaymentStatus(orderNsu: string, transactionNsu?: string, slug?: string): Promise<PaymentStatusResponse | null> {
        console.log('[InfinitePay] Checking payment status for:', orderNsu);

        // Em modo sandbox, simular resposta
        if (this.isSandbox) {
            await this.simulateDelay(500);

            // Simular pagamento aprovado aleatoriamente
            const paid = Math.random() > 0.3;

            return {
                success: true,
                paid,
                amount: 1700,
                paid_amount: paid ? 1700 : 0,
                installments: 1,
                capture_method: 'pix',
            };
        }

        try {
            const response = await axios.post(
                `${CONFIG.API_BASE_URL}/invoices/public/checkout/payment_check`,
                {
                    handle: CONFIG.HANDLE,
                    order_nsu: orderNsu,
                    transaction_nsu: transactionNsu,
                    slug: slug,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.error('[InfinitePay] Error checking payment status:', error.message);
            return null;
        }
    }

    // ============================================
    // LEGACY METHODS (for backward compatibility)
    // ============================================

    /**
     * @deprecated Use processPayment instead
     */
    async processPix(request: { amount: number; customer: CustomerData; description: string }): Promise<PaymentResponse> {
        return this.processPayment(
            [{ description: request.description, quantity: 1, priceInReais: request.amount }],
            request.customer
        );
    }

    /**
     * @deprecated Use processPayment instead
     */
    async processCard(request: { amount: number; customer: CustomerData; card: CardData; description: string }): Promise<PaymentResponse> {
        return this.processPayment(
            [{ description: request.description, quantity: 1, priceInReais: request.amount }],
            request.customer
        );
    }

    /**
     * @deprecated Use processPayment instead
     */
    async processBoleto(request: { amount: number; customer: CustomerData; description: string }): Promise<PaymentResponse> {
        return this.processPayment(
            [{ description: request.description, quantity: 1, priceInReais: request.amount }],
            request.customer
        );
    }

    /**
     * @deprecated Use checkPaymentStatus instead
     */
    async checkStatus(transactionId: string): Promise<PaymentResponse> {
        const result = await this.checkPaymentStatus(transactionId);

        return {
            success: result?.success ?? false,
            status: result?.paid ? 'approved' : 'pending',
            message: result?.paid ? 'Pagamento aprovado' : 'Aguardando pagamento',
            transactionId,
        };
    }

    // Helper methods
    private simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private generateMockSlug(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

// Export sandbox mode flag for UI components
const _isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV === true;
export const isSandboxMode = _isDev && !CONFIG.FORCE_PRODUCTION_API;

// Export singleton instance
export const infinitePayService = new InfinitePayService();
