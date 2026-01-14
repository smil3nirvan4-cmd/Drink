import React, { useState, useEffect, useCallback } from 'react';
import {
    infinitePayService,
    Validators,
    Formatters,
    isSandboxMode
} from '../services/infinitepay';
import type { PaymentResponse, CustomerData } from '../services/infinitepay';

// ============================================
// TYPES
// ============================================
interface OrderBump {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
}

interface FormErrors {
    name?: string;
    email?: string;
    cpf?: string;
    cep?: string;
    cardNumber?: string;
    cardHolder?: string;
    cardExpiry?: string;
    cardCvv?: string;
    lgpd?: string;
}

type PaymentMethod = 'pix' | 'card' | 'boleto';
type CheckoutStep = 'form' | 'processing' | 'result';

// ============================================
// CONSTANTS
// ============================================
const BASE_PRICE = 17;
const ORIGINAL_PRICE = 297;
const ORDER_BUMPS: OrderBump[] = [
    { id: 'ebook', name: 'E-book 100 Harmonizações', description: 'Guia completo de harmonizações com petiscos', price: 5, originalPrice: 47 },
    { id: 'planilha', name: 'Planilha de Custos Pro', description: 'Calcule lucro e custo de cada drink', price: 7, originalPrice: 37 },
];

const TESTIMONIALS = [
    { name: 'Carlos M.', location: 'São Paulo', text: 'Aprendi a fazer drinks profissionais em casa!', avatar: '👨' },
    { name: 'Ana Paula', location: 'Rio de Janeiro', text: 'Melhor investimento que fiz!', avatar: '👩' },
    { name: 'Roberto S.', location: 'Belo Horizonte', text: 'Já impressionei todos os amigos!', avatar: '👨‍🦱' },
];

// ============================================
// HELPER COMPONENTS
// ============================================
const LiveVisitorsBanner: React.FC = () => {
    const [visitors, setVisitors] = useState(47);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisitors(prev => Math.max(35, Math.min(65, prev + Math.floor(Math.random() * 5) - 2)));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 text-center text-sm font-medium">
            <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                🔥 {visitors} pessoas estão vendo esta página agora
            </span>
        </div>
    );
};

const UrgencyBanner: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) { seconds = 59; minutes--; }
                if (minutes < 0) { minutes = 59; hours--; }
                if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <span className="font-bold">⚠️ OFERTA EXPIRA EM:</span>
                <div className="flex items-center gap-1 font-mono text-lg font-bold">
                    <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>:
                    <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>:
                    <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
            </div>
        </div>
    );
};

