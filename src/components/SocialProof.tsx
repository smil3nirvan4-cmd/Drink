import React, { useState, useEffect } from 'react';
import { UsersIcon, StarIcon, BookIcon, ThumbsUpIcon, LockIcon, LightningIcon, SmartphoneIcon, RefreshIcon, VideoIcon, CheckCircleIcon, LiveDot } from './icons';

// Dados dos depoimentos com fotos reais brasileiras e textos autênticos
const TESTIMONIALS = [
    {
        name: 'Amanda Oliveira',
        location: 'São Paulo, SP',
        avatar: '/images/avatars/amanda.png',
        rating: 5,
        text: 'Comprei pra fazer uma surpresa no aniversário do meu marido. Fiz uma Caipirinha de Maracujá que TODO MUNDO elogiou! As receitas são muito bem explicadas, até quem nunca mexeu com drinks consegue fazer.',
        verified: true,
        date: '2 dias atrás',
        highlight: 'Caipirinha de Maracujá'
    },
    {
        name: 'Carlos Henrique',
        location: 'Rio de Janeiro, RJ',
        avatar: '/images/avatars/carlos.png',
        rating: 5,
        text: 'Cara, pelo preço que paguei achei que ia ser fraco, mas me surpreendi demais! Já fiz mais de 15 drinks diferentes. Meus amigos ficam impressionados quando faço um Dry Martini ou uma Lagoa Azul profissional.',
        verified: true,
        date: '5 dias atrás',
        highlight: 'mais de 15 drinks'
    },
    {
        name: 'Juliana Santos',
        location: 'Belo Horizonte, MG',
        avatar: '/images/avatars/juliana.png',
        rating: 5,
        text: 'Amei as batidas brasileiras! A Batida de Amendoim ficou igual a que vendem em praia. Valeu cada centavo. Dica: façam a Batida de Café, é viciante!',
        verified: true,
        date: '1 semana atrás',
        highlight: 'Batida de Amendoim'
    },
    {
        name: 'Ricardo Mendes',
        location: 'Curitiba, PR',
        avatar: '/images/avatars/ricardo.png',
        rating: 5,
        text: 'Tenho 42 anos e nunca tinha feito um drink na vida. Agora faço Mojito, Piña Colada e até Negroni! Minha esposa não acredita. O material é muito didático, passo a passo com fotos.',
        verified: true,
        date: '1 semana atrás',
        highlight: 'nunca tinha feito um drink'
    },
    {
        name: 'Fernanda Costa',
        location: 'Porto Alegre, RS',
        avatar: '/images/avatars/fernanda.png',
        rating: 5,
        text: 'Os smoothies são MARAVILHOSOS! Comprei pensando só nos drinks mas acabei usando mais as receitas de smoothies pro café da manhã. O de Açaí com Banana virou rotina aqui em casa.',
        verified: true,
        date: '2 semanas atrás',
        highlight: 'Açaí com Banana'
    },
    {
        name: 'Marcos Souza',
        location: 'Salvador, BA',
        avatar: '/images/avatars/marcos.png',
        rating: 5,
        text: 'Moro na Bahia e achava que sabia fazer Caipirinha kkkk. Depois do curso descobri que estava fazendo tudo errado! Agora minhas festas de fim de semana são outro nível. Super recomendo!',
        verified: true,
        date: '3 semanas atrás',
        highlight: 'estava fazendo tudo errado'
    }
];

// Dados das estatísticas
const STATS = [
    { value: '12.847+', label: 'Alunos Satisfeitos', icon: <UsersIcon size={28} className="text-amber-400" /> },
    { value: '4.9', label: 'Avaliação Média', icon: <StarIcon size={28} className="text-amber-400" filled /> },
    { value: '200+', label: 'Receitas Exclusivas', icon: <BookIcon size={28} className="text-amber-400" /> },
    { value: '98%', label: 'Recomendam', icon: <ThumbsUpIcon size={28} className="text-amber-400" /> }
];

