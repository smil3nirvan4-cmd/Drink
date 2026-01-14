import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentIcon } from '../components/icons';

const TermsOfUse: React.FC = () => {
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
                        <DocumentIcon size={32} className="text-amber-400" />
                        <h1 className="text-3xl font-bold text-white">Termos de Uso</h1>
                    </div>

                    <p className="text-gray-400 mb-8">Última atualização: Janeiro de 2024</p>

                    <div className="prose prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">1. Aceitação dos Termos</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Ao acessar e utilizar este site e seus produtos digitais, você concorda com estes Termos de Uso. Se não concordar com algum termo, não utilize nossos serviços.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">2. Descrição do Produto</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>O "Receitas de Drinks" é um produto digital que inclui:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>E-book com +200 receitas de drinks, smoothies e batidas</li>
                                    <li>Vídeo-aulas de técnicas de bartending</li>
                                    <li>Acesso à área de membros exclusiva</li>
                                    <li>Bônus conforme descrito na página de vendas</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">3. Licença de Uso</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Ao adquirir nosso produto, você recebe uma licença pessoal, intransferível e não exclusiva para:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Acessar e utilizar o conteúdo para uso pessoal</li>
                                    <li>Baixar e imprimir materiais para uso próprio</li>
                                </ul>
                                <p className="font-semibold text-amber-400">É expressamente proibido:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Revender, distribuir ou compartilhar o conteúdo</li>
                                    <li>Reproduzir comercialmente qualquer material</li>
                                    <li>Compartilhar credenciais de acesso</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">4. Pagamento e Acesso</h2>
                            <div className="text-gray-300 space-y-4">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>O acesso é liberado imediatamente após confirmação do pagamento</li>
                                    <li>O acesso é vitalício após a compra</li>
                                    <li>Pagamentos são processados pela InfinitePay</li>
                                    <li>Preços podem ser alterados sem aviso prévio para novas compras</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">5. Propriedade Intelectual</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Todo o conteúdo disponibilizado (textos, imagens, vídeos, receitas, marca) é de propriedade exclusiva do Receitas de Drinks e está protegido por leis de direitos autorais.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">6. Comportamento do Usuário</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>O usuário se compromete a:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Fornecer informações verdadeiras no cadastro</li>
                                    <li>Manter a confidencialidade de suas credenciais</li>
                                    <li>Não utilizar o conteúdo para fins ilegais</li>
                                    <li>Respeitar outros membros da comunidade</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">7. Limitação de Responsabilidade</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>O conteúdo é fornecido "como está". Não garantimos resultados específicos com o uso do material. O usuário é responsável pelo uso das bebidas alcoólicas de forma responsável e legal.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">8. Foro</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de São Paulo/SP para dirimir quaisquer questões.</p>
                            </div>
                        </section>
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

export default TermsOfUse;
