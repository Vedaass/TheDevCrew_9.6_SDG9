"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, Globe, X, Shield, Phone, Home, FileText, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "mr" : "en");
    };

    const navLinks = [
        { name: t("home"), href: "/", icon: Home },
        { name: t("services"), href: "/services", icon: FileText },
        { name: t("police"), href: "/police", icon: Shield },
        { name: t("admin"), href: "/admin", icon: Settings },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "shadow-lg backdrop-blur-md bg-white/90"
                        : "bg-transparent"
                    }`}
            >
                {/* Top Strip - The "Tricolor" Effect */}
                <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-white to-green-700" />

                <div className={`transition-all duration-300 ${scrolled ? "bg-white/50" : "bg-gradient-to-r from-orange-600/95 via-orange-500/95 to-orange-600/95 backdrop-blur-sm"} `}>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-3">
                            {/* Logo Area */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 shadow-md overflow-hidden group-hover:rotate-12 transition-transform duration-500 border-2 border-orange-200">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Seal_of_Maharashtra.png/240px-Seal_of_Maharashtra.png"
                                        alt="Emblem"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className={`flex flex-col ${scrolled ? "text-gray-800" : "text-white"}`}>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-90">
                                        {t("govt_maharashtra")}
                                    </span>
                                    <span className="text-xl font-extrabold leading-none tracking-tight drop-shadow-sm">
                                        {t("app.title")}
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-6">
                                <div className="flex items-center bg-white/10 rounded-full px-2 py-1 backdrop-blur-md border border-white/20">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2
                        ${scrolled
                                                    ? "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                                                    : "text-white hover:bg-white/20"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <button
                                    onClick={toggleLanguage}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-bold border shadow-sm active:scale-95
                    ${scrolled
                                            ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
                                            : "bg-white text-orange-600 border-white hover:bg-gray-100"}`}
                                >
                                    <Globe className="w-4 h-4" />
                                    <span>{language === "en" ? "मराठी" : "English"}</span>
                                </button>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <div className="flex lg:hidden items-center gap-3">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className={`p-2 rounded-lg transition ${scrolled ? "text-gray-800" : "text-white"}`}
                                >
                                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-white z-40 lg:hidden pt-24 px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 text-xl font-bold text-gray-800 p-4 rounded-xl hover:bg-orange-50 transition border-b border-gray-100"
                                    >
                                        <link.icon className="w-6 h-6 text-orange-500" />
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                                <span className="font-bold text-gray-600">Language</span>
                                <button
                                    onClick={toggleLanguage}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md"
                                >
                                    Switch to {language === "en" ? "Marathi" : "English"}
                                </button>
                            </div>

                            <div className="mt-8 bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200 shadow-inner">
                                <h3 className="text-red-800 font-bold mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5" /> Emergency Speed Dial
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <a href="tel:100" className="bg-white text-gray-800 py-3 rounded-lg text-center font-bold border border-gray-200 shadow-sm">
                                        Police (100)
                                    </a>
                                    <a href="tel:108" className="bg-red-600 text-white py-3 rounded-lg text-center font-bold shadow-md">
                                        Ambulance (108)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for fixed navbar */}
            <div className="h-24" />
        </>
    );
}