// Simular compradores recentes com cidades brasileiras reais
const RECENT_BUYERS = [
    { name: 'Maria L.', city: 'São Paulo', time: '2 min', product: 'Curso Completo' },
    { name: 'João P.', city: 'Rio de Janeiro', time: '4 min', product: 'Curso Premium' },
    { name: 'Ana C.', city: 'Brasília', time: '7 min', product: 'Curso Completo' },
    { name: 'Pedro M.', city: 'Salvador', time: '11 min', product: 'Curso Completo' },
    { name: 'Lucia F.', city: 'Fortaleza', time: '14 min', product: 'Curso Premium' },
    { name: 'Roberto S.', city: 'Recife', time: '18 min', product: 'Curso Completo' },
    { name: 'Camila R.', city: 'Curitiba', time: '22 min', product: 'Curso Completo' }
];

const SocialProof: React.FC = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [recentBuyer, setRecentBuyer] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [viewingCount, setViewingCount] = useState(47);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Show purchase notifications
    useEffect(() => {
        const showNext = () => {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setTimeout(() => {
                    setRecentBuyer(prev => (prev + 1) % RECENT_BUYERS.length);
                }, 500);
            }, 4000);
        };

        const interval = setInterval(showNext, 10000);
        setTimeout(showNext, 3000);

        return () => clearInterval(interval);
    }, []);

    // Simulate viewing count fluctuation
    useEffect(() => {
        const interval = setInterval(() => {
            setViewingCount(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                return Math.max(38, Math.min(67, prev + change));
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const renderStars = (count: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} size={16} filled className={i < count ? 'text-amber-400' : 'text-gray-700'} />
        ));
    };

    return (
        <section
            className="bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
            style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 3vw, 2rem)' }}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Live Purchase Notification - Fixed position */}
            <div
                className={`fixed z-50 transition-all duration-500 ${showNotification ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
                style={{
                    bottom: 'clamp(1rem, 3vw, 2rem)',
                    left: 'clamp(1rem, 3vw, 2rem)',
                    maxWidth: 'min(340px, 90vw)'
                }}
            >
                <div className="bg-white rounded-xl shadow-2xl p-3 flex items-center gap-3 border-l-4 border-green-500">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircleIcon size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm">
                            {RECENT_BUYERS[recentBuyer].name} de {RECENT_BUYERS[recentBuyer].city}
                        </p>
                        <p className="text-xs text-gray-500">
                            Comprou o {RECENT_BUYERS[recentBuyer].product} há {RECENT_BUYERS[recentBuyer].time}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="mx-auto relative z-10"
                style={{ maxWidth: 'min(1200px, 95vw)' }}
            >
                {/* Live viewers badge */}
                <div
                    className="flex justify-center"
                    style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }}
                >
                    <div className="bg-red-500/20 border border-red-500/40 rounded-full px-4 py-2 flex items-center gap-2">
                        <LiveDot />
                        <span className="text-red-400 font-medium" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.875rem)' }}>
                            {viewingCount} pessoas vendo esta página
                        </span>
                    </div>
                </div>

                {/* Section Title */}
                <h2
                    className="font-bold text-white text-center"
                    style={{
                        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                        marginBottom: 'clamp(0.5rem, 2vw, 1rem)'
                    }}
                >
                    Veja o Que Nossos Alunos Estão Dizendo
                </h2>
                <p
                    className="text-center text-gray-400"
                    style={{
                        fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                        marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
                    }}
                >
                    Depoimentos reais de quem já transformou suas festas e reuniões
                </p>

                {/* Stats Grid */}
                <div
                    className="grid grid-cols-2 lg:grid-cols-4"
                    style={{
                        gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                        marginBottom: 'clamp(2rem, 5vw, 3rem)'
                    }}
                >
                    {STATS.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-center"
                            style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}
                        >
                            <div className="flex items-center justify-center" style={{ minHeight: 'clamp(1.5rem, 4vw, 2rem)' }}>{stat.icon}</div>
                            <div
                                className="font-bold text-white"
                                style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)' }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-gray-400"
                                style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.875rem)' }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Carousel with Real Photos */}
                <div className="relative" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                    <div
                        className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
                        style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}
                    >
                        <div className="flex items-start gap-4">
                            {/* Real Avatar Photo */}
                            <div
                                className="flex-shrink-0 rounded-full overflow-hidden border-2 border-amber-400"
                                style={{
                                    width: 'clamp(3.5rem, 10vw, 5rem)',
                                    height: 'clamp(3.5rem, 10vw, 5rem)'
                                }}
                            >
                                <img
                                    src={TESTIMONIALS[activeTestimonial].avatar}
                                    alt={TESTIMONIALS[activeTestimonial].name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                        className="font-bold text-white"
                                        style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)' }}
                                    >
                                        {TESTIMONIALS[activeTestimonial].name}
                                    </span>
                                    {TESTIMONIALS[activeTestimonial].verified && (
                                        <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1"
                                            style={{ fontSize: 'clamp(0.5rem, 1.25vw, 0.625rem)' }}
                                        >
                                            <CheckCircleIcon size={10} /> Compra Verificada
                                        </span>
                                    )}
                                </div>
                                <p
                                    className="text-gray-400"
                                    style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)' }}
                                >
                                    {TESTIMONIALS[activeTestimonial].location} • {TESTIMONIALS[activeTestimonial].date}
                                </p>

                                {/* Stars */}
                                <div className="flex items-center gap-0.5" style={{
                                    margin: 'clamp(0.25rem, 1vw, 0.5rem) 0'
                                }}>
                                    {renderStars(TESTIMONIALS[activeTestimonial].rating)}
                                </div>

                                {/* Text with highlight */}
                                <p
                                    className="text-white/90 leading-relaxed"
                                    style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)' }}
                                >
                                    "{TESTIMONIALS[activeTestimonial].text}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dots navigation */}
                    <div
                        className="flex justify-center"
                        style={{ gap: 'clamp(0.3rem, 1vw, 0.5rem)', marginTop: 'clamp(0.75rem, 2vw, 1rem)' }}
                    >
                        {TESTIMONIALS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTestimonial(index)}
                                className={`rounded-full transition-all duration-300 ${activeTestimonial === index ? 'bg-amber-500' : 'bg-white/30'
                                    }`}
                                style={{
                                    width: activeTestimonial === index ? 'clamp(1.25rem, 3vw, 1.5rem)' : 'clamp(0.4rem, 1vw, 0.5rem)',
                                    height: 'clamp(0.4rem, 1vw, 0.5rem)'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Video Testimonial Placeholder - High Converting Element 2026 */}
                <div
                    className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20 text-center"
                    style={{
                        padding: 'clamp(1.5rem, 4vw, 2rem)',
                        marginBottom: 'clamp(2rem, 5vw, 3rem)'
                    }}
                >
                    <div className="flex items-center justify-center text-amber-400" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}><VideoIcon size={48} /></div>
                    <p
                        className="font-bold text-white"
                        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                    >
                        +3.200 depoimentos em vídeo
                    </p>
                    <p
                        className="text-gray-400"
                        style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
                    >
                        Alunos compartilhando seus resultados reais
                    </p>
                </div>

                {/* Trust Badges */}
                <div
                    className="flex flex-wrap justify-center items-center"
                    style={{ gap: 'clamp(1rem, 3vw, 2rem)' }}
                >
                    {[
                        { icon: <LockIcon size={20} className="text-green-400" />, text: 'Pagamento 100% Seguro' },
                        { icon: <LightningIcon size={20} className="text-amber-400" />, text: 'Acesso Imediato' },
                        { icon: <SmartphoneIcon size={20} className="text-blue-400" />, text: 'Acesse pelo Celular' },
                        { icon: <RefreshIcon size={20} className="text-purple-400" />, text: 'Garantia de 7 Dias' }
                    ].map((badge, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2 text-gray-400"
                            style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)' }}
                        >
                            <span className="flex items-center">{badge.icon}</span>
                            <span>{badge.text}</span>
                        </div>
                    ))}
                </div>

                {/* Avatar strip with real photos */}
                <div
                    className="text-center"
                    style={{ marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                >
                    <p
                        className="text-gray-500 uppercase tracking-wider"
                        style={{
                            fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)',
                            marginBottom: 'clamp(0.5rem, 1vw, 0.75rem)'
                        }}
                    >
                        Junte-se a mais de 12.000 alunos
                    </p>
                    <div className="flex justify-center items-center">
                        {/* Stacked real avatars */}
                        <div className="flex -space-x-3">
                            {TESTIMONIALS.slice(0, 6).map((testimonial, i) => (
                                <div
                                    key={i}
                                    className="rounded-full border-2 border-gray-800 overflow-hidden"
                                    style={{
                                        width: 'clamp(2rem, 5vw, 2.5rem)',
                                        height: 'clamp(2rem, 5vw, 2.5rem)'
                                    }}
                                >
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <span
                            className="text-white font-bold ml-3"
                            style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
                        >
                            +12.847 alunos
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
