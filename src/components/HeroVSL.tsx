import React, { useState, useRef, useEffect } from 'react';
import { UsersIcon, StarIcon, TrophyIcon, CheckCircleIcon, CreditCardIcon, LockIcon } from './icons';

interface HeroVSLProps {
    /** URL do vídeo (YouTube, Vimeo, ou arquivo direto) */
    videoUrl?: string;
    /** ID do YouTube (se usar YouTube) */
    youtubeId?: string;
    /** Thumbnail customizada */
    thumbnailUrl?: string;
    /** Callback quando vídeo termina */
    onVideoEnd?: () => void;
    /** Mostrar CTA após X segundos de vídeo */
    showCtaAfterSeconds?: number;
}

const HeroVSL: React.FC<HeroVSLProps> = ({
    videoUrl,
    youtubeId,
    thumbnailUrl,
    onVideoEnd,
    showCtaAfterSeconds = 30,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showCta, setShowCta] = useState(false);
    const [watchTime, setWatchTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const intervalRef = useRef<number | null>(null);

    // Track watch time and show CTA after threshold
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                setWatchTime((prev) => {
                    const newTime = prev + 1;
                    if (newTime >= showCtaAfterSeconds && !showCta) {
                        setShowCta(true);
                    }
                    return newTime;
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, showCtaAfterSeconds, showCta]);

    const handlePlay = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleVideoEnd = () => {
        setShowCta(true);
        onVideoEnd?.();
    };

    return (
        <section
            id="hero-vsl"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-labelledby="hero-vsl-title"
        >
            {/* Background Effects */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#09090b] to-[#09090b]"
                aria-hidden="true"
            />
            <div
                className="absolute top-20 left-10 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl animate-pulse"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-40 right-10 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }}
                aria-hidden="true"
            />

            <div className="container relative z-10 px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Pre-headline */}
                    <div className="text-center mb-6 animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-amber-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            AO VIVO: Aula especial disponível agora
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1
                        id="hero-vsl-title"
                        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        Descubra Como Criar{' '}
                        <span className="gradient-text">Drinks Profissionais</span>{' '}
                        em Casa por Apenas R$17
                    </h1>

                    {/* Subheadline */}
                    <p
                        className="text-lg md:text-xl text-neutral-400 text-center mb-8 max-w-2xl mx-auto animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Mesmo sem experiência, você vai impressionar todos com drinks dignos de bar premium
                    </p>

                    {/* VSL Container */}
                    <div
                        className="relative mb-8 animate-fade-in-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl">
                            {/* YouTube Embed */}
                            {youtubeId && isPlaying ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=0`}
                                    title="Vídeo de Vendas"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            ) : videoUrl && isPlaying ? (
                                /* Direct Video */
                                <video
                                    ref={videoRef}
                                    src={videoUrl}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    controls={false}
                                    autoPlay
                                    playsInline
                                    onEnded={handleVideoEnd}
                                >
                                    <track kind="captions" />
                                </video>
                            ) : (
                                /* Thumbnail / Play State */
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center cursor-pointer group"
                                    onClick={handlePlay}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePlay()}
                                    aria-label="Reproduzir vídeo de apresentação"
                                >
                                    {thumbnailUrl && (
                                        <img
                                            src={thumbnailUrl}
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                                        />
                                    )}

                                    {/* Play Button */}
                                    <div className="relative z-10 text-center">
                                        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-pulse-glow">
                                            <svg
                                                className="w-8 h-8 md:w-10 md:h-10 text-neutral-950 ml-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <p className="mt-4 text-sm text-neutral-300 font-medium flex items-center gap-1">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                            Clique para assistir com som
                                        </p>
                                        <p className="mt-1 text-xs text-neutral-500">
                                            Vídeo de 5 minutos que vai mudar sua vida
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Video Progress Indicator */}
                            {isPlaying && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000"
                                        style={{ width: `${Math.min((watchTime / 300) * 100, 100)}%` }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Glow Effect */}
                        <div
                            className="absolute -inset-4 bg-amber-500/20 blur-3xl -z-10 rounded-3xl"
                            aria-hidden="true"
                        />
                    </div>

                    {/* CTA Section - Appears after watching */}
                    <div
                        className={`transition-all duration-500 ${showCta
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                            }`}
                    >
                        <div className="max-w-md mx-auto text-center">
                            <a
                                href="#checkout"
                                className="btn btn-primary w-full text-lg py-4 mb-4 animate-pulse-glow"
                            >
                                <span>Quero Aprender Agora por R$17</span>
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </a>
                            <p className="text-sm text-neutral-500 flex items-center justify-center gap-2">
                                <span className="flex items-center gap-1"><CheckCircleIcon size={14} className="text-green-500" /> Acesso imediato</span>
                                <span className="flex items-center gap-1"><CreditCardIcon size={14} className="text-blue-400" /> Pagamento seguro</span>
                                <span className="flex items-center gap-1"><LockIcon size={14} className="text-amber-400" /> Garantia 7 dias</span>
                            </p>
                        </div>
                    </div>

                    {/* Social Proof - Always visible */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        {[
                            { icon: <UsersIcon size={20} className="text-amber-400" />, text: '+2.500 alunos' },
                            { icon: <StarIcon size={20} className="text-amber-400" filled />, text: '4.9 de avaliação' },
                            { icon: <TrophyIcon size={20} className="text-amber-400" />, text: 'Método comprovado' },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 px-4 py-2 rounded-full glass"
                            >
                                <span>{item.icon}</span>
                                <span className="text-sm text-neutral-300">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            {showCta && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <a
                        href="#benefits"
                        className="flex flex-col items-center text-neutral-500 hover:text-amber-400 transition-colors"
                        aria-label="Ver benefícios"
                    >
                        <span className="text-xs mb-2">Saiba mais</span>
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
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </a>
                </div>
            )}
        </section>
    );
};

export default HeroVSL;
