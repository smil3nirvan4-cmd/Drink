import React from 'react';
import { LightningIcon, ClockIcon } from './icons';

const CTA: React.FC = () => {
    return (
        <section
            id="pricing"
            className="section relative overflow-hidden"
            aria-labelledby="pricing-title"
        >
            {/* Background Effects */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent"
                aria-hidden="true"
            />
            <div
                className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                aria-hidden="true"
            />

            <div className="container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full">
                        Oferta por tempo limitado
                    </span>
                    <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold mb-4">
                        Comece sua jornada{' '}
                        <span className="gradient-text">hoje mesmo</span>
                    </h2>
                    <p className="text-neutral-400 max-w-xl mx-auto">
                        Investimento único com acesso vitalício a todo o conteúdo e atualizações futuras.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="max-w-lg mx-auto">
                    <article className="relative p-8 rounded-3xl glass border-2 border-amber-500/30 shadow-2xl">
                        {/* Popular Badge */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                            <span className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-sm font-bold rounded-full shadow-lg flex items-center gap-1">
                                <LightningIcon size={14} /> MAIS POPULAR
                            </span>
                        </div>

                        {/* Plan Name */}
                        <div className="text-center mb-6 pt-4">
                            <h3 className="text-2xl font-bold text-neutral-100 mb-2">
                                Acesso Completo
                            </h3>
                            <p className="text-neutral-400 text-sm">
                                Tudo que você precisa em um só lugar
                            </p>
                        </div>

                        {/* Price */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-lg text-neutral-500 line-through">R$ 497</span>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded">
                                    -60%
                                </span>
                            </div>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-lg text-neutral-400">R$</span>
                                <span className="text-6xl font-extrabold gradient-text">197</span>
                            </div>
                            <p className="text-neutral-400 text-sm mt-2">
                                ou 12x de R$ 19,70
                            </p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-4 mb-8" role="list">
                            {[
                                '+100 receitas exclusivas de drinks',
                                '50 horas de conteúdo em vídeo HD',
                                'Acesso vitalício ao curso',
                                'Certificado de conclusão',
                                'Comunidade exclusiva de alunos',
                                'Suporte dedicado por 1 ano',
                                'Bônus: E-book de harmonizações',
                                'Bônus: Guia de utensílios essenciais',
                            ].map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <svg
                                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-neutral-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <a
                            href="#checkout"
                            className="btn btn-primary w-full text-lg py-4 animate-pulse-glow"
                        >
                            <span>Garantir Minha Vaga</span>
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

                        {/* Trust Elements */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm">
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
                                <span>Compra 100% segura • Garantia de 7 dias</span>
                            </div>

                            {/* Payment Methods */}
                            <div className="flex items-center justify-center gap-4 mt-4">
                                {['Pix', 'Cartão', 'Boleto'].map((method) => (
                                    <span
                                        key={method}
                                        className="px-3 py-1 text-xs text-neutral-400 bg-neutral-800/50 rounded-full"
                                    >
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>

                {/* Urgency Element */}
                <div className="text-center mt-8">
                    <p className="text-neutral-400 flex items-center justify-center gap-2">
                        <ClockIcon size={16} className="text-amber-400" /> Oferta válida por tempo limitado.{' '}
                        <span className="text-amber-400 font-semibold">Restam poucas vagas!</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CTA;
