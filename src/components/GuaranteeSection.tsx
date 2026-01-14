import React from 'react';
import { ShieldIcon, LockIcon, LightningIcon } from './icons';

const GuaranteeSection: React.FC = () => {
    return (
        <section
            className="bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden"
            style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)' }}
        >
            <div
                className="mx-auto relative z-10"
                style={{ maxWidth: 'min(900px, 95vw)' }}
            >
                <div
                    className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30 rounded-3xl relative overflow-hidden"
                    style={{ padding: 'clamp(2rem, 5vw, 3rem)' }}
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full" />

                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <div
                            className="flex-shrink-0 relative"
                            style={{ width: 'clamp(100px, 25vw, 150px)' }}
                        >
                            <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl shadow-green-500/30 flex items-center justify-center rotate-3">
                                <div className="text-center -rotate-3">
                                    <ShieldIcon size={48} className="text-white mx-auto" />
                                    <div className="text-white font-bold" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>7</div>
                                    <div className="text-white/80" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)' }}>DIAS</div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl -z-10" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2
                                className="font-bold text-white"
                                style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)' }}
                            >
                                Garantia Incondicional de 7 Dias
                            </h2>

                            <p
                                className="text-gray-300 leading-relaxed"
                                style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
                            >
                                Se por qualquer motivo você não ficar 100% satisfeito com o conteúdo,
                                basta enviar um e-mail em até 7 dias e <strong className="text-green-400">devolvemos
                                    todo o seu dinheiro</strong>. Sem perguntas, sem burocracia. O risco é todo nosso.
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4" style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                                {[
                                    { step: '1', text: 'Acesse o curso' },
                                    { step: '2', text: 'Não gostou?' },
                                    { step: '3', text: 'Reembolso total' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2" style={{ fontSize: 'clamp(0.7rem, 1.75vw, 0.875rem)' }}>
                                        <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                            {item.step}
                                        </span>
                                        <span className="text-gray-300">{item.text}</span>
                                        {i < 2 && <span className="text-gray-600 hidden sm:inline">→</span>}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                {[
                                    { icon: <LockIcon size={14} className="text-green-400" />, text: 'Compra 100% Segura' },
                                    { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, text: 'Suporte por E-mail' },
                                    { icon: <LightningIcon size={14} className="text-amber-400" />, text: 'Reembolso em 48h' }
                                ].map((badge, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/5 rounded-lg flex items-center gap-1 text-gray-400"
                                        style={{ padding: 'clamp(0.3rem, 0.75vw, 0.5rem) clamp(0.5rem, 1.25vw, 0.75rem)', fontSize: 'clamp(0.6rem, 1.25vw, 0.75rem)' }}
                                    >
                                        <span>{badge.icon}</span>
                                        <span>{badge.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-500 mt-4" style={{ fontSize: 'clamp(0.6rem, 1.25vw, 0.75rem)' }}>
                    * Garantia válida para primeiras 7 dias após a compra
                </p>
            </div>
        </section>
    );
};

export default GuaranteeSection;
