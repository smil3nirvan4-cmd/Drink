import React from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon, BookIcon, CocktailIcon } from './icons';

interface PricingCardsProps {
    basicPrice?: number;
    completePrice?: number;
    checkoutUrl?: string;
}

const PricingCards: React.FC<PricingCardsProps> = ({
    basicPrice = 16,
    completePrice = 27,
    checkoutUrl = '/checkout'
}) => {
    return (
        <section className="py-16 px-4 bg-slate-700">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                    Escolha sua oferta abaixo:
                </h2>

                {/* Cards Container */}
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

                    {/* Basic Card */}
                    <div className="bg-neutral-900 rounded-2xl p-6 border-2 border-neutral-700 hover:border-amber-500/50 transition-colors">
                        {/* Badge */}
                        <div className="bg-amber-500 text-black font-bold text-sm px-4 py-1 rounded-full inline-block mb-4">
                            +200 Receitas de Drinks
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> E-book Receitas de Drinks
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> +200 Receitas de Bebidas
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> Lista de Compra
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <XCircleIcon size={18} className="text-gray-600 flex-shrink-0" /> <s>E-book para revendedora</s>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <XCircleIcon size={18} className="text-gray-600 flex-shrink-0" /> <s>Bônus exclusivos</s>
                            </li>
                        </ul>

                        {/* Price */}
                        <div className="text-center mb-6">
                            <span className="text-4xl md:text-5xl font-bold text-white">R${basicPrice}</span>
                            <p className="text-gray-400 text-sm">pagina uma vez</p>
                        </div>

                        {/* CTA */}
                        <a
                            href={checkoutUrl}
                            className="block w-full py-3 px-6 bg-amber-500 hover:bg-amber-600 text-black font-bold text-center rounded-lg transition-colors"
                        >
                            COMPRAR AGORA
                        </a>
                    </div>

                    {/* Complete Card - Highlighted */}
                    <div className="bg-neutral-900 rounded-2xl p-6 border-2 border-amber-500 relative overflow-hidden hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                        {/* Popular tag */}
                        <div className="absolute -right-8 top-6 bg-red-500 text-white text-xs font-bold px-10 py-1 rotate-45">
                            MAIS VENDIDO
                        </div>

                        {/* Badge */}
                        <div className="bg-amber-500 text-black font-bold text-sm px-4 py-1 rounded-full inline-block mb-4">
                            +200 Receitas de Drinks COMPLETO
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> E-book Receitas de Drinks
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> +200 Receitas de Bebidas
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> Sumos Iniciais + Atualizações
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> Acesso Gratúnito a uma vida
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> Ideias para Drinks Diferentes e Pedidos
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> Guia de Decoração para Drinks
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <CheckCircleIcon size={18} className="text-green-400 flex-shrink-0" /> Lista Completa de ingredientes
                            </li>
                        </ul>

                        {/* Price */}
                        <div className="text-center mb-6">
                            <span className="text-4xl md:text-5xl font-bold text-amber-400">R${completePrice}</span>
                            <p className="text-gray-400 text-sm">Pagamento único</p>
                        </div>

                        {/* CTA */}
                        <a
                            href={checkoutUrl}
                            className="block w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-bold text-center rounded-lg transition-colors"
                        >
                            COMPRAR O COMPLETO
                        </a>

                        {/* Savings badge */}
                        <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                            <StarIcon size={14} className="text-amber-400" filled /> Economize comprando o pacote completo!
                        </p>
                    </div>
                </div>

                {/* Trust Elements */}
                <div className="mt-12">
                    {/* Book image placeholder */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-6 rounded-2xl shadow-lg flex items-center gap-2">
                            <BookIcon size={48} className="text-white" />
                            <CocktailIcon size={48} className="text-white" />
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto text-center text-sm text-gray-400">
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircleIcon size={16} className="text-green-400 flex-shrink-0" /> Acesso em celular, computador ou tablet
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircleIcon size={16} className="text-green-400 flex-shrink-0" /> Pedir em linguagem
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircleIcon size={16} className="text-green-400 flex-shrink-0" /> Preção! Download em pdf
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircleIcon size={16} className="text-green-400 flex-shrink-0" /> Para Revendor e Profissionais
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                            <CheckCircleIcon size={16} className="text-green-400 flex-shrink-0" /> Acesso vitalício
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingCards;
