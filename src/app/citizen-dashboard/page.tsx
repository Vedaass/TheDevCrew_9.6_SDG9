"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle, AlertTriangle, MapPin, ChevronRight, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground'; // Reuse background or make a static one for performance
import { useLanguage } from '@/contexts/LanguageContext';
import { MockDB } from '@/lib/mockData';

export default function CitizenDashboard() {
    const { t } = useLanguage();

    // Mock Data
    const stats = [
        { label: 'Submitted', value: 12, icon: Upload, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'In Progress', value: 3, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-100' },
        { label: 'Resolved', value: 9, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    ];

    const [recentReports, setRecentReports] = useState<any[]>([]);

    React.useEffect(() => {
        // In real app, filter by userId
        setRecentReports(MockDB.getReports().slice(0, 3));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col relative">
            <ThreeBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 container mx-auto px-4 py-8">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Welcome, Vedant</h1>
                        <p className="text-gray-500">Citizen of India • Nagpur, Maharashtra</p>
                    </div>

                    {/* Hero / Action Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* New Report Card */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-2">Report Infrastructure Issues</h2>
                                <p className="mb-6 opacity-90 max-w-md">Help us build a better nation. Spot a broken road, streetlight, or drainage issue? Report it now using our AI-powered tool.</p>
                                <Link href="/citizen-dashboard/new-report">
                                    <span className="inline-flex items-center gap-2 bg-white text-blue-900 px-5 py-3 rounded-lg font-bold shadow-sm hover:bg-gray-100 transition-colors">
                                        <Plus size={20} />
                                        New Report
                                    </span>
                                </Link>
                            </div>
                            {/* Decorative BG pattern */}
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-8"></div>
                        </motion.div>

                        {/* Profile/Stats Summary */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                                    {/* Placeholder Avatar */}
                                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                        <span className="text-2xl font-bold">V</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-lg">Vedant Malode</div>
                                    <div className="text-sm text-gray-500">Rank: Active Citizen</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${stat.bg} ${stat.color}`}>
                                            <stat.icon size={16} />
                                        </div>
                                        <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                                        <span className="text-[10px] text-gray-500 uppercase">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Reports */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Recent Reports</h2>
                            <Link href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentReports.map((report) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={report.id}
                                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="h-40 bg-gray-200 relative">
                                        {/* Only use images if they are valid URLs, otherwise placeholder */}
                                        <img src={report.image} alt={report.type} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${report.status === 'Resolved' ? 'bg-green-100 text-green-700 border-green-200' :
                                                report.status === 'In Progress' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                    'bg-blue-100 text-blue-700 border-blue-200'
                                                }`}>
                                                {report.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 mb-1">{report.type}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <MapPin size={14} />
                                            {report.location}
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-3">
                                            <span>ID: #{1000 + report.id}</span>
                                            <span>{report.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
