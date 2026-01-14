import React from 'react';
import { CocktailIcon } from './icons';

interface HeroProps {
    videoId?: string;
}

const Hero: React.FC<HeroProps> = ({ videoId: _videoId = 'YOUR_VIDEO_ID' }) => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-labelledby="hero-title"
        >
            {/* Background Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/50 to-[#09090b]"
                aria-hidden="true"
            />

            {/* Decorative Elements */}
            <div
                className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-40 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
                aria-hidden="true"
            />

            <div className="container relative z-10 px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass animate-fade-in-up"
                        style={{ animationDelay: '0.1s' }}
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                        <span className="text-sm font-medium text-neutral-300 flex items-center gap-1">
                            <CocktailIcon size={16} className="text-amber-400" /> +2.500 alunos já transformaram sua vida
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1
                        id="hero-title"
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Domine a Arte de Criar{' '}
                        <span className="gradient-text">Drinks Incríveis</span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-lg md:text-xl text-neutral-400 mb-8 max-w-2xl mx-auto animate-fade-in-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        Aprenda técnicas profissionais de bartender, receitas exclusivas e transforme
                        qualquer ocasião em uma experiência memorável.
                    </p>

                    {/* VSL Container */}
                    <div
                        className="relative mb-8 animate-fade-in-up"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <div className="relative aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl">
                            {/* Video Placeholder - Replace with actual VSL embed */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
                                <div className="text-center">
                                    {/* Play Button */}
                                    <button
                                        type="button"
                                        className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-amber-400 animate-pulse-glow focus:outline-none focus:ring-4 focus:ring-amber-500/50"
                                        aria-label="Reproduzir vídeo de apresentação"
                                    >
                                        <svg
                                            className="w-8 h-8 md:w-10 md:h-10 text-neutral-950 ml-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                    <p className="mt-4 text-sm text-neutral-400">
                                        Assista ao vídeo de apresentação
                                    </p>
                                </div>
                            </div>

                            {/* Uncomment for YouTube embed:
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Vídeo de apresentação do curso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
              */}
                        </div>

                        {/* Video Glow Effect */}
                        <div
                            className="absolute -inset-4 bg-amber-500/20 blur-3xl -z-10 rounded-3xl"
                            aria-hidden="true"
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
                        style={{ animationDelay: '0.5s' }}
                    >
                        <a
                            href="#pricing"
                            className="btn btn-primary text-lg px-8 py-4"
                        >
                            <span>Quero Começar Agora</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        <a
                            href="#benefits"
                            className="btn btn-secondary"
                        >
                            Saiba Mais
                        </a>
                    </div>

                    {/* Trust Badges */}
                    <div
                        className="flex flex-wrap justify-center gap-6 mt-10 animate-fade-in-up"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <div className="flex items-center gap-2 text-neutral-400">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Garantia de 7 dias</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Acesso vitalício</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-400">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Certificado incluso</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <a
                    href="#benefits"
                    className="flex flex-col items-center text-neutral-500 hover:text-amber-400 transition-colors"
                    aria-label="Rolar para seção de benefícios"
                >
                    <span className="text-xs mb-2">Rolar</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default Hero;
