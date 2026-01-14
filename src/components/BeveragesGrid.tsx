import React, { useState, useEffect, useCallback } from 'react';
import { CocktailIcon, BookIcon, ShoppingCartIcon, PauseIcon } from './icons';

// Dados dos drinks clássicos
const DRINKS = [
    { name: 'Caipirinha Especial', image: '/images/drinks/caipirinha.png', ingredients: 'Cachaça, limão, açúcar' },
    { name: 'Lagoa Azul', image: '/images/drinks/lagoa_azul.png', ingredients: 'Vodka, blue curaçao, limão' },
    { name: 'Mojito', image: '/images/drinks/mojito.png', ingredients: 'Rum, hortelã, limão, açúcar' },
    { name: 'Sex on the Beach', image: '/images/drinks/sex_on_beach.png', ingredients: 'Vodka, pêssego, cranberry' },
    { name: 'Margarita', image: '/images/drinks/margarita.png', ingredients: 'Tequila, triple sec, limão' },
    { name: 'Drink Caribenho', image: '/images/drinks/caribenho.png', ingredients: 'Rum, coco, abacaxi' },
    { name: 'Piña Colada', image: '/images/drinks/pina_colada.png', ingredients: 'Rum, leite de coco, abacaxi' },
    { name: 'Dry Martini', image: '/images/drinks/dry_martini.png', ingredients: 'Gin, vermute, azeitona' },
    { name: 'Negroni', image: '/images/drinks/negroni.png', ingredients: 'Gin, campari, vermute' },
    { name: 'Bloody Mary', image: '/images/drinks/bloody_mary.png', ingredients: 'Vodka, suco de tomate, especiarias' },
    { name: 'Midori Sour', image: '/images/drinks/midori_sour.png', ingredients: 'Midori, limão, açúcar' },
    { name: 'Pink Paradise', image: '/images/drinks/pink_paradise.png', ingredients: 'Vodka, morango, framboesa' },
];

// Dados dos smoothies e shakes
const SMOOTHIES = [
    { name: 'Smoothie de Morango', image: '/images/smoothies/strawberry.png', ingredients: 'Morango, iogurte, leite' },
    { name: 'Smoothie de Manga', image: '/images/smoothies/mango.png', ingredients: 'Manga, laranja, mel' },
    { name: 'Milkshake Chocolate', image: '/images/smoothies/chocolate.png', ingredients: 'Chocolate, sorvete, leite' },
    { name: 'Smoothie de Açaí', image: '/images/smoothies/acai.png', ingredients: 'Açaí, banana, granola' },
    { name: 'Milkshake Baunilha', image: '/images/smoothies/vanilla.png', ingredients: 'Baunilha, sorvete, caramelo' },
    { name: 'Green Detox', image: '/images/smoothies/green_detox.png', ingredients: 'Espinafre, maçã, gengibre' },
    { name: 'Banana com Amendoim', image: '/images/smoothies/banana_peanut.png', ingredients: 'Banana, amendoim, aveia' },
    { name: 'Frutas Vermelhas', image: '/images/smoothies/mixed_berry.png', ingredients: 'Morango, mirtilo, framboesa' },
];

// Dados das batidas brasileiras
const BATIDAS = [
    { name: 'Batida de Coco', image: '/images/batidas/coco.png', ingredients: 'Cachaça, coco, leite condensado' },
    { name: 'Batida de Maracujá', image: '/images/batidas/maracuja.png', ingredients: 'Cachaça, maracujá, açúcar' },
    { name: 'Batida de Morango', image: '/images/batidas/morango.png', ingredients: 'Cachaça, morango, leite condensado' },
    { name: 'Batida de Amendoim', image: '/images/batidas/amendoim.png', ingredients: 'Cachaça, amendoim, leite condensado' },
    { name: 'Batida de Limão', image: '/images/batidas/limao.png', ingredients: 'Cachaça, limão, açúcar' },
    { name: 'Batida de Banana', image: '/images/batidas/banana.png', ingredients: 'Cachaça, banana, canela' },
    { name: 'Batida de Abacaxi', image: '/images/batidas/abacaxi.png', ingredients: 'Cachaça, abacaxi, hortelã' },
    { name: 'Batida de Café', image: '/images/batidas/cafe.png', ingredients: 'Cachaça, café, leite condensado' },
];

type Category = 'drinks' | 'smoothies' | 'batidas';

interface CategoryConfig {
    id: Category;
    title: string;
    shortTitle: string;
    items: typeof DRINKS;
    gradient: string;
    icon: React.ReactNode;
}

