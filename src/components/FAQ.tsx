import React, { useState } from 'react';
import { ShoppingCartIcon } from './icons';

// FAQ items
const FAQ_ITEMS = [
    {
        question: "São quantos drinks?",
        answer: "+200 receitas de drinks e coquetéis, desde os clássicos até os mais modernos. Todos com passo a passo detalhado."
    },
    {
        question: "Recebo tudo imediatamente após o pedido?",
        answer: "Sim! O acesso é liberado imediatamente após a confirmação do pagamento. Você receberá um email com as instruções de acesso."
    },
    {
        question: "Por quanto tempo tenho acesso aos materiais?",
        answer: "Acesso vitalício! Uma vez que você adquire, terá acesso para sempre, incluindo todas as atualizações futuras."
    },
    {
        question: "Como me cadastro?",
        answer: "Basta clicar no botão de compra, preencher seus dados e realizar o pagamento. Você receberá automaticamente o acesso."
    },
    {
        question: "Por quanto tempo fica online?",
        answer: "O material fica disponível 24/7, para você acessar quando e onde quiser, pelo tempo que precisar."
    },
    {
        question: "Quais canais posso baixar o livro?",
        answer: "Você pode baixar em PDF para ler em qualquer dispositivo: celular, tablet, computador ou imprimir."
    },
    {
        question: "Tem garantia?",
        answer: "Sim! Garantia incondicional de 7 dias. Se não gostar, devolvemos 100% do seu dinheiro, sem perguntas."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-4 bg-slate-800">
            <div className="max-w-3xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                    Dúvidas Frequentes
                </h2>

                {/* FAQ Items */}
                <div className="space-y-3">
                    {FAQ_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-md"
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-medium text-gray-800">{item.question}</span>
                                <span className={`text-2xl text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="px-6 pb-4 text-gray-600">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center mt-10">
                    <a
                        href="/checkout"
                        className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        <ShoppingCartIcon size={20} /> QUERO APRENDER!
                    </a>
                </div>

                {/* Footer text */}
                <p className="text-center text-gray-400 text-sm mt-8">
                    ©️ 2024 Receitas de Drinks | A solução e divulgação citas são de inteira responsabilidade da empresa
                </p>
            </div>
        </section>
    );
};

export default FAQ;