const RecentPurchasePopup: React.FC = () => {
    const [show, setShow] = useState(false);
    const [purchase, setPurchase] = useState({ name: '', city: '', time: '' });
    const names = ['Maria S.', 'João P.', 'Ana C.', 'Carlos R.', 'Fernanda L.', 'Ricardo M.'];
    const cities = ['São Paulo', 'Rio de Janeiro', 'Curitiba', 'Salvador', 'Fortaleza', 'Brasília'];

    useEffect(() => {
        const showPopup = () => {
            setPurchase({
                name: names[Math.floor(Math.random() * names.length)],
                city: cities[Math.floor(Math.random() * cities.length)],
                time: `${Math.floor(Math.random() * 5) + 1} minutos atrás`,
            });
            setShow(true);
            setTimeout(() => setShow(false), 4000);
        };
        const interval = setInterval(showPopup, 20000);
        setTimeout(showPopup, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-2xl p-4 max-w-xs z-50 border border-gray-200 animate-slide-up">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">✅</div>
                <div>
                    <p className="font-semibold text-gray-800 text-sm">{purchase.name} de {purchase.city}</p>
                    <p className="text-gray-500 text-xs">comprou o curso {purchase.time}</p>
                </div>
            </div>
        </div>
    );
};

const InputField: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: string;
    placeholder?: string;
    maxLength?: number;
    formatter?: (value: string) => string;
    icon?: string;
}> = ({ label, value, onChange, error, type = 'text', placeholder, maxLength, formatter, icon }) => {
    const hasValue = value.length > 0;
    const isValid = hasValue && !error;

    return (
        <div className="relative">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
                {label}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={e => onChange(formatter ? formatter(e.target.value) : e.target.value)}
                    className={`
                        w-full px-4 py-4 
                        ${icon ? 'pl-12' : ''} 
                        text-gray-900 text-base font-medium
                        bg-white
                        border-2 rounded-xl 
                        transition-all duration-200
                        placeholder:text-gray-400 placeholder:font-normal
                        focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                        ${error
                            ? 'border-red-400 bg-red-50 focus:ring-red-100 focus:border-red-500'
                            : isValid
                                ? 'border-green-400 bg-green-50/30'
                                : 'border-gray-200 hover:border-gray-300'
                        }
                    `}
                    placeholder={placeholder}
                    maxLength={maxLength}
                />
                {/* Status indicator */}
                {hasValue && (
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg ${error ? 'text-red-500' : 'text-green-500'}`}>
                        {error ? '⚠️' : '✓'}
                    </span>
                )}
            </div>
            {error && (
                <p className="text-red-600 text-sm mt-2 flex items-center gap-1 font-medium">
                    <span className="text-red-500">●</span> {error}
                </p>
            )}
        </div>
    );
};

// ============================================
// MAIN CHECKOUT COMPONENT
// ============================================
const Checkout: React.FC = () => {
    // Form State
    const [customer, setCustomer] = useState<CustomerData>({ name: '', email: '', cpf: '', phone: '', address: { cep: '' } });
    const [selectedBumps, setSelectedBumps] = useState<string[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
    const [lgpdConsent, setLgpdConsent] = useState(false);

    // UI State
    const [step, setStep] = useState<CheckoutStep>('form');
    const [errors, setErrors] = useState<FormErrors>({});
    const [result, setResult] = useState<PaymentResponse | null>(null);
    const [pollingInterval, setPollingInterval] = useState<ReturnType<typeof setInterval> | null>(null);

    // Calculate totals
    const total = selectedBumps.reduce((sum, id) => {
        const bump = ORDER_BUMPS.find(b => b.id === id);
        return sum + (bump?.price || 0);
    }, BASE_PRICE);

    const savings = ORIGINAL_PRICE - BASE_PRICE + selectedBumps.reduce((sum, id) => {
        const bump = ORDER_BUMPS.find(b => b.id === id);
        return sum + ((bump?.originalPrice || 0) - (bump?.price || 0));
    }, 0);

    // Cleanup polling on unmount
    useEffect(() => {
        return () => {
            if (pollingInterval) clearInterval(pollingInterval);
        };
    }, [pollingInterval]);

    // Toggle bump selection
    const toggleBump = (id: string) => {
        setSelectedBumps(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
    };

    // Validate form
    const validate = useCallback((): boolean => {
        const newErrors: FormErrors = {};

        // Customer validation
        if (!Validators.name(customer.name)) {
            newErrors.name = 'Informe nome completo (nome e sobrenome)';
        }
        if (!Validators.email(customer.email)) {
            newErrors.email = 'E-mail inválido';
        }
        if (!Validators.cpf(customer.cpf)) {
            newErrors.cpf = 'CPF inválido';
        }
        if (!Validators.cep(customer.address?.cep || '')) {
            newErrors.cep = 'CEP inválido (8 dígitos)';
        }
        if (!lgpdConsent) {
            newErrors.lgpd = 'Você precisa aceitar os termos para continuar';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [customer, lgpdConsent]);

    // Submit payment
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            // Scroll to first error
            const firstErrorField = document.querySelector('.border-red-400, .border-red-500');
            firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setStep('processing');
        setResult(null);

        try {
            // Preparar lista de itens para o checkout
            const items: { description: string; quantity: number; priceInReais: number }[] = [
                { description: 'Curso Completo de Drinks', quantity: 1, priceInReais: BASE_PRICE }
            ];

            // Adicionar order bumps selecionados
            selectedBumps.forEach(bumpId => {
                const bump = ORDER_BUMPS.find(b => b.id === bumpId);
                if (bump) {
                    items.push({
                        description: bump.name,
                        quantity: 1,
                        priceInReais: bump.price,
                    });
                }
            });

            // Processar pagamento via InfinitePay
            const paymentResult = await infinitePayService.processPayment(items, customer);

            // Se o resultado for redirect, abrir em popup (checkout semi-transparente)
            if (paymentResult.status === 'redirect' && paymentResult.checkoutUrl) {
                // Salvar order_nsu no localStorage para verificar depois
                if (paymentResult.orderNsu) {
                    localStorage.setItem('lp_drink_order_nsu', paymentResult.orderNsu);
                }

                // Configurações do popup
                const POPUP_WIDTH = 500;
                const POPUP_HEIGHT = 700;
                const left = (window.screen.width - POPUP_WIDTH) / 2;
                const top = (window.screen.height - POPUP_HEIGHT) / 2;

                // Abrir popup com checkout InfinitePay
                const popup = window.open(
                    paymentResult.checkoutUrl,
                    'infinitepay_checkout',
                    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},scrollbars=yes,resizable=yes`
                );

                if (popup) {
                    popup.focus();

                    // Mostrar estado de aguardando pagamento
                    setResult({
                        ...paymentResult,
                        status: 'pending',
                        message: '⏳ Aguardando pagamento na janela aberta...',
                    });
                    setStep('result');

                    // Monitorar popup para detectar conclusão
                    const checkPopup = setInterval(() => {
                        if (popup.closed) {
                            clearInterval(checkPopup);
                            // Redirecionar para página de confirmação
                            window.location.href = `/pagamento-concluido?order_nsu=${paymentResult.orderNsu}`;
                        }
                    }, 500);
                } else {
                    // Popup bloqueado - fallback para redirect tradicional
                    console.warn('[Checkout] Popup bloqueado, fazendo redirect...');
                    setResult({
                        ...paymentResult,
                        message: '✓ Link de pagamento gerado! Redirecionando...',
                    });
                    setStep('result');
                    setTimeout(() => {
                        window.location.href = paymentResult.checkoutUrl!;
                    }, 2000);
                }
                return;
            }

            // Outros status (erro, etc)
            setResult(paymentResult);
            setStep('result');

        } catch (error: any) {
            console.error('[Checkout] Payment error:', error);
            setResult({
                success: false,
                status: 'error',
                message: error.message || 'Erro ao processar pagamento. Tente novamente.',
            });
            setStep('result');
        }
    };

    // Retry payment
    const handleRetry = () => {
        setStep('form');
        setResult(null);
        if (pollingInterval) {
            clearInterval(pollingInterval);
            setPollingInterval(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banners */}
            <LiveVisitorsBanner />
            <UrgencyBanner />
            <RecentPurchasePopup />

            {/* Header */}
            <header className="bg-white border-b py-4 sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍸</span>
                        <span className="font-bold text-gray-800">LP Drink</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="text-green-500">🔒</span>
                        Checkout Seguro{isSandboxMode && ' • Modo Teste'}
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Processing State */}
                {step === 'processing' && (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-4xl animate-spin">⏳</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Processando pagamento...</h2>
                        <p className="text-gray-500">Aguarde, estamos validando seus dados.</p>
                        <div className="mt-6 w-48 h-2 mx-auto bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }} />
                        </div>
                    </div>
                )}

                {/* Result State */}
                {step === 'result' && result && (
                    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${result.status === 'approved' || result.status === 'redirect'
                        ? 'border-2 border-green-500'
                        : result.status === 'error' || result.status === 'declined'
                            ? 'border-2 border-red-500'
                            : 'border-2 border-blue-500'
                        }`}>
                        <div className={`p-6 ${result.status === 'approved' || result.status === 'redirect'
                            ? 'bg-green-50'
                            : result.status === 'error' || result.status === 'declined'
                                ? 'bg-red-50'
                                : 'bg-blue-50'
                            }`}>
                            <div className="text-center">
                                <span className="text-6xl mb-4 block">
                                    {result.status === 'approved' && '✅'}
                                    {result.status === 'redirect' && '🔗'}
                                    {result.status === 'pending' && '⏳'}
                                    {(result.status === 'error' || result.status === 'declined') && '❌'}
                                </span>
                                <h2 className={`text-2xl font-bold mb-2 ${result.status === 'approved' || result.status === 'redirect'
                                    ? 'text-green-800'
                                    : result.status === 'error'
                                        ? 'text-red-800'
                                        : 'text-blue-800'
                                    }`}>
                                    {result.message}
                                </h2>
                                {result.orderNsu && (
                                    <p className="text-gray-500 text-sm">Pedido: {result.orderNsu}</p>
                                )}
                                {result.transactionId && (
                                    <p className="text-gray-500 text-sm">ID: {result.transactionId}</p>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Redirect to InfinitePay */}
                            {result.status === 'redirect' && result.checkoutUrl && (
                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                                        <span className="text-3xl">💳</span>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        Você será redirecionado para o checkout seguro da InfinitePay em instantes...
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={result.checkoutUrl}
                                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                                        >
                                            🔒 Ir para Checkout Seguro
                                        </a>
                                        <p className="text-xs text-gray-400">
                                            Página protegida por InfinitePay
                                        </p>
                                    </div>
                                </div>
                            )}
                            {/* PIX QR Code */}
                            {result.data?.qrCodeBase64 && (
                                <div className="text-center mb-6">
                                    <p className="text-gray-600 mb-4">Escaneie o QR Code ou copie o código:</p>
                                    <img src={result.data.qrCodeBase64} alt="QR Code PIX" className="w-48 h-48 mx-auto border rounded-lg bg-white p-2 mb-4" />
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                        <code className="text-xs break-all block mb-3">{result.data.copyPaste}</code>
                                        <button
                                            onClick={() => { navigator.clipboard.writeText(result.data?.copyPaste || ''); alert('Código copiado!'); }}
                                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                                        >
                                            📋 Copiar Código PIX
                                        </button>
                                    </div>
                                    {result.data.expiresAt && (
                                        <p className="text-sm text-gray-500 mt-4">Válido até: {new Date(result.data.expiresAt).toLocaleString('pt-BR')}</p>
                                    )}
                                </div>
                            )}

                            {/* Card Success */}
                            {result.status === 'approved' && paymentMethod === 'card' && (
                                <div className="text-center">
                                    <p className="text-green-700 mb-4">Seu acesso ao curso foi liberado! Verifique seu e-mail.</p>
                                    {result.data?.nsu && <p className="text-sm text-gray-500">NSU: {result.data.nsu}</p>}
                                    <a href="/membros" className="inline-block mt-4 px-8 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors">
                                        🎓 Acessar o Curso
                                    </a>
                                </div>
                            )}

                            {/* Boleto */}
                            {result.data?.boletoCode && (
                                <div className="text-center">
                                    <p className="text-gray-600 mb-4">Código de barras do boleto:</p>
                                    <div className="bg-gray-100 p-3 rounded-lg mb-4">
                                        <code className="text-sm block">{result.data.boletoCode}</code>
                                    </div>
                                    <a href={result.data.boletoUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors">
                                        📄 Baixar Boleto PDF
                                    </a>
                                    <p className="text-sm text-gray-500 mt-4">Vencimento: {result.data.dueDate}</p>
                                </div>
                            )}

                            {/* Error Retry */}
                            {(result.status === 'error' || result.status === 'declined') && (
                                <div className="text-center">
                                    {result.error && (
                                        <p className="text-red-600 mb-4 text-sm">Código: {result.error.code}</p>
                                    )}
                                    <button onClick={handleRetry} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                                        🔄 Tentar Novamente
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Form State */}
                {step === 'form' && (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Product Card */}
                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-4xl">🍹</div>
                                    <div className="flex-1">
                                        <h1 className="text-xl font-bold mb-1">Curso Completo de Drinks</h1>
                                        <p className="text-white/80 text-sm mb-3">+100 receitas • Acesso vitalício • Certificado</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm line-through text-white/60">R$ {ORIGINAL_PRICE}</span>
                                            <span className="text-3xl font-extrabold">R$ {BASE_PRICE}</span>
                                            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold">-94%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Bumps */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-red-50 border-b border-red-100 px-6 py-3">
                                    <p className="text-red-700 font-bold text-sm flex items-center gap-2">
                                        <span className="animate-pulse">🔥</span> OFERTAS ESPECIAIS - Só hoje!
                                    </p>
                                </div>
                                <div className="p-4 space-y-3">
                                    {ORDER_BUMPS.map(bump => (
                                        <label key={bump.id} className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedBumps.includes(bump.id) ? 'border-green-500 bg-green-50' : 'border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/50'}`}>
                                            <input type="checkbox" checked={selectedBumps.includes(bump.id)} onChange={() => toggleBump(bump.id)} className="mt-1 w-5 h-5 text-green-600 rounded" />
                                            <div className="flex-1">
                                                <p className="font-bold text-gray-800">{bump.name}</p>
                                                <p className="text-sm text-gray-600">{bump.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 line-through">R$ {bump.originalPrice}</p>
                                                <p className="font-bold text-green-600">+R$ {bump.price}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Customer Data */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">1</span>
                                        Seus Dados
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <InputField
                                                label="Nome Completo *"
                                                value={customer.name}
                                                onChange={v => setCustomer(p => ({ ...p, name: v }))}
                                                error={errors.name}
                                                placeholder="Seu nome completo"
                                            />
                                        </div>
                                        <InputField
                                            label="E-mail *"
                                            value={customer.email}
                                            onChange={v => setCustomer(p => ({ ...p, email: v }))}
                                            error={errors.email}
                                            type="email"
                                            placeholder="seu@email.com"
                                        />
                                        <InputField
                                            label="CPF *"
                                            value={customer.cpf}
                                            onChange={v => setCustomer(p => ({ ...p, cpf: v }))}
                                            error={errors.cpf}
                                            placeholder="000.000.000-00"
                                            maxLength={14}
                                            formatter={Formatters.cpf}
                                        />
                                        <div className="md:col-span-2">
                                            <InputField
                                                label="CEP *"
                                                value={customer.address?.cep || ''}
                                                onChange={v => setCustomer(p => ({ ...p, address: { ...p.address, cep: v } }))}
                                                error={errors.cep}
                                                placeholder="00000-000"
                                                maxLength={9}
                                                formatter={Formatters.cep}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">2</span>
                                        Forma de Pagamento
                                    </h2>

                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {(['pix', 'card', 'boleto'] as PaymentMethod[]).map(m => (
                                            <button
                                                key={m}
                                                type="button"
                                                onClick={() => setPaymentMethod(m)}
                                                className={`py-3 px-2 rounded-lg font-medium transition-all border-2 text-center ${paymentMethod === m ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                                            >
                                                <span className="text-2xl block mb-1">{m === 'pix' ? '⚡' : m === 'card' ? '💳' : '📄'}</span>
                                                <span className="text-xs">{m === 'pix' ? 'PIX' : m === 'card' ? 'Cartão' : 'Boleto'}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {paymentMethod === 'pix' && (
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <p className="text-green-800 font-bold flex items-center gap-2">⚡ Aprovação instantânea!</p>
                                            <p className="text-sm text-green-700">Pague com PIX e acesse o curso imediatamente.</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'card' && (
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-blue-800 font-bold flex items-center gap-2">💳 Cartão de Crédito</p>
                                            <p className="text-sm text-blue-700">Você será redirecionado para o checkout seguro da InfinitePay para inserir os dados do cartão.</p>
                                            <p className="text-xs text-blue-600 mt-2">🔒 Pagamento processado com criptografia de ponta a ponta</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'boleto' && (
                                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                            <p className="text-amber-800 font-bold">📄 Boleto Bancário</p>
                                            <p className="text-sm text-amber-700">Acesso liberado em até 3 dias úteis após pagamento.</p>
                                        </div>
                                    )}
                                </div>

                                {/* LGPD Consent */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <label className={`flex items-start gap-3 cursor-pointer ${errors.lgpd ? 'text-red-600' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={lgpdConsent}
                                            onChange={e => setLgpdConsent(e.target.checked)}
                                            className={`mt-1 w-5 h-5 rounded ${errors.lgpd ? 'border-red-500' : ''}`}
                                        />
                                        <span className="text-sm text-gray-600">
                                            Li e aceito os <a href="/termos" className="text-blue-600 underline">Termos de Uso</a> e a <a href="/privacidade" className="text-blue-600 underline">Política de Privacidade</a>.
                                        </span>
                                    </label>
                                    {errors.lgpd && <p className="text-red-500 text-xs mt-2">⚠️ {errors.lgpd}</p>}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-5 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    🔒 FINALIZAR COMPRA - {Formatters.currency(total)}
                                </button>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                                    <span>🔒 Pagamento 100% Seguro</span>
                                    <span>✅ Satisfação Garantida</span>
                                    <span>🛡️ Garantia 7 dias</span>
                                </div>
                            </form>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Order Summary */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-20">
                                <h3 className="font-bold text-gray-800 mb-4">📦 Resumo do Pedido</h3>

                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Curso Completo</span>
                                        <span className="font-medium">R$ {BASE_PRICE.toFixed(2)}</span>
                                    </div>
                                    {selectedBumps.map(id => {
                                        const bump = ORDER_BUMPS.find(b => b.id === id);
                                        return bump ? (
                                            <div key={id} className="flex justify-between text-sm text-green-600">
                                                <span>+ {bump.name}</span>
                                                <span>R$ {bump.price.toFixed(2)}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-gray-800">Total:</span>
                                        <span className="text-2xl font-extrabold text-green-600">{Formatters.currency(total)}</span>
                                    </div>
                                    <p className="text-sm text-green-600 font-medium text-right">💰 Você economiza {Formatters.currency(savings)}</p>
                                </div>

                                {/* Guarantee */}
                                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">🛡️</span>
                                        <div>
                                            <p className="font-bold text-green-800 text-sm">Garantia de 7 Dias</p>
                                            <p className="text-xs text-green-700">100% do seu dinheiro de volta</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-800">💬 O que dizem nossos alunos</h3>
                                {TESTIMONIALS.map((t, i) => (
                                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">{t.avatar}</div>
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{t.name}</p>
                                                <p className="text-gray-500 text-xs">{t.location}</p>
                                            </div>
                                            <div className="ml-auto text-amber-400 text-sm">★★★★★</div>
                                        </div>
                                        <p className="text-gray-600 text-sm italic">"{t.text}"</p>
                                    </div>
                                ))}
                            </div>

                            {/* Security */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-800 mb-4 text-center">🔐 Site 100% Seguro</h3>
                                <div className="flex justify-center gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">🔒</div>
                                        <p className="text-xs text-gray-500">SSL 256-bit</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">💳</div>
                                        <p className="text-xs text-gray-500">InfinitePay</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">✅</div>
                                        <p className="text-xs text-gray-500">Compra Segura</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* CSS for animations */}
            <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default Checkout;
