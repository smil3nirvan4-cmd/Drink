import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
    strokeWidth?: number;
}

// ============================================
// VALIDATION ICONS
// ============================================

export const CheckCircleIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export const XCircleIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const XIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ============================================
// SECURITY & TRUST ICONS
// ============================================

export const LockIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

export const UnlockIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

// ============================================
// PAYMENT ICONS
// ============================================

export const CreditCardIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

export const PixIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.66 6.34a4.52 4.52 0 0 0-3.18 1.32l-2.48 2.48-2.48-2.48a4.5 4.5 0 0 0-6.36 0 4.5 4.5 0 0 0 0 6.36l2.48 2.48-2.48 2.48a4.5 4.5 0 0 0 6.36 6.36l2.48-2.48 2.48 2.48a4.5 4.5 0 0 0 6.36-6.36l-2.48-2.48 2.48-2.48a4.5 4.5 0 0 0-3.18-7.68zm1.32 7.68l-4.98 4.98-4.98-4.98 4.98-4.98 4.98 4.98z" />
    </svg>
);

// ============================================
// ACTION ICONS
// ============================================

export const LightningIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
);

// ============================================
// MEDIA ICONS
// ============================================

export const VideoIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

export const DocumentIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

export const BookIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

// ============================================
// SOCIAL & STATS ICONS
// ============================================

export const UsersIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ size = 24, className = '', filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

export const ThumbsUpIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
);

// ============================================
// BRANDING & PRODUCT ICONS
// ============================================

export const CocktailIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M8 22h8" />
        <path d="M12 11v11" />
        <path d="m19 3-7 8-7-8Z" />
        <path d="M5 3h14" />
    </svg>
);

export const GraduationCapIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
);

export const GiftIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
);

export const SmartphoneIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export const ShoppingCartIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
);

// ============================================
// INGREDIENT ICONS (for MembersArea lessons)
// ============================================

export const IceIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

export const LeafIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);

export const LemonIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M17.697 2.303c2.12 2.12 3.534 9.61-.283 13.428-3.818 3.817-11.31 2.402-13.428.283-2.12-2.12-3.534-9.61.283-13.428 3.818-3.817 11.31-2.402 13.428-.283Z" />
        <path d="m9 15 6-6" />
    </svg>
);

// ============================================
// ANIMATED COMPONENTS
// ============================================

export const LiveDot: React.FC<{ className?: string }> = ({ className = '' }) => (
    <span className={`relative flex h-2 w-2 ${className}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
    </span>
);

export const LoadingSpinner: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`} aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export const ConfettiIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5.8 11.3 2 22l10.7-3.79" />
        <path d="M4 3h.01" />
        <path d="M22 8h.01" />
        <path d="M15 2h.01" />
        <path d="M22 20h.01" />
        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
    </svg>
);

// ============================================
// CONFUSED PERSON ILLUSTRATION (for BeforeAfter)
// ============================================

export const ConfusedPersonIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
        {/* Modern illustration - confused person silhouette */}
        <defs>
            <linearGradient id="confusedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0.1" />
            </linearGradient>
        </defs>
        {/* Background circle */}
        <circle cx="32" cy="32" r="28" fill="url(#confusedGrad)" />
        {/* Person silhouette */}
        <circle cx="32" cy="22" r="10" fill="#6b7280" />
        <path d="M18 52 C18 40 26 34 32 34 C38 34 46 40 46 52" fill="#6b7280" />
        {/* Question marks */}
        <circle cx="14" cy="18" r="6" fill="#ef4444" opacity="0.2" />
        <text x="11" y="22" fill="#ef4444" fontSize="12" fontWeight="bold">?</text>
        <circle cx="52" cy="14" r="5" fill="#ef4444" opacity="0.2" />
        <text x="49.5" y="18" fill="#ef4444" fontSize="10" fontWeight="bold">?</text>
        {/* X marks */}
        <path d="M8 52 L14 58 M14 52 L8 58" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// ============================================
// HAPPY BARTENDER ILLUSTRATION (for BeforeAfter)
// ============================================

export const HappyBartenderIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
        {/* Modern illustration - bartender with cocktail */}
        <defs>
            <linearGradient id="happyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
        </defs>
        {/* Background circle */}
        <circle cx="32" cy="32" r="28" fill="url(#happyGrad)" />
        {/* Person silhouette */}
        <circle cx="32" cy="22" r="10" fill="#10b981" />
        <path d="M18 52 C18 40 26 34 32 34 C38 34 46 40 46 52" fill="#10b981" />
        {/* Cocktail glass */}
        <path d="M45 26 L52 16 L58 26 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <path d="M51.5 26 L51.5 36" stroke="#fbbf24" strokeWidth="2" />
        <path d="M48 36 L55 36" stroke="#fbbf24" strokeWidth="2" />
        {/* Stars */}
        <circle cx="12" cy="16" r="3" fill="#fbbf24" />
        <circle cx="54" cy="8" r="2" fill="#fbbf24" />
        <circle cx="8" cy="44" r="2" fill="#fbbf24" />
        {/* Check mark */}
        <path d="M50 50 L54 54 L60 46" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ============================================
// ADDITIONAL ICONS FOR COMPLETE COVERAGE
// ============================================

export const DownloadIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

export const AlertIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

export const InfinityIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
);

export const MessageIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

export const VolumeIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
);

export const FireIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.12 1.63-6.02 4.13-7.67.35-.23.81-.13 1.03.22.22.35.13.81-.22 1.03C5.58 9.06 4 11.41 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-2.59-1.58-4.94-3.94-6.42a.75.75 0 0 1 .81-1.25C19.37 7.98 21 10.88 21 14c0 4.97-4.03 9-9 9z" />
        <path d="M12 18c-2.21 0-4-1.79-4-4 0-1.57 1-3.06 2-4 .5-.47 1.5-1 2-1s1.5.53 2 1c1 .94 2 2.43 2 4 0 2.21-1.79 4-4 4z" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const EmailIcon: React.FC<IconProps> = ({ size = 24, className = '', strokeWidth = 2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

// Chef illustration for InstructorBio
export const ChefIcon: React.FC<IconProps> = ({ size = 64, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
        {/* Chef hat */}
        <ellipse cx="32" cy="14" rx="14" ry="8" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="2" />
        <rect x="20" y="12" width="24" height="14" fill="#f5f5f5" />
        <path d="M20 26 Q32 30 44 26" stroke="#d4d4d4" strokeWidth="2" fill="none" />
        {/* Face */}
        <circle cx="32" cy="36" r="12" fill="#fbbf24" opacity="0.3" stroke="#92400e" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="28" cy="34" r="1.5" fill="#1f2937" />
        <circle cx="36" cy="34" r="1.5" fill="#1f2937" />
        {/* Smile */}
        <path d="M28 40 Q32 44 36 40" stroke="#1f2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Mustache */}
        <path d="M26 38 Q32 36 38 38" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Body/apron suggestion */}
        <path d="M22 48 L42 48 L44 62 L20 62 Z" fill="#f5f5f5" stroke="#d4d4d4" strokeWidth="2" />
        <line x1="32" y1="48" x2="32" y2="62" stroke="#d4d4d4" strokeWidth="1" />
    </svg>
);

