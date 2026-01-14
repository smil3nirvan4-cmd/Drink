import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldIcon, LockIcon, EmailIcon } from '../components/icons';

const PrivacyPolicy: React.FC = () => {
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
                        <ShieldIcon size={32} className="text-amber-400" />
                        <h1 className="text-3xl font-bold text-white">Política de Privacidade</h1>
                    </div>

                    <p className="text-gray-400 mb-8">Última atualização: Janeiro de 2024</p>

                    <div className="prose prose-invert max-w-none space-y-8">
                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <LockIcon size={20} className="text-green-400" />
                                1. Informações que Coletamos
                            </h2>
                            <div className="text-gray-300 space-y-4 pl-7">
                                <p>Coletamos as seguintes informações quando você utiliza nosso site:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Dados de cadastro:</strong> nome, email, telefone</li>
                                    <li><strong>Dados de pagamento:</strong> processados de forma segura pela InfinitePay</li>
                                    <li><strong>Dados de navegação:</strong> páginas visitadas, tempo no site, dispositivo utilizado</li>
                                    <li><strong>Cookies:</strong> para melhorar sua experiência de navegação</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">2. Como Utilizamos suas Informações</h2>
                            <div className="text-gray-300 space-y-4">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Processar e confirmar suas compras</li>
                                    <li>Enviar atualizações sobre o produto adquirido</li>
                                    <li>Fornecer suporte ao cliente</li>
                                    <li>Melhorar nossos produtos e serviços</li>
                                    <li>Enviar comunicações de marketing (apenas com seu consentimento)</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">3. Compartilhamento de Dados</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Processadores de pagamento (InfinitePay) para conclusão de transações</li>
                                    <li>Provedores de serviço essenciais para operação do site</li>
                                    <li>Quando exigido por lei ou ordem judicial</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">4. Segurança dos Dados</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Criptografia SSL em todas as transmissões</li>
                                    <li>Armazenamento seguro em servidores protegidos</li>
                                    <li>Acesso restrito apenas a funcionários autorizados</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4">5. Seus Direitos (LGPD)</h2>
                            <div className="text-gray-300 space-y-4">
                                <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Acessar seus dados pessoais</li>
                                    <li>Corrigir dados incompletos ou desatualizados</li>
                                    <li>Solicitar exclusão de seus dados</li>
                                    <li>Revogar consentimento para uso de dados</li>
                                    <li>Obter portabilidade dos dados</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <EmailIcon size={20} className="text-amber-400" />
                                6. Contato
                            </h2>
                            <div className="text-gray-300 space-y-4 pl-7">
                                <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>
                                <p className="font-semibold text-white">Email: privacidade@receitasdedrinks.com.br</p>
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

export default PrivacyPolicy;
