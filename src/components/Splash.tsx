"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Splash() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/login');
        }, 3000); // 3 seconds splash

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden">
            {/* Tricolor Waves Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 w-full h-1/3 bg-orange-500 blur-3xl animate-pulse" style={{ backgroundColor: 'var(--tricolor-saffron)' }}></div>
                <div className="absolute middle-0 w-full h-1/3 top-1/3 bg-white blur-3xl"></div>
                <div className="absolute bottom-0 w-full h-1/3 bg-green-600 blur-3xl animate-pulse" style={{ backgroundColor: 'var(--tricolor-green)' }}></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Ashoka Chakra Loader */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="mb-8"
                >
                    <Loader2 size={64} style={{ color: 'var(--tricolor-chakra)' }} />
                </motion.div>

                {/* Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl md:text-5xl font-bold text-center mb-2"
                    style={{ color: 'var(--gov-blue)' }}
                >
                    InfraGuard
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-lg text-center font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    Building a Better India
                </motion.p>
            </div>
        </div>
    );
}
