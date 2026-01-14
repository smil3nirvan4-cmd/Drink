import React, { useState, useEffect, useCallback } from 'react';
import { XIcon, GiftIcon } from './icons';

interface ExitIntentPopupProps {
    discountCode?: string;
    discountPercent?: number;
    checkoutUrl?: string;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
    discountCode = 'NAOSAIA10',
    discountPercent = 10,
    checkoutUrl = '/checkout'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    const handleMouseLeave = useCallback((e: MouseEvent) => {
        if (e.clientY <= 10 && !hasShown) {
            setIsVisible(true);
            setHasShown(true);
        }
    }, [hasShown]);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem('exitIntentShown');
        if (alreadyShown) {
            setHasShown(true);
            return;
        }

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [handleMouseLeave]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('exitIntentShown', 'true');
    };

    const handleClaim = () => {
        sessionStorage.setItem('exitIntentShown', 'true');
        window.location.href = `${checkoutUrl}?discount=${discountCode}`;
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <div
                className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-amber-500/30 max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <XIcon size={16} />
                </button>

                <div className="relative text-center">
                    <div className="flex justify-center" style={{ fontSize: 'clamp(3rem, 10vw, 4rem)' }}>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-amber-400">
                            <circle cx="32" cy="32" r="28" fill="#fbbf24" opacity="0.2" stroke="currentColor" strokeWidth="3" />
                            <circle cx="22" cy="26" r="4" fill="currentColor" />
                            <circle cx="42" cy="26" r="4" fill="currentColor" />
                            <ellipse cx="32" cy="42" rx="8" ry="10" fill="currentColor" opacity="0.3" />
                            <path d="M24 42 Q32 52 40 42" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h2
                        className="font-bold text-white"
                        style={{ fontSize: 'clamp(1.25rem, 5vw, 1.75rem)', marginBottom: '0.5rem' }}
                    >
                        Espera! Não vai embora ainda...
                    </h2>

                    <p className="text-gray-300" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', marginBottom: '1rem' }}>
                        Temos uma <strong className="text-amber-400">oferta especial</strong> só pra você!
                    </p>

                    <div
                        className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mx-auto"
                        style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', marginBottom: '1rem', maxWidth: '280px' }}
                    >
                        <p className="text-white/80" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.875rem)' }}>
                            Desconto exclusivo de saída
                        </p>
                        <p className="font-bold text-white" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}>
                            {discountPercent}% OFF
                        </p>
                        <p className="text-white/70" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}>
                            Use o código: <strong className="text-white">{discountCode}</strong>
                        </p>
                    </div>

                    <button
                        onClick={handleClaim}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                        style={{ padding: 'clamp(0.75rem, 2.5vw, 1rem)', fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)', marginBottom: '0.75rem' }}
                    >
                        <GiftIcon size={20} /> QUERO MEU DESCONTO!
                    </button>

                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-400 transition-colors" style={{ fontSize: '0.75rem' }}>
                        Não, prefiro pagar o preço cheio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExitIntentPopup;
