import React from 'react';
import { TrophyIcon, GraduationCapIcon, StarIcon, CheckIcon } from './icons';

const InstructorBio: React.FC = () => {
    return (
        <section
            className="bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
            style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)' }}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />

            <div
                className="mx-auto relative z-10"
                style={{ maxWidth: 'min(1000px, 95vw)' }}
            >
                {/* Section Title */}
                <h2
                    className="font-bold text-white text-center"
                    style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                        marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                >
                    Quem Vai Te Ensinar
                </h2>
                <p
                    className="text-center text-gray-400"
                    style={{
                        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                        marginBottom: 'clamp(2rem, 5vw, 3rem)'
                    }}
                >
                    Conheça o especialista por trás das receitas
                </p>

                {/* Instructor Card */}
                <div
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                    style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        {/* Photo */}
                        <div
                            className="flex-shrink-0 rounded-2xl overflow-hidden border-4 border-amber-500/30 shadow-xl shadow-amber-500/10"
                            style={{
                                width: 'clamp(150px, 30vw, 200px)',
                                height: 'clamp(150px, 30vw, 200px)'
                            }}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images/chef_rafael.png"
                                    alt="Chef Rafael Moreira"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Bio Content */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap mb-2">
                                <h3
                                    className="font-bold text-white"
                                    style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}
                                >
                                    Chef Rafael Moreira
                                </h3>
                                <span
                                    className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full flex items-center gap-1"
                                    style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
                                >
                                    <CheckIcon size={12} /> Bartender Profissional
                                </span>
                            </div>

                            <p
                                className="text-gray-300 leading-relaxed"
                                style={{
                                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                                    marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
                                }}
                            >
                                Com <strong className="text-white">mais de 12 anos de experiência</strong> em bares e
                                restaurantes premiados de São Paulo, já formei mais de <strong className="text-green-400">12.000
                                    alunos</strong> que hoje fazem drinks profissionais em suas casas.
                                Minha missão é provar que qualquer pessoa pode aprender a arte da coquetelaria,
                                mesmo sem experiência prévia.
                            </p>

                            {/* Credentials */}
                            <div
                                className="flex flex-wrap justify-center md:justify-start gap-3"
                                style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
                            >
                                {[
                                    { icon: <TrophyIcon size={16} className="text-amber-400" />, text: '12 anos de experiência' },
                                    { icon: <GraduationCapIcon size={16} className="text-blue-400" />, text: 'Formação internacional' },
                                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><rect x="2" y="7" width="20" height="15" rx="2" ry="2" /><polyline points="17 2 12 7 7 2" /></svg>, text: 'Participação em TV' },
                                    { icon: <StarIcon size={16} className="text-yellow-400" filled />, text: 'Nota 4.9 no curso' }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/5 rounded-lg flex items-center gap-2"
                                        style={{
                                            padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.75rem)',
                                            fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)'
                                        }}
                                    >
                                        <span>{item.icon}</span>
                                        <span className="text-gray-300">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote
                                className="border-l-4 border-amber-500 pl-4 italic text-gray-400"
                                style={{ fontSize: 'clamp(0.75rem, 1.75vw, 0.9rem)' }}
                            >
                                "Meu objetivo é que você impressione seus amigos e família com drinks de qualidade
                                profissional, sem precisar gastar uma fortuna em cursos presenciais."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstructorBio;
