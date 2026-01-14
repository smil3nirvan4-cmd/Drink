import React from 'react';
import { BookIcon, ShoppingCartIcon } from './icons';

// Dados dos drinks com imagens reais
const DRINKS = [
    {
        name: 'Caipirinha Especial',
        image: '/images/drinks/caipirinha.png',
        ingredients: 'Cachaça, limão, açúcar'
    },
    {
        name: 'Lagoa Azul',
        image: '/images/drinks/lagoa_azul.png',
        ingredients: 'Vodka, blue curaçao, limão'
    },
    {
        name: 'Mojito',
        image: '/images/drinks/mojito.png',
        ingredients: 'Rum, hortelã, limão, açúcar'
    },
    {
        name: 'Sex on the Beach',
        image: '/images/drinks/sex_on_beach.png',
        ingredients: 'Vodka, pêssego, cranberry'
    },
    {
        name: 'Margarita',
        image: '/images/drinks/margarita.png',
        ingredients: 'Tequila, triple sec, limão'
    },
    {
        name: 'Drink Caribenho',
        image: '/images/drinks/caribenho.png',
        ingredients: 'Rum, coco, abacaxi'
    },
    {
        name: 'Piña Colada',
        image: '/images/drinks/pina_colada.png',
        ingredients: 'Rum, leite de coco, abacaxi'
    },
    {
        name: 'Dry Martini',
        image: '/images/drinks/dry_martini.png',
        ingredients: 'Gin, vermute, azeitona'
    },
    {
        name: 'Negroni',
        image: '/images/drinks/negroni.png',
        ingredients: 'Gin, campari, vermute'
    },
    {
        name: 'Bloody Mary',
        image: '/images/drinks/bloody_mary.png',
        ingredients: 'Vodka, suco de tomate, especiarias'
    },
    {
        name: 'Midori Sour',
        image: '/images/drinks/midori_sour.png',
        ingredients: 'Midori, limão, açúcar'
    },
    {
        name: 'Pink Paradise',
        image: '/images/drinks/pink_paradise.png',
        ingredients: 'Vodka, morango, framboesa'
    },
];

interface DrinksGridProps {
    title?: string;
}

const DrinksGrid: React.FC<DrinksGridProps> = ({
    title = "Alguns dos Drinks e Coquetéis que você vai aprender:"
}) => {
    return (
        <section className="py-16 px-4 bg-gradient-to-b from-teal-600 to-teal-800">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="text-center text-teal-200 mb-10 text-sm">
                    + Caipirinha, Cosmopolitan, Bellini, Screwdriver, White Russian, Fitzgerald e muito mais...
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {DRINKS.map((drink, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                        >
                            {/* Real Image */}
                            <div className="relative h-40 overflow-hidden">
                                <img
                                    src={drink.image}
                                    alt={drink.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                                    <span className="text-white text-sm font-medium">Ver Receita</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3">
                                <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">
                                    {drink.name}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">
                                    {drink.ingredients}
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <BookIcon size={12} className="text-green-600" />
                                    <span className="text-xs text-green-600 font-medium">Passo a passo</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom text */}
                <p className="text-center text-white font-bold mt-10 text-lg flex items-center justify-center gap-2">
                    <BookIcon size={20} /> +200 Receitas ilustradas e fáceis de Seguir
                </p>

                {/* CTA Button */}
                <div className="flex justify-center mt-6">
                    <a
                        href="/checkout"
                        className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        <ShoppingCartIcon size={20} /> QUERO APRENDER!
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DrinksGrid;
