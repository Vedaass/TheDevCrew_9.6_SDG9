"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
    "Building a New India, One Brick at a Time.",
    "Infrastructure is the backbone of a Nation's progress.",
    "Satyameva Jayate - Truth alone triumphs.",
    "Together we build, together we grow.",
    "Smart Cities for a Smarter Future."
];

export default function Footer() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % QUOTES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="bg-gray-900 text-white/80 py-4 mt-auto border-t border-gray-800 relative overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">

                {/* Left: Copy & Branding */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <span className="font-bold text-white tracking-wide">InfraGuard</span>
                    <span className="hidden md:inline text-gray-600">|</span>
                    <span>© 2026 Government of India</span>
                </div>

                {/* Center: Animating Quotes */}
                <div className="h-6 overflow-hidden relative min-w-[200px] text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-orange-400 font-medium italic"
                        >
                            "{QUOTES[index]}"
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right: Quick Links */}
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
            </div>

            {/* Subtle Decoration */}
            <div className="absolute bottom-0 w-full h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-500 opacity-30"></div>
        </footer>
    );
}
