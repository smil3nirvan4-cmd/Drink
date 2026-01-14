import React, { useState, useEffect, useCallback } from 'react';
import { BookIcon, CocktailIcon, AlertIcon, LightningIcon, ShieldIcon } from './icons';

interface OrderBump {
    id: string;
    title: string;
    description: string;
    originalPrice: number;
    price: number;
    icon: React.ReactNode;
}

interface CTATimerProps {
    /** Preço base do produto */
    basePrice?: number;
    /** Duração do timer em segundos (padrão: 24h) */
    timerDuration?: number;
    /** Order bumps disponíveis */
    bumps?: OrderBump[];
    /** Callback quando adiciona bump */
    onBumpChange?: (selectedBumps: string[]) => void;
    /** URL do checkout */
    checkoutUrl?: string;
}

const defaultBumps: OrderBump[] = [
    {
        id: 'ebook-harmonizacoes',
        title: 'E-book Premium: 100 Harmonizações',
        description: 'Aprenda a combinar drinks com petiscos e refeições completas',
        originalPrice: 47,
        price: 5,
        icon: <BookIcon size={20} className="text-blue-400" />,
    },
    {
        id: 'kit-receitas-premium',
        title: 'Kit Receitas Premium',
        description: 'Mais 50 drinks exclusivos de bares internacionais',
        originalPrice: 37,
        price: 5,
        icon: <CocktailIcon size={20} className="text-amber-400" />,
    },
];