const CATEGORIES: CategoryConfig[] = [
    {
        id: 'drinks',
        title: 'Drinks e Coquetéis',
        shortTitle: 'Drinks',
        items: DRINKS,
        gradient: 'from-teal-600 to-teal-800',
        icon: <CocktailIcon size={20} className="text-white" />
    },
    {
        id: 'smoothies',
        title: 'Smoothies e Shakes',
        shortTitle: 'Smoothies',
        items: SMOOTHIES,
        gradient: 'from-purple-600 to-purple-800',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M17 8a4 4 0 0 0-8 0" /><path d="M5 12h14L17 22H7L5 12z" /><path d="M12 12v10" /></svg>
    },
    {
        id: 'batidas',
        title: 'Batidas Brasileiras',
        shortTitle: 'Batidas',
        items: BATIDAS,
        gradient: 'from-amber-600 to-amber-800',
        icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
    }
];

const AUTO_SLIDE_INTERVAL = 5000;

const BeveragesGrid: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentCategory = CATEGORIES[activeIndex];

    // Auto-slide effect
    useEffect(() => {
        if (isPaused) {
            setProgress(0);
            return;
        }

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 0;
                return prev + (100 / (AUTO_SLIDE_INTERVAL / 50));
            });
        }, 50);

        const slideInterval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setActiveIndex(prev => (prev + 1) % CATEGORIES.length);
                setIsTransitioning(false);
                setProgress(0);
            }, 300);
        }, AUTO_SLIDE_INTERVAL);

        return () => {
            clearInterval(progressInterval);
            clearInterval(slideInterval);
        };
    }, [isPaused]);

    const goToCategory = useCallback((index: number) => {
        if (index === activeIndex) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setActiveIndex(index);
            setIsTransitioning(false);
            setProgress(0);
        }, 300);
    }, [activeIndex]);

    const handlePrevious = useCallback(() => {
        const newIndex = activeIndex === 0 ? CATEGORIES.length - 1 : activeIndex - 1;
        goToCategory(newIndex);
    }, [activeIndex, goToCategory]);

    const handleNext = useCallback(() => {
        const newIndex = (activeIndex + 1) % CATEGORIES.length;
        goToCategory(newIndex);
    }, [activeIndex, goToCategory]);

    return (
        <section
            className={`bg-gradient-to-b ${currentCategory.gradient} transition-all duration-500`}
            style={{
                padding: 'clamp(1.5rem, 4vw, 4rem) clamp(0.75rem, 2vw, 2rem)',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
        >
            <div
                className="mx-auto w-full"
                style={{ maxWidth: 'min(1200px, 95vw)' }}
            >
                {/* Title - Fluid Typography */}
                <h2
                    className="font-bold text-white text-center"
                    style={{
                        fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                        marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                >
                    Receitas que você vai aprender:
                </h2>

                {/* Subtitle */}
                <p
                    className="text-center text-white/70"
                    style={{
                        fontSize: 'clamp(0.7rem, 2vw, 0.875rem)',
                        marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                >
                    + de 200 receitas divididas em categorias
                </p>

                {/* Category Navigation */}
                <div className="relative" style={{ marginBottom: 'clamp(1rem, 4vw, 2rem)' }}>
                    {/* Navigation Arrows - Only on larger screens */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full items-center justify-center text-white transition-all z-10 hidden lg:flex"
                        style={{
                            width: 'clamp(2rem, 3vw, 2.5rem)',
                            height: 'clamp(2rem, 3vw, 2.5rem)',
                            transform: 'translateY(-50%) translateX(-50%)'
                        }}
                        aria-label="Anterior"
                    >
                        ←
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full items-center justify-center text-white transition-all z-10 hidden lg:flex"
                        style={{
                            width: 'clamp(2rem, 3vw, 2.5rem)',
                            height: 'clamp(2rem, 3vw, 2.5rem)',
                            transform: 'translateY(-50%) translateX(50%)'
                        }}
                        aria-label="Próximo"
                    >
                        →
                    </button>

                    {/* Category Tabs - Fluid */}
                    <div
                        className="flex justify-center overflow-x-auto scrollbar-hide"
                        style={{ gap: 'clamp(0.25rem, 1vw, 0.75rem)', paddingBottom: '0.5rem' }}
                    >
                        {CATEGORIES.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => goToCategory(index)}
                                className={`relative flex-shrink-0 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${activeIndex === index
                                    ? 'bg-white text-gray-900 shadow-lg scale-105'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                style={{
                                    padding: 'clamp(0.4rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1.25rem)',
                                    fontSize: 'clamp(0.65rem, 2vw, 0.875rem)'
                                }}
                            >
                                <span className="mr-1">{category.icon}</span>
                                <span className="hidden xs:inline sm:hidden">{category.shortTitle}</span>
                                <span className="inline xs:hidden sm:inline">{category.title}</span>

                                {/* Progress bar */}
                                {activeIndex === index && !isPaused && (
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gray-200/30 rounded-full overflow-hidden"
                                        style={{ height: 'clamp(2px, 0.3vw, 3px)' }}
                                    >
                                        <div
                                            className="h-full bg-green-500 transition-all duration-50 ease-linear"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Title with Icon */}
                <div
                    className={`text-center transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                    style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}
                >
                    <span style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>{currentCategory.icon}</span>
                    <h3
                        className="font-bold text-white"
                        style={{
                            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                            marginTop: 'clamp(0.25rem, 0.5vw, 0.5rem)'
                        }}
                    >
                        {currentCategory.title}
                    </h3>
                    <p
                        className="text-white/60"
                        style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
                    >
                        {currentCategory.items.length} receitas disponíveis
                    </p>
                </div>

                {/* Grid - Auto-fit for any screen size */}
                <div
                    className={`grid transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 45vw), 1fr))',
                        gap: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                >
                    {currentCategory.items.map((item, index) => (
                        <div
                            key={`${currentCategory.id}-${index}`}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                            style={{ borderRadius: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}
                        >
                            {/* Image with aspect ratio */}
                            <div
                                className="relative overflow-hidden"
                                style={{ aspectRatio: '4/3' }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    loading="lazy"
                                    style={{ objectPosition: 'center' }}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center"
                                    style={{ paddingBottom: 'clamp(0.25rem, 1vw, 0.5rem)' }}
                                >
                                    <span
                                        className="text-white font-medium"
                                        style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}
                                    >
                                        Ver Receita
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: 'clamp(0.4rem, 1.5vw, 0.75rem)' }}>
                                <h3
                                    className="font-bold text-gray-800 truncate"
                                    style={{
                                        fontSize: 'clamp(0.65rem, 2vw, 0.875rem)',
                                        marginBottom: 'clamp(0.1rem, 0.5vw, 0.25rem)'
                                    }}
                                >
                                    {item.name}
                                </h3>
                                <p
                                    className="text-gray-500 truncate"
                                    style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)' }}
                                >
                                    {item.ingredients}
                                </p>
                                <div
                                    className="flex items-center"
                                    style={{ marginTop: 'clamp(0.25rem, 0.75vw, 0.5rem)' }}
                                >
                                    <span
                                        className="text-green-600 font-medium flex items-center gap-1"
                                        style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.65rem)' }}
                                    >
                                        <BookIcon size={10} className="text-green-600" /> Passo a passo
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots Navigation */}
                <div
                    className="flex justify-center lg:hidden"
                    style={{ gap: 'clamp(0.4rem, 1vw, 0.5rem)', marginTop: 'clamp(1rem, 3vw, 1.5rem)' }}
                >
                    {CATEGORIES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToCategory(index)}
                            className={`rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-white' : 'bg-white/40'
                                }`}
                            style={{
                                width: activeIndex === index ? 'clamp(1rem, 3vw, 1.5rem)' : 'clamp(0.4rem, 1vw, 0.5rem)',
                                height: 'clamp(0.4rem, 1vw, 0.5rem)'
                            }}
                            aria-label={`Categoria ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Stats */}
                <div
                    className="grid grid-cols-3 mx-auto"
                    style={{
                        gap: 'clamp(0.5rem, 2vw, 1rem)',
                        marginTop: 'clamp(1rem, 4vw, 2.5rem)',
                        maxWidth: 'min(500px, 90vw)'
                    }}
                >
                    {[
                        { value: '12+', label: 'Drinks' },
                        { value: '8+', label: 'Smoothies' },
                        { value: '8+', label: 'Batidas' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div
                                className="font-bold text-white"
                                style={{ fontSize: 'clamp(1.25rem, 5vw, 2.5rem)' }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-white/70"
                                style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.875rem)' }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom text */}
                <p
                    className="text-center text-white font-bold"
                    style={{
                        fontSize: 'clamp(0.75rem, 2.5vw, 1.125rem)',
                        marginTop: 'clamp(0.75rem, 2vw, 2rem)'
                    }}
                >
                    <span className="flex items-center justify-center gap-2"><BookIcon size={18} /> +200 Receitas ilustradas</span>
                </p>

                {/* CTA Button - Fluid */}
                <div
                    className="flex justify-center"
                    style={{ marginTop: 'clamp(0.75rem, 2vw, 1.5rem)' }}
                >
                    <a
                        href="/checkout"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-center w-full sm:w-auto"
                        style={{
                            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                            fontSize: 'clamp(0.8rem, 2.5vw, 1.125rem)',
                            maxWidth: 'min(400px, 90vw)'
                        }}
                    >
                        <span className="flex items-center gap-2"><ShoppingCartIcon size={18} /> QUERO APRENDER TUDO!</span>
                    </a>
                </div>

                {/* Pause indicator - Desktop only */}
                {isPaused && (
                    <p
                        className="text-center text-white/40 hidden lg:block"
                        style={{
                            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                            marginTop: 'clamp(0.5rem, 1vw, 0.75rem)'
                        }}
                    >
                        <span className="flex items-center gap-1"><PauseIcon size={12} /> Carrossel pausado</span>
                    </p>
                )}
            </div>
        </section>
    );
};

export default BeveragesGrid;
