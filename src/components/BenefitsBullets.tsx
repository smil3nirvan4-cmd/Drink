import React from 'react';
import { CocktailIcon, VideoIcon, GraduationCapIcon, InfinityIcon, UsersIcon, SmartphoneIcon, RefreshIcon, GiftIcon, StarIcon } from './icons';

interface BenefitItem {
    icon: React.ReactNode;
    text: string;
    highlight?: boolean;
}

interface BenefitsBulletsProps {
    /** Título da seção */
    title?: string;
    /** Lista de benefícios */
    benefits?: BenefitItem[];
    /** Mostrar seção de bônus */
    showBonuses?: boolean;
}

const defaultBenefits: BenefitItem[] = [
    { icon: <CocktailIcon size={24} className="text-amber-400" />, text: '+100 receitas exclusivas de drinks clássicos e autorais' },
    { icon: <VideoIcon size={24} className="text-blue-400" />, text: 'Vídeo-aulas em HD com passo a passo detalhado' },
    { icon: <GraduationCapIcon size={24} className="text-purple-400" />, text: 'Certificado de conclusão reconhecido' },
    { icon: <InfinityIcon size={24} className="text-amber-400" />, text: 'Acesso vitalício - estude quando e onde quiser', highlight: true },
    { icon: <UsersIcon size={24} className="text-green-400" />, text: 'Suporte direto com nosso time de bartenders' },
    { icon: <UsersIcon size={24} className="text-pink-400" />, text: 'Comunidade exclusiva de +2.500 alunos' },
    { icon: <SmartphoneIcon size={24} className="text-cyan-400" />, text: 'Acesso pelo celular, tablet ou computador' },
    { icon: <RefreshIcon size={24} className="text-green-400" />, text: 'Atualizações gratuitas com novas receitas' },
];

const bonuses: BenefitItem[] = [
    { icon: <GiftIcon size={24} className="text-green-400" />, text: 'BÔNUS #1: E-book "50 Harmonizações Perfeitas"', highlight: true },
    { icon: <GiftIcon size={24} className="text-green-400" />, text: 'BÔNUS #2: Guia de Utensílios Essenciais', highlight: true },
    { icon: <GiftIcon size={24} className="text-green-400" />, text: 'BÔNUS #3: Lista de Compras do Bartender', highlight: true },
];

const BenefitsBullets: React.FC<BenefitsBulletsProps> = ({
    title = 'O que você vai receber:',
    benefits = defaultBenefits,
    showBonuses = true,
}) => {
    return (
        <section
            id="benefits"
            className="section relative"
            aria-labelledby="benefits-title"
        >
            {/* Background */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"
                aria-hidden="true"
            />

            <div className="container relative z-10">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full">
                            <StarIcon size={16} filled className="text-amber-400" /> Acesso Completo por Apenas R$17
                        </span>
                        <h2
                            id="benefits-title"
                            className="text-2xl md:text-3xl font-bold"
                        >
                            {title}
                        </h2>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-4 mb-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:translate-x-2 ${benefit.highlight
                                    ? 'bg-amber-500/10 border border-amber-500/30'
                                    : 'bg-white/5 border border-white/5'
                                    }`}
                            >
                                <span className="flex-shrink-0" aria-hidden="true">
                                    {benefit.icon}
                                </span>
                                <span
                                    className={`text-base md:text-lg ${benefit.highlight ? 'text-amber-100 font-medium' : 'text-neutral-200'
                                        }`}
                                >
                                    {benefit.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bonuses Section */}
                    {showBonuses && (
                        <div className="mt-8">
                            <div className="text-center mb-6">
                                <span className="inline-flex items-center gap-2 text-lg font-bold text-green-400">
                                    <svg
                                        className="w-5 h-5"
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
                                    E mais! Bônus exclusivos inclusos:
                                </span>
                            </div>

                            <div className="space-y-3">
                                {bonuses.map((bonus, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <span aria-hidden="true">
                                            {bonus.icon}
                                        </span>
                                        <span className="text-base md:text-lg text-green-100 font-medium">
                                            {bonus.text}
                                        </span>
                                        <span className="ml-auto text-xs text-green-400 font-semibold px-2 py-1 bg-green-500/20 rounded">
                                            GRÁTIS
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Value Stack */}
                    <div className="mt-10 p-6 rounded-2xl glass border border-white/10">
                        <div className="text-center">
                            <p className="text-neutral-400 mb-2">Valor total do pacote:</p>
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-2xl text-neutral-500 line-through">R$ 297</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full">
                                    -94% OFF
                                </span>
                            </div>
                            <div className="mt-2">
                                <span className="text-4xl md:text-5xl font-extrabold gradient-text">
                                    R$ 17
                                </span>
                            </div>
                            <p className="text-neutral-500 text-sm mt-2">
                                Pagamento único • Acesso vitalício
                            </p>
                        </div>
                    </div>

                    {/* Mini CTA */}
                    <div className="mt-8 text-center">
                        <a
                            href="#checkout"
                            className="btn btn-primary text-lg px-8 py-4"
                        >
                            <span>Garantir Minha Vaga por R$17</span>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsBullets;
