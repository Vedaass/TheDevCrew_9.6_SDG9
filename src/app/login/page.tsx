"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Mail, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ThreeBackground from '@/components/ThreeBackground';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [role, setRole] = useState<'citizen' | 'admin'>('citizen');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            if (role === 'citizen') {
                toast.success("Namaste! Welcome to InfraGuard.", {
                    style: { background: '#138808', color: 'white', border: 'none' }
                });
                router.push('/citizen-dashboard');
            } else {
                toast.success("Namaste Admin! Accessing Secure Portal.", {
                    style: { background: '#FF9933', color: 'white', border: 'none' }
                });
                router.push('/admin-dashboard');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
            <ThreeBackground />
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 text-center text-white" style={{ background: 'var(--gov-blue)' }}>
                        <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                            <Shield className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">{t('login.title')}</h2>
                        <p className="text-sm opacity-80">Access the National Infrastructure Portal</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Role Selector */}
                            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setRole('citizen')}
                                    className={`flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${role === 'citizen' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <User size={16} />
                                    {t('role.citizen')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${role === 'admin' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Shield size={16} />
                                    {t('role.admin')}
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('login.email')}</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('login.password')}</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-800 hover:to-blue-950 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    t('login.submit')
                                )}
                            </motion.button>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-4 border-t text-center">
                        <p className="text-xs text-gray-500">
                            By logging in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
