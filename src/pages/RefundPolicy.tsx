import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshIcon, ShieldIcon, CheckCircleIcon } from '../components/icons';

const RefundPolicy: React.FC = () => {
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
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <RefreshIcon size={32} className="text-green-400" />
                        <h1 className="text-3xl font-bold text-white">Política de Reembolso</h1>
                    </div>

                    <p className="text-gray-400 mb-8">Garantia incondicional de satisfação</p>

                    {/* Highlight Box */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <ShieldIcon size={32} className="text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-green-400 mb-2">
                                    Garantia de 7 Dias
                                </h2>
                                <p className="text-gray-300">
                                    100% do seu dinheiro de volta, sem perguntas, se você não ficar satisfeito.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">Como Funciona</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Acreditamos tanto na qualidade do nosso produto que oferecemos uma garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do valor pago.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">Prazo para Solicitar</h2>
                            <div className="text-gray-300 space-y-4">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Período:</strong> 7 dias corridos a partir da data de compra</li>
                                    <li><strong>Contagem:</strong> Inicia no dia da confirmação do pagamento</li>
                                    <li><strong>Validade:</strong> Solicitações após o prazo não serão aceitas</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">Como Solicitar o Reembolso</h2>
                            <div className="text-gray-300 space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                                        <div>
                                            <p className="font-semibold text-white">Envie um email</p>
                                            <p>Para: <span className="text-amber-400">suporte@receitasdedrinks.com.br</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                                        <div>
                                            <p className="font-semibold text-white">Informe seus dados</p>
                                            <p>Nome completo, email de compra e motivo (opcional)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                                        <div>
                                            <p className="font-semibold text-white">Receba a confirmação</p>
                                            <p>Responderemos em até 24h confirmando o reembolso</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">Prazo de Processamento</h2>
                            <div className="text-gray-300 space-y-4">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>PIX:</strong> Reembolso em até 2 dias úteis</li>
                                    <li><strong>Cartão de Crédito:</strong> Estorno em até 2 faturas</li>
                                    <li><strong>Boleto:</strong> Reembolso via transferência em até 5 dias úteis</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <CheckCircleIcon size={20} className="text-green-400" />
                                Nosso Compromisso
                            </h2>
                            <div className="text-gray-300 space-y-4 pl-7">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Sem burocracia ou perguntas constrangedoras</li>
                                    <li>Não pedimos justificativa obrigatória</li>
                                    <li>Processo 100% online</li>
                                    <li>Respeito total à sua decisão</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400 mb-4">Compre com tranquilidade!</p>
                        <Link
                            to="/checkout"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            <ShieldIcon size={20} />
                            COMPRAR COM GARANTIA
                        </Link>
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

export default RefundPolicy;
