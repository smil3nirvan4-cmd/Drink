import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon, MessageIcon, CheckCircleIcon } from '../components/icons';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'suporte',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
            {/* Header */}
            <header className="py-6 px-4 border-b border-white/10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold gradient-text">
                        Receitas de Drinks
                    </Link>
                    <Link to="/" className="text-amber-400 hover:underline text-sm">
                        ← Voltar ao início
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="py-12 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                            <MessageIcon size={32} className="text-amber-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Fale Conosco</h1>
                        <p className="text-gray-400">Estamos aqui para ajudar você</p>
                    </div>

                    {submitted ? (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
                            <CheckCircleIcon size={48} className="text-green-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-green-400 mb-2">Mensagem Enviada!</h2>
                            <p className="text-gray-300 mb-6">
                                Obrigado pelo seu contato. Nossa equipe responderá em até 24 horas úteis.
                            </p>
                            <Link
                                to="/"
                                className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
                            >
                                Voltar ao Início
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Seu Nome *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="João Silva"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Seu Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    placeholder="joao@email.com"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Assunto
                                </label>
                                <select
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                                >
                                    <option value="suporte" className="bg-neutral-900">Suporte Técnico</option>
                                    <option value="duvidas" className="bg-neutral-900">Dúvidas sobre o Curso</option>
                                    <option value="pagamento" className="bg-neutral-900">Problemas com Pagamento</option>
                                    <option value="reembolso" className="bg-neutral-900">Solicitar Reembolso</option>
                                    <option value="parceria" className="bg-neutral-900">Parcerias</option>
                                    <option value="outro" className="bg-neutral-900">Outro Assunto</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Mensagem *
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                    placeholder="Escreva sua mensagem aqui..."
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-[1.02]"
                            >
                                Enviar Mensagem
                            </button>
                        </form>
                    )}

                    {/* Alternative Contact */}
                    <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">Outras formas de contato</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <EmailIcon size={20} className="text-amber-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-white">suporte@receitasdedrinks.com.br</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MessageIcon size={20} className="text-green-400" />
                                <div>
                                    <p className="text-sm text-gray-400">WhatsApp</p>
                                    <p className="text-white">(11) 99999-9999</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            Respondemos em até 24 horas úteis
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 px-4 border-t border-white/10 text-center text-gray-500 text-sm">
                © 2024 Receitas de Drinks. Todos os direitos reservados.
            </footer>
        </div>
    );
};

export default Contact;
