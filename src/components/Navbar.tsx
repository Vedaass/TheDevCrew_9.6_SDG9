"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        // Clear Supabase auth here (mock for now)
        router.push('/login');
    };

    const isAuthPage = pathname === '/login' || pathname === '/';

    return (
        <nav className="sticky top-0 z-40 w-full bg-white border-b shadow-sm" style={{ borderColor: 'var(--border)' }}>
            {/* Government Top Bar */}
            <div className="w-full py-1 px-4 text-xs font-medium text-white flex justify-between items-center" style={{ background: 'var(--gov-blue)' }}>
                <span>Government of India</span>
                <span>Ministry of Infrastructure</span>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3">
                    {/* Placeholder for Emblem - In real app use Image */}
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold border border-gray-300">
                        GOI
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight" style={{ color: 'var(--gov-blue)' }}>{t('app.title')}</span>
                        <span className="text-xs text-gray-500 hidden sm:block">{t('app.subtitle')}</span>
                    </div>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Selector */}
                    <div className="flex items-center gap-2 text-sm">
                        <Globe size={16} className="text-gray-500" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            className="bg-transparent border-none outline-none cursor-pointer font-medium text-gray-700"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="mr">मराठी</option>
                        </select>
                    </div>

                    {!isAuthPage && (
                        <>
                            <div className="w-px h-6 bg-gray-300 mx-1"></div>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                <LogOut size={16} />
                                <span className="hidden sm:inline">{t('dash.logout')}</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
