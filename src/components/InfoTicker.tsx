"use client";

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NEWS_ITEMS = [
    "Heavy rainfall expected in coastal regions - please drive safely.",
    "New 6-lane expressway inaugurated between Nagpur and Mumbai.",
    "Urban Ministry announces 'Smart City' awards for 2025.",
    "Report potholes and win 'Active Citizen' points.",
    "Maintenance work scheduled for Main St. Bridge on Sunday."
];

export default function InfoTicker() {
    const [time, setTime] = useState<Date | null>(null);
    const [newsIndex, setNewsIndex] = useState(0);

    // Clock
    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // News Rotator
    useEffect(() => {
        const timer = setInterval(() => {
            setNewsIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null; // Hydration mismatch prevention

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);
    };

    return (
        <div className="w-full bg-white text-gray-800 text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center border-b-4 border-orange-500 shadow-md relative z-30">
            {/* Left: Real-time Clock */}
            <div className="font-mono text-orange-600 font-bold tracking-wider mb-1 md:mb-0">
                {formatDate(time)}
            </div>

            {/* Right: Latest News */}
            <div className="flex items-center gap-2 max-w-md w-full md:w-auto overflow-hidden">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse whitespace-nowrap">
                    LATEST NEWS
                </span>
                <div className="flex-1 truncate text-gray-600 relative h-4">
                    <span className="key={newsIndex} animate-fade-in-up inline-block">
                        {NEWS_ITEMS[newsIndex]}
                    </span>
                </div>
            </div>
        </div>
    );
}
