"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, LogOut, User, Shield, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        toast.info("Dhanyawaad! See you soon.", {
            style: { background: '#f5f5f5', color: '#1f2937', border: '1px solid #e5e7eb' },
            icon: '🙏'
        });
        setTimeout(() => {
            router.push('/login');
        }, 800);
    };

    const isAuthPage = pathname === '/login' || pathname === '/';

    return (
        <nav className="sticky top-0 z-40 w-full shadow-md border-b border-gray-200">
            {/* Tricolor Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-white to-green-100 opacity-90"></div>

            {/* Decorative Top/Bottom Lines */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF9933]"></div> {/* Saffron */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#138808]"></div> {/* Green */}

            <div className="relative container mx-auto px-4 h-20 flex items-center justify-between">

                {/* Left: InfraGuard Logo */}
                {/* Left: InfraGuard Logo */}
                <Link href="/" className="flex items-center gap-3 min-w-fit group">
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-green-600 rounded-xl rotate-3 group-hover:rotate-6 transition-transform shadow-lg opacity-90"></div>
                        <div className="absolute inset-0 bg-white rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform shadow-sm border border-orange-100 flex items-center justify-center z-10">
                            <Shield className="text-blue-900 fill-blue-50" size={28} strokeWidth={2} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-bold text-blue-900 text-[10px] mt-1">IG</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black tracking-tight text-blue-900 leading-none">
                            Infra<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">Guard</span>
                        </h1>
                        <span className="text-[10px] font-bold text-green-700 tracking-widest uppercase ml-0.5">Civil Vigilance</span>
                    </div>
                </Link>

                {/* Center-Right: Government Text (Hidden on small mobile) -> REMOVED */}

                {/* Right: Actions */}
                <div className="flex items-center gap-4 bg-white/50 px-3 py-1 rounded-full border border-gray-200 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-sm">
                        <Globe size={16} className="text-blue-700" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            className="bg-transparent border-none outline-none cursor-pointer font-medium text-gray-800 text-xs"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="mr">मराठी</option>
                        </select>
                    </div>

                    {!isAuthPage && (
                        <>
                            <div className="w-px h-4 bg-gray-400 mx-1"></div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide"
                            >
                                <LogOut size={14} />
                                <span className="hidden sm:inline">{t('dash.logout')}</span>
                            </motion.button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
