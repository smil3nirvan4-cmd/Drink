import React, { useState, useEffect, createContext, useContext } from 'react';
import { CocktailIcon, VideoIcon, DocumentIcon, IceIcon, LeafIcon, LemonIcon, BookIcon, GiftIcon, TrophyIcon, CheckIcon, PlayIcon, DownloadIcon, UnlockIcon, LoadingSpinner } from './icons';

// ============================================
// TYPES
// ============================================
interface User {
    id: string;
    name: string;
    email: string;
    hasPremiumAccess: boolean;
    purchases: string[];
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'pdf';
    duration?: string;
    videoUrl?: string;
    pdfUrl?: string;
    thumbnail: React.ReactNode;
    isLocked: boolean;
    module: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

// ============================================
// AUTH CONTEXT
// ============================================
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('lp_drink_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('lp_drink_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        // Mock API call - Replace with real Hotmart API
        await new Promise(r => setTimeout(r, 1000));

        // Mock validation
        if (email && password.length >= 4) {
            const mockUser: User = {
                id: 'user_' + Date.now(),
                name: email.split('@')[0],
                email,
                hasPremiumAccess: true,
                purchases: ['curso-drinks', 'ebook-harmonizacoes'],
            };
            setUser(mockUser);
            localStorage.setItem('lp_drink_user', JSON.stringify(mockUser));
            setLoading(false);
            return true;
        }
        setLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('lp_drink_user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// ============================================
// MOCK LESSONS DATA
// ============================================
const LESSONS: Lesson[] = [
    // Módulo 1 - Fundamentos
    { id: 'l1', title: 'Introdução à Coquetelaria', description: 'Bem-vindo ao curso!', type: 'video', duration: '10:30', module: 'Módulo 1: Fundamentos', thumbnail: <VideoIcon size={24} className="text-amber-400" />, isLocked: false },
    { id: 'l2', title: 'Utensílios Essenciais', description: 'Tudo que você precisa ter', type: 'video', duration: '15:00', module: 'Módulo 1: Fundamentos', thumbnail: <CocktailIcon size={24} className="text-amber-400" />, isLocked: false },
    { id: 'l3', title: 'Guia de Utensílios (PDF)', description: 'Lista completa para download', type: 'pdf', module: 'Módulo 1: Fundamentos', thumbnail: <DocumentIcon size={24} className="text-blue-400" />, isLocked: false },
    // Módulo 2 - Técnicas
    { id: 'l4', title: 'Técnicas de Preparo', description: 'Shake, stir, build e mais', type: 'video', duration: '20:00', module: 'Módulo 2: Técnicas', thumbnail: <IceIcon size={24} className="text-cyan-400" />, isLocked: false },
    { id: 'l5', title: 'Decoração Profissional', description: 'Impressione visualmente', type: 'video', duration: '12:00', module: 'Módulo 2: Técnicas', thumbnail: <LemonIcon size={24} className="text-yellow-400" />, isLocked: false },
    // Módulo 3 - Receitas Clássicas
    { id: 'l6', title: 'Caipirinha Perfeita', description: 'O drink brasileiro por excelência', type: 'video', duration: '08:00', module: 'Módulo 3: Receitas Clássicas', thumbnail: <LemonIcon size={24} className="text-green-400" />, isLocked: false },
    { id: 'l7', title: 'Mojito Cubano', description: 'Refrescante e aromático', type: 'video', duration: '09:30', module: 'Módulo 3: Receitas Clássicas', thumbnail: <LeafIcon size={24} className="text-green-500" />, isLocked: false },
    { id: 'l8', title: 'Margarita', description: 'O clássico mexicano', type: 'video', duration: '11:00', module: 'Módulo 3: Receitas Clássicas', thumbnail: <CocktailIcon size={24} className="text-amber-400" />, isLocked: false },
    { id: 'l9', title: 'Livro de Receitas (PDF)', description: '100 receitas exclusivas', type: 'pdf', module: 'Módulo 3: Receitas Clássicas', thumbnail: <BookIcon size={24} className="text-purple-400" />, isLocked: false },
    // Módulo Bônus
    { id: 'l10', title: 'Harmonização com Petiscos', description: 'Ebook exclusivo', type: 'pdf', module: 'Bônus', thumbnail: <GiftIcon size={24} className="text-pink-400" />, isLocked: false },
];

// ============================================
// LOGIN COMPONENT
// ============================================
const LoginForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }

        const success = await login(email, password);
        if (success) {
            onSuccess();
        } else {
            setError('E-mail ou senha inválidos');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-purple-900 px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                        <CocktailIcon size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Área de Membros</h1>
                    <p className="text-neutral-400 mt-2">Acesse seu curso de drinks</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                placeholder="seu@email.com"
                                aria-label="E-mail"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                placeholder="••••••••"
                                aria-label="Senha"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-gray-500 disabled:to-gray-600 text-neutral-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? <><LoadingSpinner size={16} /> Entrando...</> : <><UnlockIcon size={16} /> Entrar</>}
                    </button>

                    <p className="mt-4 text-center text-sm text-neutral-500">
                        Ainda não tem acesso?{' '}
                        <a href="/" className="text-amber-400 hover:underline">Compre o curso</a>
                    </p>
                </form>

                {/* Demo credentials */}
                <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <p className="text-xs text-neutral-400 text-center">
                        Demo: Use qualquer email e senha com 4+ caracteres
                    </p>
                </div>
            </div>
        </div>
    );
};

