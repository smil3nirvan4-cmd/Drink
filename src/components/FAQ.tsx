import React, { useState } from 'react';
import { ShoppingCartIcon, ChevronDownIcon } from './icons';

// FAQ items - Expanded with 15 comprehensive questions
const FAQ_ITEMS = [
    // SOBRE O CURSO
    {
        category: 'Sobre o Curso',
        question: "São quantas receitas de drinks?",
        answer: "+200 receitas de drinks e coquetéis completas, desde os clássicos (Caipirinha, Mojito, Margarita) até os mais modernos. Todas com passo a passo detalhado, fotos dos ingredientes e dicas profissionais."
    },
    {
        category: 'Sobre o Curso',
        question: "O curso é indicado para iniciantes?",
        answer: "Sim! O curso foi desenvolvido pensando em quem nunca fez um drink na vida. Começamos do básico absoluto e avançamos gradualmente. Mesmo que você não saiba nada de bartending, vai conseguir acompanhar."
    },
    {
        category: 'Sobre o Curso',
        question: "Quais tipos de receitas estão incluídas?",
        answer: "Drinks alcoólicos (coquetéis clássicos e modernos), smoothies e vitaminas saudáveis, batidas brasileiras tradicionais, drinks sem álcool, e receitas especiais para festas e eventos."
    },
    {
        category: 'Sobre o Curso',
        question: "Preciso de equipamentos especiais?",
        answer: "Não! Ensinamos a fazer drinks profissionais usando utensílios que você já tem em casa. Claro que ter uma coqueteleira ajuda, mas mostramos alternativas caseiras para tudo."
    },
    // ACESSO E ENTREGA
    {
        category: 'Acesso e Entrega',
        question: "Recebo tudo imediatamente após o pedido?",
        answer: "Sim! O acesso é liberado automaticamente após a confirmação do pagamento. Você receberá um email com as instruções de acesso e poderá começar a estudar imediatamente."
    },
    {
        category: 'Acesso e Entrega',
        question: "Por quanto tempo tenho acesso aos materiais?",
        answer: "Acesso VITALÍCIO! Uma vez que você adquire, terá acesso para sempre, incluindo todas as atualizações futuras que fizermos. Sem mensalidades ou taxas extras."
    },
    {
        category: 'Acesso e Entrega',
        question: "Posso acessar pelo celular?",
        answer: "Sim! Nossa plataforma é 100% responsiva. Você pode acessar pelo celular, tablet ou computador. Também é possível baixar o material em PDF para ler offline."
    },
    {
        category: 'Acesso e Entrega',
        question: "Posso baixar o material?",
        answer: "Sim! Todo o material pode ser baixado em PDF de alta qualidade para ler em qualquer dispositivo ou imprimir. Os vídeos ficam disponíveis online na área de membros."
    },
    // PAGAMENTO
    {
        category: 'Pagamento',
        question: "Quais formas de pagamento são aceitas?",
        answer: "Aceitamos PIX (aprovação instantânea), cartão de crédito em até 12x sem juros, cartão de débito e boleto bancário. O PIX é a forma mais rápida de liberar seu acesso."
    },
    {
        category: 'Pagamento',
        question: "O pagamento é seguro?",
        answer: "100% seguro! Utilizamos a plataforma InfinitePay, que possui certificação SSL e criptografia de dados bancários. Seus dados estão completamente protegidos."
    },
    {
        category: 'Pagamento',
        question: "Posso parcelar?",
        answer: "Sim! Você pode parcelar em até 12x sem juros no cartão de crédito. O valor aparece como 12x de R$1,42 no pacote básico."
    },
    // GARANTIA
    {
        category: 'Garantia',
        question: "E se eu não gostar do curso?",
        answer: "Sem problemas! Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeito, basta enviar um email e devolvemos 100% do seu dinheiro, sem perguntas."
    },
    {
        category: 'Garantia',
        question: "Como funciona o reembolso?",
        answer: "Basta enviar um email para nosso suporte dentro de 7 dias após a compra. O reembolso é processado em até 5 dias úteis, diretamente no mesmo método de pagamento utilizado."
    },
    // SUPORTE
    {
        category: 'Suporte',
        question: "Tenho suporte se tiver dúvidas?",
        answer: "Sim! Oferecemos suporte via WhatsApp e email. Nossa equipe responde em até 24 horas úteis. Você também terá acesso a uma comunidade de alunos para trocar experiências."
    },
    {
        category: 'Suporte',
        question: "E se eu tiver problemas técnicos?",
        answer: "Nossa equipe de suporte técnico está disponível para ajudar com qualquer problema de acesso. Basta entrar em contato pelo WhatsApp ou email que resolvemos rapidamente."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Group by category for better organization
    const categories = [...new Set(FAQ_ITEMS.map(item => item.category))];

    return (
        <section className="py-16 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-4">
                    Dúvidas Frequentes
                </h2>
                <p className="text-center text-gray-400 mb-12">
                    Tire todas as suas dúvidas sobre o curso
                </p>

                {/* FAQ Items grouped by category */}
                <div className="space-y-8">
                    {categories.map((category) => (
                        <div key={category}>
                            <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
                                {category}
                            </h3>
                            <div className="space-y-3">
                                {FAQ_ITEMS.filter(item => item.category === category).map((item, idx) => {
                                    const globalIndex = FAQ_ITEMS.findIndex(i => i.question === item.question);
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-colors"
                                        >
                                            {/* Question */}
                                            <button
                                                onClick={() => toggleItem(globalIndex)}
                                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="font-medium text-white pr-4">{item.question}</span>
                                                <ChevronDownIcon
                                                    size={20}
                                                    className={`text-amber-400 flex-shrink-0 transition-transform duration-300 ${openIndex === globalIndex ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {/* Answer */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${openIndex === globalIndex ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <p className="px-6 pb-4 text-gray-400 leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-12">
                    <a
                        href="/checkout"
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-full shadow-lg shadow-green-500/30 transform hover:scale-105 transition-all duration-200"
                    >
                        <ShoppingCartIcon size={20} /> QUERO APRENDER AGORA!
                    </a>
                </div>

                {/* Additional help */}
                <p className="text-center text-gray-500 text-sm mt-8">
                    Ainda tem dúvidas? <a href="/contato" className="text-amber-400 hover:underline">Fale conosco</a>
                </p>
            </div>
        </section>
    );
};

export default FAQ;
