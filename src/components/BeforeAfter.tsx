import React from 'react';
import { XCircleIcon, CheckCircleIcon, BookIcon, TrophyIcon, RocketIcon, ConfusedPersonIcon, CocktailIcon } from './icons';

const BeforeAfter: React.FC = () => {
    return (
        <section
            className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
            style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)' }}
        >
            <div
                className="mx-auto relative z-10"
                style={{ maxWidth: 'min(1100px, 95vw)' }}
            >
                {/* Section Title */}
                <h2
                    className="font-bold text-white text-center"
                    style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                        marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                >
                    Sua Transformação Começa Aqui
                </h2>
                <p
                    className="text-center text-gray-400"
                    style={{
                        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                        marginBottom: 'clamp(2rem, 5vw, 3rem)'
                    }}
                >
                    Veja o que você vai conquistar após o curso
                </p>

                {/* Before/After Comparison */}
                <div
                    className="grid md:grid-cols-2"
                    style={{ gap: 'clamp(1rem, 3vw, 2rem)' }}
                >
                    {/* BEFORE */}
                    <div
                        className="bg-red-500/10 border border-red-500/30 rounded-2xl relative overflow-hidden"
                        style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}
                    >
                        {/* Badge */}
                        <div
                            className="absolute top-4 left-4 bg-red-500 text-white font-bold rounded-full"
                            style={{
                                padding: 'clamp(0.25rem, 0.75vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)'
                            }}
                        >
                            ANTES
                        </div>

                        {/* Icon */}
                        <div
                            className="flex justify-center"
                            style={{
                                marginTop: 'clamp(1.5rem, 3vw, 2rem)'
                            }}
                        >
                            <ConfusedPersonIcon size={80} className="text-red-400" />
                        </div>

                        <h3
                            className="font-bold text-white text-center"
                            style={{
                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                margin: 'clamp(1rem, 2vw, 1.5rem) 0'
                            }}
                        >
                            Sem o Curso
                        </h3>

                        <ul style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>
                            {[
                                'Drinks sem graça e sempre iguais',
                                'Desperdício de ingredientes caros',
                                'Vergonha de servir para visitas',
                                'Sem saber a proporção certa',
                                'Depender de bar para tomar um bom drink',
                                'Festas sem diferencial'
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-gray-400"
                                    style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                                >
                                    <XCircleIcon size={16} className="text-red-400 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AFTER */}
                    <div
                        className="bg-green-500/10 border border-green-500/30 rounded-2xl relative overflow-hidden"
                        style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}
                    >
                        {/* Badge */}
                        <div
                            className="absolute top-4 right-4 bg-green-500 text-white font-bold rounded-full"
                            style={{
                                padding: 'clamp(0.25rem, 0.75vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)'
                            }}
                        >
                            DEPOIS
                        </div>

                        {/* Icon */}
                        <div
                            className="flex justify-center"
                            style={{
                                marginTop: 'clamp(1.5rem, 3vw, 2rem)'
                            }}
                        >
                            <CocktailIcon size={80} className="text-green-400" />
                        </div>

                        <h3
                            className="font-bold text-white text-center"
                            style={{
                                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                                margin: 'clamp(1rem, 2vw, 1.5rem) 0'
                            }}
                        >
                            Com o Curso
                        </h3>

                        <ul style={{ fontSize: 'clamp(0.75rem, 2vw, 0.9rem)' }}>
                            {[
                                'Mais de 200 receitas profissionais',
                                'Técnicas de bartender experiente',
                                'Impressionar família e amigos',
                                'Dominar proporções e misturas',
                                'Economizar dinheiro de bar',
                                'Ser a estrela das festas'
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2 text-gray-300"
                                    style={{ marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)' }}
                                >
                                    <CheckCircleIcon size={16} className="text-green-400 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Arrow/Transformation indicator */}
                <div
                    className="flex justify-center"
                    style={{ margin: 'clamp(1.5rem, 4vw, 2.5rem) 0' }}
                >
                    <div className="flex items-center gap-3 text-white">
                        <BookIcon size={32} className="text-amber-400" />
                        <span
                            className="text-amber-400 font-bold"
                            style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}
                        >
                            →
                        </span>
                        <TrophyIcon size={32} className="text-amber-400" />
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a
                        href="/checkout"
                        className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-full shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
                        style={{
                            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
                            fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)'
                        }}
                    >
                        <RocketIcon size={20} className="inline mr-2" /> QUERO ESSA TRANSFORMAÇÃO
                    </a>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