// ============================================
// DASHBOARD COMPONENT - Accordion Layout
// ============================================
const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);
    const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
        const stored = localStorage.getItem('lp_drink_completed');
        return stored ? JSON.parse(stored) : [];
    });

    // Group lessons by module
    const modules = LESSONS.reduce((acc, lesson) => {
        if (!acc[lesson.module]) acc[lesson.module] = [];
        acc[lesson.module].push(lesson);
        return acc;
    }, {} as Record<string, Lesson[]>);

    // Toggle module expansion
    const toggleModule = (moduleName: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleName)
                ? prev.filter(m => m !== moduleName)
                : [...prev, moduleName]
        );
    };

    // Handle lesson click - expand and show inline
    const handleLessonClick = (lesson: Lesson) => {
        if (activeLesson?.id === lesson.id) {
            setActiveLesson(null); // Close if clicking same lesson
        } else {
            setActiveLesson(lesson);
        }
    };

    // Mark lesson as completed
    const markCompleted = (id: string) => {
        const updated = [...completedLessons, id];
        setCompletedLessons(updated);
        localStorage.setItem('lp_drink_completed', JSON.stringify(updated));
    };

    // Calculate progress
    const progress = Math.round((completedLessons.length / LESSONS.length) * 100);

    // Download certificate (mock)
    const downloadCertificate = () => {
        if (progress < 100) {
            alert('Complete todas as aulas para gerar seu certificado!');
            return;
        }
        alert(`Certificado gerado para ${user?.name}! (Mock - integrar com API)`);
    };

    // Inline Video/PDF Player Component
    const InlinePlayer: React.FC<{ lesson: Lesson }> = ({ lesson }) => (
        <div className="bg-neutral-900/80 border-t border-b border-amber-500/30 animate-fade-in-up">
            {/* Video/PDF Player */}
            <div className="aspect-video bg-neutral-950 flex items-center justify-center relative">
                {lesson.type === 'video' ? (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse-glow">
                            <span className="text-3xl ml-1">▶</span>
                        </div>
                        <p className="text-white font-medium text-lg">{lesson.title}</p>
                        <p className="text-neutral-500 text-sm mt-1">Duração: {lesson.duration}</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/30 flex items-center justify-center">
                            <DocumentIcon size={32} className="text-blue-400" />
                        </div>
                        <p className="text-white font-medium text-lg">{lesson.title}</p>
                        <button className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm flex items-center gap-1">
                            <DownloadIcon size={14} /> Baixar PDF
                        </button>
                    </div>
                )}
            </div>

            {/* Lesson Controls */}
            <div className="p-4 bg-neutral-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <p className="text-white font-medium">{lesson.title}</p>
                    <p className="text-neutral-500 text-sm">{lesson.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    {!completedLessons.includes(lesson.id) ? (
                        <button
                            onClick={(e) => { e.stopPropagation(); markCompleted(lesson.id); }}
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
                        >
                            <CheckIcon size={14} /> Concluir
                        </button>
                    ) : (
                        <span className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg flex items-center gap-1">
                            <CheckIcon size={14} /> Concluída
                        </span>
                    )}
                    <button
                        onClick={() => setActiveLesson(null)}
                        className="px-3 py-2 bg-neutral-700 hover:bg-neutral-600 text-white text-sm rounded-lg transition-colors"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-purple-900">
            {/* Header */}
            <header className="bg-neutral-900/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <CocktailIcon size={24} className="text-amber-500" />
                        </div>
                        <span className="font-bold text-white">LP Drink</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-400 hidden sm:block">
                            Olá, <span className="text-amber-400">{user?.name}</span>
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Progress Card */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-white">Seu Progresso</h2>
                            <p className="text-neutral-400 text-sm mt-1">
                                {completedLessons.length} de {LESSONS.length} aulas concluídas
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 sm:w-48 h-3 bg-neutral-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="text-lg font-bold text-amber-400">{progress}%</span>
                        </div>
                    </div>

                    {progress >= 100 && (
                        <button
                            onClick={downloadCertificate}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg flex items-center gap-2 hover:from-green-400 hover:to-green-500 transition-all"
                        >
                            <TrophyIcon size={20} /> Baixar Certificado
                        </button>
                    )}
                </div>

                {/* Accordion Modules */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Conteúdo do Curso</h3>

                    {Object.entries(modules).map(([moduleName, lessons]) => {
                        const isExpanded = expandedModules.includes(moduleName);
                        const moduleCompleted = lessons.every(l => completedLessons.includes(l.id));
                        const moduleLessonsCompleted = lessons.filter(l => completedLessons.includes(l.id)).length;

                        return (
                            <div
                                key={moduleName}
                                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
                            >
                                {/* Module Header - Clickable */}
                                <button
                                    onClick={() => toggleModule(moduleName)}
                                    className="w-full p-4 bg-neutral-800/50 flex items-center justify-between hover:bg-neutral-800/70 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xl transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                                            ▶
                                        </span>
                                        <div className="text-left">
                                            <h4 className="font-semibold text-white">{moduleName}</h4>
                                            <p className="text-xs text-neutral-500">
                                                {moduleLessonsCompleted}/{lessons.length} aulas concluídas
                                            </p>
                                        </div>
                                    </div>
                                    {moduleCompleted && (
                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                                            <CheckIcon size={12} /> Completo
                                        </span>
                                    )}
                                </button>

                                {/* Module Lessons - Expandable */}
                                {isExpanded && (
                                    <div className="divide-y divide-white/5">
                                        {lessons.map(lesson => (
                                            <div key={lesson.id}>
                                                {/* Lesson Row */}
                                                <button
                                                    onClick={() => handleLessonClick(lesson)}
                                                    className={`w-full p-4 flex items-center gap-3 text-left hover:bg-white/5 transition-colors ${activeLesson?.id === lesson.id
                                                        ? 'bg-amber-500/20 border-l-4 border-amber-500'
                                                        : ''
                                                        }`}
                                                >
                                                    <span className="text-2xl">{lesson.thumbnail}</span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-medium ${completedLessons.includes(lesson.id)
                                                            ? 'text-green-400'
                                                            : 'text-white'
                                                            }`}>
                                                            {completedLessons.includes(lesson.id) && '✓ '}
                                                            {lesson.title}
                                                        </p>
                                                        <p className="text-xs text-neutral-500">
                                                            {lesson.description}
                                                            {lesson.duration && ` • ${lesson.duration}`}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-400 flex items-center gap-1">
                                                            {lesson.type === 'video' ? <><PlayIcon size={12} /> Vídeo</> : <><DocumentIcon size={12} /> PDF</>}
                                                        </span>
                                                        <span className={`transition-transform duration-300 ${activeLesson?.id === lesson.id ? 'rotate-180' : ''
                                                            }`}>
                                                            ▼
                                                        </span>
                                                    </div>
                                                </button>

                                                {/* Inline Player - Shows below the clicked lesson */}
                                                {activeLesson?.id === lesson.id && (
                                                    <InlinePlayer lesson={lesson} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Upsell Card */}
                {!user?.purchases.includes('ebook-harmonizacoes') && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-2xl border border-amber-500/30">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <GiftIcon size={32} className="text-amber-400" />
                            <div className="flex-1 text-center sm:text-left">
                                <h4 className="font-bold text-white">Quer mais receitas?</h4>
                                <p className="text-sm text-neutral-300">
                                    Adquira o E-book Premium com +100 harmonizações por apenas R$5
                                </p>
                            </div>
                            <a
                                href="/checkout?upsell=ebook"
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg transition-colors whitespace-nowrap"
                            >
                                Comprar
                            </a>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

// ============================================
// MAIN MEMBERS AREA COMPONENT
// ============================================
const MembersArea: React.FC = () => {
    const { isAuthenticated, loading } = useAuth();
    const [showDashboard, setShowDashboard] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setShowDashboard(true);
        }
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-950">
                <div className="text-center">
                    <CocktailIcon size={32} className="text-amber-500 animate-bounce" />
                    <p className="text-neutral-400 mt-4">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !showDashboard) {
        return <LoginForm onSuccess={() => setShowDashboard(true)} />;
    }

    return <Dashboard />;
};

export default MembersArea;
