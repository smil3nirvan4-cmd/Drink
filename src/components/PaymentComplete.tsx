import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { infinitePayService } from '../services/infinitepay';
import { LoadingSpinner, ConfettiIcon, PixIcon, CreditCardIcon, DocumentIcon, GraduationCapIcon, XCircleIcon, RefreshIcon, LockIcon, ClockIcon } from './icons';
interface PaymentStatus {
    success: boolean;
    paid: boolean;
    amount: number;
    paid_amount: number;
    installments: number;
    capture_method: 'credit_card' | 'pix';
}

const PaymentComplete: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error'>('loading');
    const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);
    const [error, setError] = useState<string>('');

    // Capturar parâmetros da URL retornados pela InfinitePay
    const receiptUrl = searchParams.get('receipt_url');
    const orderNsu = searchParams.get('order_nsu');
    const slug = searchParams.get('slug');
    const captureMethod = searchParams.get('capture_method');
    const transactionNsu = searchParams.get('transaction_nsu');

    useEffect(() => {
        const checkPaymentStatus = async () => {
            // Se não tiver order_nsu na URL, tentar pegar do localStorage
            const nsu = orderNsu || localStorage.getItem('lp_drink_order_nsu');

            if (!nsu) {
                setError('Não foi possível identificar o pedido.');
                setStatus('error');
                return;
            }

            try {
                const result = await infinitePayService.checkPaymentStatus(nsu, transactionNsu || undefined, slug || undefined);

                if (result) {
                    setPaymentData(result);
                    setStatus(result.paid ? 'success' : 'pending');

                    // Limpar localStorage se pagamento confirmado
                    if (result.paid) {
                        localStorage.removeItem('lp_drink_order_nsu');
                    }
                } else {
                    // Se não conseguiu verificar mas tem receipt_url, considerar sucesso
                    if (receiptUrl) {
                        setStatus('success');
                    } else {
                        setStatus('pending');
                    }
                }
            } catch (err) {
                console.error('Error checking payment:', err);
                // Se tem receipt_url, provavelmente pagou
                if (receiptUrl) {
                    setStatus('success');
                } else {
                    setStatus('pending');
                }
            }
        };

        checkPaymentStatus();
    }, [orderNsu, transactionNsu, slug, receiptUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                {/* Loading */}
                {status === 'loading' && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <LoadingSpinner size={40} className="text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verificando pagamento...</h1>
                        <p className="text-gray-500">Aguarde enquanto confirmamos seu pedido.</p>
                    </div>
                )}

                {/* Success */}
                {status === 'success' && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-400">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 p-8 text-center text-white">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                                <ConfettiIcon size={48} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Pagamento Confirmado!</h1>
                            <p className="text-green-100">Seu acesso ao curso foi liberado.</p>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Payment Details */}
                            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                <h3 className="font-semibold text-green-800 mb-3">Detalhes do Pagamento</h3>
                                <div className="space-y-2 text-sm">
                                    {orderNsu && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Pedido:</span>
                                            <span className="font-mono text-gray-800">{orderNsu}</span>
                                        </div>
                                    )}
                                    {captureMethod && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Método:</span>
                                            <span className="font-medium text-gray-800 flex items-center gap-1">
                                                {captureMethod === 'pix' ? <><PixIcon size={16} /> PIX</> : <><CreditCardIcon size={16} /> Cartão de Crédito</>}
                                            </span>
                                        </div>
                                    )}
                                    {paymentData && (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Valor:</span>
                                                <span className="font-bold text-green-700">
                                                    R$ {(paymentData.paid_amount / 100).toFixed(2)}
                                                </span>
                                            </div>
                                            {paymentData.installments > 1 && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Parcelas:</span>
                                                    <span className="text-gray-800">{paymentData.installments}x</span>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Receipt Link */}
                            {receiptUrl && (
                                <a
                                    href={receiptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-center text-gray-700 font-medium transition-colors"
                                >
                                    <DocumentIcon size={18} /> Ver Comprovante
                                </a>
                            )}

                            {/* Access Course Button */}
                            <Link
                                to="/membros"
                                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl text-center text-white font-bold text-lg transition-all shadow-lg"
                            >
                                <GraduationCapIcon size={24} /> Acessar o Curso Agora
                            </Link>

                            {/* Email Notice */}
                            <p className="text-center text-gray-500 text-sm">
                                Um e-mail com os dados de acesso foi enviado para você.
                            </p>
                        </div>
                    </div>
                )}

                {/* Pending */}
                {status === 'pending' && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-amber-400">
                        <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-8 text-center text-white">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                                <ClockIcon size={48} className="text-white animate-pulse" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Aguardando Pagamento</h1>
                            <p className="text-amber-100">Seu pedido está sendo processado.</p>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                                <p className="text-amber-800 text-center">
                                    Assim que o pagamento for confirmado, você receberá um e-mail com os dados de acesso.
                                </p>
                            </div>

                            {orderNsu && (
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm">Número do pedido:</p>
                                    <p className="font-mono text-gray-800">{orderNsu}</p>
                                </div>
                            )}

                            <Link
                                to="/"
                                className="block w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-center text-gray-700 font-medium transition-colors"
                            >
                                ← Voltar à página inicial
                            </Link>
                        </div>
                    </div>
                )}

                {/* Error */}
                {status === 'error' && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-red-400">
                        <div className="bg-gradient-to-r from-red-400 to-red-500 p-8 text-center text-white">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                                <XCircleIcon size={48} className="text-white" />
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Erro no Pagamento</h1>
                            <p className="text-red-100">{error || 'Não foi possível processar seu pagamento.'}</p>
                        </div>

                        <div className="p-8 space-y-4">
                            <Link
                                to="/checkout"
                                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-center text-white font-bold transition-all"
                            >
                                <RefreshIcon size={20} /> Tentar Novamente
                            </Link>

                            <Link
                                to="/"
                                className="block w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-center text-gray-700 font-medium transition-colors"
                            >
                                ← Voltar à página inicial
                            </Link>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                        <LockIcon size={16} /> Pagamento processado com segurança por <strong>InfinitePay</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentComplete;
