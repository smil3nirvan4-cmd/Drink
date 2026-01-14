import React from 'react';
import { CocktailIcon } from './icons';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="relative py-12 border-t border-white/10"
            role="contentinfo"
        >
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                <CocktailIcon size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-neutral-100">LP Drink</span>
                        </div>
                        <p className="text-neutral-400 text-sm max-w-xs">
                            Transformando iniciantes em mestres da coquetelaria desde 2020.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <nav aria-label="Links rápidos">
                        <h4 className="text-sm font-semibold text-neutral-200 mb-4 uppercase tracking-wider">
                            Links Rápidos
                        </h4>
                        <ul className="space-y-2">
                            {[
                                { label: 'Início', href: '#hero' },
                                { label: 'Benefícios', href: '#benefits' },
                                { label: 'Preço', href: '#pricing' },
                                { label: 'Contato', href: '/contato' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Legal */}
                    <nav aria-label="Links legais">
                        <h4 className="text-sm font-semibold text-neutral-200 mb-4 uppercase tracking-wider">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            {[
                                { label: 'Termos de Uso', href: '/termos' },
                                { label: 'Política de Privacidade', href: '/privacidade' },
                                { label: 'Política de Reembolso', href: '/reembolso' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-neutral-400 hover:text-amber-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-neutral-500 text-sm text-center md:text-left">
                            © {currentYear} LP Drink. Todos os direitos reservados.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {[
                                {
                                    label: 'Instagram',
                                    href: 'https://instagram.com/lpdrink',
                                    icon: (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    )
                                },
                                {
                                    label: 'YouTube',
                                    href: 'https://youtube.com/lpdrink',
                                    icon: (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    )
                                },
                                {
                                    label: 'TikTok',
                                    href: 'https://tiktok.com/@lpdrink',
                                    icon: (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                        </svg>
                                    )
                                },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-neutral-800/50 flex items-center justify-center text-neutral-400 hover:bg-amber-500/20 hover:text-amber-400 transition-all duration-300"
                                    aria-label={`Siga-nos no ${social.label}`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-xl bg-neutral-900/50 border border-white/5">
                    <p className="text-xs text-neutral-500 text-center leading-relaxed">
                        Este produto é comercializado com apoio da Hotmart. A plataforma não faz controle editorial
                        prévio dos produtos comercializados, tão pouco avalia a tecnicidade e experiência daqueles
                        que os produzem. A existência de um produto e sua aquisição, através da plataforma, não podem
                        ser consideradas como garantia de qualidade de conteúdo e resultado, em qualquer hipótese.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
