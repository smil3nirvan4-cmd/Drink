import React from 'react';

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const benefits: Benefit[] = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: '+100 Receitas Exclusivas',
        description: 'Aprenda desde clássicos atemporais até drinks autorais que vão impressionar qualquer um.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Aulas em Vídeo HD',
        description: 'Conteúdo gravado em alta qualidade com demonstrações passo a passo fáceis de seguir.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Acesso Vitalício',
        description: 'Estude no seu ritmo, quando e onde quiser. O conteúdo é seu para sempre.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
        title: 'Certificado Reconhecido',
        description: 'Receba seu certificado de conclusão para comprovar sua expertise em coquetelaria.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Comunidade Exclusiva',
        description: 'Faça parte de um grupo VIP com outros entusiastas e troque experiências.',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: 'Suporte Dedicado',
        description: 'Tire suas dúvidas diretamente com nosso time de especialistas em drinks.',
    },
];

const Benefits: React.FC = () => {
    return (
        <section
            id="benefits"
            className="section relative"
            aria-labelledby="benefits-title"
        >
            {/* Background Decoration */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl"
                aria-hidden="true"
            />

            <div className="container relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full">
                        Por que escolher nosso curso?
                    </span>
                    <h2 id="benefits-title" className="text-3xl md:text-4xl font-bold mb-4">
                        Tudo que você precisa para{' '}
                        <span className="gradient-text">dominar a coquetelaria</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Um curso completo pensado para transformar você em um verdadeiro
                        especialista em drinks, mesmo que nunca tenha segurado uma coqueteleira.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <article
                            key={index}
                            className="card group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                {benefit.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold mb-2 text-neutral-100">
                                {benefit.title}
                            </h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </article>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { value: '2.500+', label: 'Alunos' },
                        { value: '100+', label: 'Receitas' },
                        { value: '50h', label: 'De Conteúdo' },
                        { value: '4.9', label: 'Avaliação' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-2xl glass"
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-neutral-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
