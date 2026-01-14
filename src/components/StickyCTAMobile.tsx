import React, { useState, useEffect } from 'react';
import { LightningIcon, LockIcon, CreditCardIcon, RefreshIcon } from './icons';

interface StickyCTAMobileProps {
    price?: number;
    originalPrice?: number;
    checkoutUrl?: string;
}

const StickyCTAMobile: React.FC<StickyCTAMobileProps> = ({
    price = 17,
    originalPrice = 297,
    checkoutUrl = '/checkout'
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 30% of the page
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setIsVisible(scrollPercent > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pulse animation every 5 seconds
    useEffect(() => {
        if (!isVisible) return;

        const pulseInterval = setInterval(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 600);
        }, 5000);

        return () => clearInterval(pulseInterval);
    }, [isVisible]);

    return (
        <>
            {/* Sticky CTA - Mobile Only */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    padding: 'clamp(0.75rem, 2vw, 1rem)',
                    paddingBottom: 'max(env(safe-area-inset-bottom), clamp(0.75rem, 2vw, 1rem))'
                }}
            >
                <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
                    {/* Price Info */}
                    <div className="flex-shrink-0">
                        <div className="flex items-baseline gap-1">
                            <span
                                className="text-gray-500 line-through"
                                style={{ fontSize: 'clamp(0.7rem, 2vw, 0.875rem)' }}
                            >
                                R${originalPrice}
                            </span>
                            <span
                                className="text-white font-bold"
                                style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' }}
                            >
                                R${price}
                            </span>
                        </div>
                        <p
                            className="text-green-400 flex items-center gap-1"
                            style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)' }}
                        >
                            <LightningIcon size={12} /> Oferta por tempo limitado
                        </p>
                    </div>

                    {/* CTA Button */}
                    <a
                        href={checkoutUrl}
                        className={`flex-1 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-center transition-all duration-200 ${isPulsing ? 'scale-105 shadow-lg shadow-green-500/50' : ''
                            }`}
                        style={{
                            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                            maxWidth: '200px'
                        }}
                    >
                        COMPRAR AGORA
                    </a>
                </div>

                {/* Trust indicators */}
                <div
                    className="flex justify-center items-center gap-3 mt-2"
                    style={{ fontSize: 'clamp(0.55rem, 1.25vw, 0.65rem)' }}
                >
                    <span className="text-gray-400 flex items-center gap-1"><LockIcon size={12} /> Seguro</span>
                    <span className="text-gray-400 flex items-center gap-1"><CreditCardIcon size={12} /> Pix ou Cartão</span>
                    <span className="text-gray-400 flex items-center gap-1"><RefreshIcon size={12} /> 7 dias garantia</span>
                </div>
            </div>

            {/* Spacer to prevent content from being hidden behind sticky CTA */}
            <div className="h-24 lg:hidden" />
        </>
    );
};

export default StickyCTAMobile;