const CTATimer: React.FC<CTATimerProps> = ({
    basePrice = 17,
    timerDuration = 24 * 60 * 60, // 24 hours
    bumps = defaultBumps,
    onBumpChange,
    checkoutUrl = '#checkout',
}) => {
    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const [selectedBumps, setSelectedBumps] = useState<string[]>([]);
    const [isUrgent, setIsUrgent] = useState(false);

    // Calculate total price
    const totalPrice = selectedBumps.reduce((total, bumpId) => {
        const bump = bumps.find((b) => b.id === bumpId);
        return total + (bump?.price || 0);
    }, basePrice);

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                // Set urgent mode when less than 1 hour
                if (prev <= 3600 && !isUrgent) {
                    setIsUrgent(true);
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isUrgent]);

    // Format time
    const formatTime = useCallback((seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: secs.toString().padStart(2, '0'),
        };
    }, []);

    const time = formatTime(timeLeft);

    // Handle bump toggle
    const handleBumpToggle = (bumpId: string) => {
        setSelectedBumps((prev) => {
            const newBumps = prev.includes(bumpId)
                ? prev.filter((id) => id !== bumpId)
                : [...prev, bumpId];
            onBumpChange?.(newBumps);
            return newBumps;
        });
    };

    return (
        <section
            id="checkout"
            className="section relative overflow-hidden"
            aria-labelledby="checkout-title"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent"
                aria-hidden="true"
            />
            <div
                className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                aria-hidden="true"
            />

            <div className="container relative z-10">
                <div className="max-w-xl mx-auto">
                    {/* Urgency Header */}
                    <div
                        className={`text-center mb-8 p-4 rounded-2xl ${isUrgent
                            ? 'bg-red-500/20 border border-red-500/50'
                            : 'bg-amber-500/10 border border-amber-500/30'
                            }`}
                    >
                        <p
                            className={`text-sm font-medium mb-2 ${isUrgent ? 'text-red-400' : 'text-amber-400'
                                }`}
                        >
                            <AlertIcon size={16} className={isUrgent ? 'text-red-400' : 'text-amber-400'} /> OFERTA ACABA EM:
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            {/* Hours */}
                            <div className="flex flex-col items-center">
                                <span
                                    className={`text-3xl md:text-4xl font-bold ${isUrgent ? 'text-red-400' : 'text-amber-400'
                                        }`}
                                >
                                    {time.hours}
                                </span>
                                <span className="text-xs text-neutral-500">horas</span>
                            </div>
                            <span
                                className={`text-2xl font-bold ${isUrgent ? 'text-red-400 animate-pulse' : 'text-amber-400'
                                    }`}
                            >
                                :
                            </span>
                            {/* Minutes */}
                            <div className="flex flex-col items-center">
                                <span
                                    className={`text-3xl md:text-4xl font-bold ${isUrgent ? 'text-red-400' : 'text-amber-400'
                                        }`}
                                >
                                    {time.minutes}
                                </span>
                                <span className="text-xs text-neutral-500">min</span>
                            </div>
                            <span
                                className={`text-2xl font-bold ${isUrgent ? 'text-red-400 animate-pulse' : 'text-amber-400'
                                    }`}
                            >
                                :
                            </span>
                            {/* Seconds */}
                            <div className="flex flex-col items-center">
                                <span
                                    className={`text-3xl md:text-4xl font-bold ${isUrgent ? 'text-red-400 animate-pulse' : 'text-amber-400'
                                        }`}
                                >
                                    {time.seconds}
                                </span>
                                <span className="text-xs text-neutral-500">seg</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Card */}
                    <div className="p-6 md:p-8 rounded-3xl glass border-2 border-amber-500/30 shadow-2xl">
                        <h2
                            id="checkout-title"
                            className="text-2xl md:text-3xl font-bold text-center mb-6"
                        >
                            Finalize Seu Pedido
                        </h2>

                        {/* Base Product */}
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CocktailIcon size={24} className="text-amber-400" />
                                    <div>
                                        <p className="font-semibold text-neutral-100">
                                            Curso Completo de Drinks
                                        </p>
                                        <p className="text-sm text-neutral-400">
                                            Acesso vitalício + Bônus
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-neutral-500 line-through">
                                        R$ 297
                                    </p>
                                    <p className="text-xl font-bold gradient-text">
                                        R$ {basePrice}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Bumps */}
                        <div className="space-y-4 mb-6">
                            <p className="text-sm font-medium text-amber-400 text-center flex items-center justify-center gap-1">
                                <LightningIcon size={16} className="text-amber-400" /> OFERTAS ESPECIAIS - Adicione ao seu pedido:
                            </p>

                            {bumps.map((bump) => (
                                <label
                                    key={bump.id}
                                    className={`block p-4 rounded-xl cursor-pointer transition-all duration-300 ${selectedBumps.includes(bump.id)
                                        ? 'bg-green-500/20 border-2 border-green-500/50'
                                        : 'bg-white/5 border-2 border-dashed border-amber-500/30 hover:border-amber-500/50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Checkbox */}
                                        <div className="pt-1">
                                            <input
                                                type="checkbox"
                                                checked={selectedBumps.includes(bump.id)}
                                                onChange={() => handleBumpToggle(bump.id)}
                                                className="sr-only"
                                                aria-label={`Adicionar ${bump.title}`}
                                            />
                                            <div
                                                className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${selectedBumps.includes(bump.id)
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-neutral-800 border border-neutral-600'
                                                    }`}
                                            >
                                                {selectedBumps.includes(bump.id) && (
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span>{bump.icon}</span>
                                                <span className="font-semibold text-neutral-100">
                                                    {bump.title}
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-400 mb-2">
                                                {bump.description}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-neutral-500 line-through">
                                                    R$ {bump.originalPrice}
                                                </span>
                                                <span className="text-lg font-bold text-green-400">
                                                    + R$ {bump.price}
                                                </span>
                                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                                                    -{Math.round((1 - bump.price / bump.originalPrice) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-medium text-neutral-200">
                                    Total do pedido:
                                </span>
                                <div className="text-right">
                                    <span className="text-3xl font-extrabold gradient-text">
                                        R$ {totalPrice}
                                    </span>
                                    {selectedBumps.length > 0 && (
                                        <p className="text-xs text-green-400">
                                            Você está economizando R${' '}
                                            {bumps
                                                .filter((b) => selectedBumps.includes(b.id))
                                                .reduce((sum, b) => sum + (b.originalPrice - b.price), 280)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <a
                            href={checkoutUrl}
                            className={`btn w-full text-lg py-5 ${isUrgent
                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse'
                                : 'btn-primary animate-pulse-glow'
                                }`}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <span>COMPRAR AGORA POR R$ {totalPrice}</span>
                        </a>

                        {/* Trust Elements */}
                        <div className="mt-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 mb-4">
                                <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Compra 100% segura • Garantia de 7 dias
                            </div>

                            {/* Payment Methods */}
                            <div className="flex items-center justify-center gap-3">
                                {['Pix', 'Cartão', 'Boleto'].map((method) => (
                                    <span
                                        key={method}
                                        className="px-3 py-1 text-xs text-neutral-400 bg-neutral-800/50 rounded-full"
                                    >
                                        {method}
                                    </span>
                                ))}
                            </div>

                            {/* Guarantee */}
                            <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <ShieldIcon size={24} className="text-green-400" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-green-400">
                                            Garantia Incondicional de 7 Dias
                                        </p>
                                        <p className="text-sm text-neutral-400">
                                            Se não gostar, devolvemos 100% do seu dinheiro
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTATimer;
