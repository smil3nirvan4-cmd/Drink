import { useState, useEffect, useCallback } from 'react';
import { XIcon, ClockIcon } from './icons';

interface CheckoutModalProps {
    isOpen: boolean;
    checkoutUrl: string | null;
    onClose: () => void;
    onPaymentComplete: (success: boolean, data?: any) => void;
}

/**
 * Modal/Popup de Checkout InfinitePay
 * 
 * Abre a página de checkout em uma nova janela popup ao invés de redirect completo.
 * Isso permite uma experiência mais "transparente" sem sair da página.
 */
export const CheckoutModal = ({
    isOpen,
    checkoutUrl,
    onClose,
    onPaymentComplete
}: CheckoutModalProps) => {
    const [popupWindow, setPopupWindow] = useState<Window | null>(null);
    const [status, setStatus] = useState<'idle' | 'pending' | 'checking'>('idle');

    // Configurações do popup
    const POPUP_WIDTH = 500;
    const POPUP_HEIGHT = 700;

    // Abre o popup quando o modal é ativado
    useEffect(() => {
        if (!isOpen || !checkoutUrl) return;

        // Calcula posição central
        const left = (window.screen.width - POPUP_WIDTH) / 2;
        const top = (window.screen.height - POPUP_HEIGHT) / 2;

        // Abre popup
        const popup = window.open(
            checkoutUrl,
            'infinitepay_checkout',
            `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},scrollbars=yes,resizable=yes`
        );

        if (popup) {
            setPopupWindow(popup);
            setStatus('pending');
            popup.focus();
        } else {
            // Popup bloqueado - fallback para redirect
            console.warn('[CheckoutModal] Popup bloqueado, fazendo redirect...');
            window.location.href = checkoutUrl;
        }
    }, [isOpen, checkoutUrl]);

    // Monitora o popup para detectar quando foi fechado
    useEffect(() => {
        if (!popupWindow) return;

        const checkPopup = setInterval(() => {
            try {
                // Verifica se o popup foi fechado
                if (popupWindow.closed) {
                    clearInterval(checkPopup);
                    setStatus('checking');

                    // Notifica que o popup foi fechado
                    // O pagamento será verificado pelo PaymentComplete ou polling
                    setTimeout(() => {
                        onPaymentComplete(false, { closed: true });
                    }, 500);
                }

                // Tenta verificar se houve redirect para a URL de sucesso
                try {
                    const popupUrl = popupWindow.location.href;
                    if (popupUrl.includes('/pagamento-concluido')) {
                        clearInterval(checkPopup);
                        popupWindow.close();

                        // Extrai parâmetros da URL
                        const url = new URL(popupUrl);
                        const params = {
                            receiptUrl: url.searchParams.get('receipt_url'),
                            orderNsu: url.searchParams.get('order_nsu'),
                            transactionNsu: url.searchParams.get('transaction_nsu'),
                            captureMethod: url.searchParams.get('capture_method'),
                        };

                        onPaymentComplete(true, params);
                    }
                } catch (crossOriginError) {
                    // Cross-origin - não consegue ler URL, continua monitorando
                }
            } catch (e) {
                // Popup pode ter sido fechado ou ter erro
            }
        }, 500);

        return () => clearInterval(checkPopup);
    }, [popupWindow, onPaymentComplete]);

    // Handler para fechar o modal manualmente
    const handleClose = useCallback(() => {
        if (popupWindow && !popupWindow.closed) {
            popupWindow.close();
        }
        setPopupWindow(null);
        setStatus('idle');
        onClose();
    }, [popupWindow, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <XIcon size={24} />
                </button>

                {/* Content based on status */}
                {status === 'pending' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Processando Pagamento
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Complete o pagamento na janela que foi aberta.
                        </p>
                        <p className="text-sm text-gray-500">
                            Se a janela não abriu, verifique se seu navegador bloqueou popups.
                        </p>

                        {/* Botão para reabrir popup */}
                        <button
                            onClick={() => checkoutUrl && window.open(checkoutUrl, 'infinitepay_checkout')}
                            className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Reabrir Janela de Pagamento
                        </button>
                    </div>
                )}

                {status === 'checking' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                            <ClockIcon size={32} className="text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Verificando Pagamento
                        </h3>
                        <p className="text-gray-600">
                            Aguarde enquanto verificamos o status do seu pagamento...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
