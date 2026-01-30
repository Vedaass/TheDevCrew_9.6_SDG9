"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Timeline from '@/components/admin/Timeline';
import { MockDB, Report } from '@/lib/mockData';
import { ChevronLeft, MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ReportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            const data = MockDB.getReportById(params.id as string);
            setReport(data || null);
            setLoading(false);
        }
    }, [params.id]);

    const handleStatusChange = (newStatus: Report['status']) => {
        if (report) {
            MockDB.updateReport(report.id, { status: newStatus });
            setReport({ ...report, status: newStatus }); // Optimistic update
            // Ideally we'd re-fetch to get the updated timeline
            setTimeout(() => {
                const updated = MockDB.getReportById(report.id);
                if (updated) setReport(updated);
            }, 100);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Report...</div>;
    if (!report) return <div className="p-10 text-center">Report not found.</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                {/* Back Link */}
                <Link href="/admin-dashboard" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                    <ChevronLeft size={20} />
                    Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Evidence */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-2xl font-bold text-gray-900">{report.type}</h1>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${report.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                                report.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {report.priority} Priority
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MapPin size={16} />
                                        {report.location}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm text-gray-400 block">Report ID</span>
                                    <span className="font-mono font-bold text-lg">#{report.id}</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                                <p className="text-gray-600">{report.description}</p>
                            </div>

                            {/* Evidence Image */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Photographic Evidence</h3>
                                <div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-200 text-center">
                                    {report.image ? (
                                        <img src={report.image} alt="Report Evidence" className="w-full max-h-[400px] object-contain" />
                                    ) : (
                                        <div className="py-12 text-gray-400">No Image Evidence Provided</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Audit Timeline */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Clock size={20} />
                                Action Timeline
                            </h3>
                            <Timeline events={report.timeline} />
                        </div>
                    </div>

                    {/* Right Column: Actions & Controls */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Authority Actions</h3>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {['Pending', 'In Progress', 'Resolved'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(status as any)}
                                            className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${report.status === status
                                                    ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <span className="font-medium">{status}</span>
                                            {report.status === status && <CheckCircle size={18} />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Department</label>
                                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option>Select Department...</option>
                                    <option>Public Works Dept (PWD)</option>
                                    <option>Water Supply Board</option>
                                    <option>Electricity Board</option>
                                    <option>Sanitation Dept</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Internal Remarks</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none"
                                    placeholder="Add note for internal team..."
                                ></textarea>
                                <button className="w-full mt-2 bg-gray-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                                    Update Remarks
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
