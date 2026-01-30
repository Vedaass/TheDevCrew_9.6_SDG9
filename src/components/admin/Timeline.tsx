"use client";

import React from 'react';
import { TimelineEvent } from '@/lib/mockData';
import { CheckCircle2, Clock, FileText, User } from 'lucide-react';

interface TimelineProps {
    events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
    return (
        <div className="space-y-6 relative ml-4">
            <div className="absolute left-[-29px] top-2 bottom-2 w-0.5 bg-gray-200"></div>

            {events.map((event, index) => (
                <div key={index} className="relative">
                    {/* Icon */}
                    <div className={`absolute -left-10 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10 
                        ${event.action.includes('Submitted') ? 'bg-blue-100 text-blue-600' :
                            event.action.includes('Resolved') ? 'bg-green-100 text-green-600' :
                                'bg-orange-100 text-orange-600'
                        }`}>
                        {event.action.includes('Submitted') ? <FileText size={12} /> :
                            event.action.includes('Resolved') ? <CheckCircle2 size={12} /> :
                                <Clock size={12} />}
                    </div>

                    {/* Content */}
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start">
                            <span className="font-semibold text-gray-800 text-sm">{event.action}</span>
                            <span className="text-xs text-gray-400">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <User size={10} />
                            <span>By: {event.by}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
