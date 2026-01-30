"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Clock, AlertTriangle, Search, Filter, Eye, MoreVertical } from 'lucide-react';
import { MockDB } from '@/lib/mockData';

export default function AdminDashboard() {
    const { t } = useLanguage();

    // Mock Admin Data
    const [reports, setReports] = useState<any[]>([]);

    React.useEffect(() => {
        setReports(MockDB.getReports());
    }, []);

    const updateStatus = (id: number, newStatus: string) => {
        MockDB.updateStatus(id, newStatus as any);
        setReports(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500">Ministry of Infrastructure Control Center</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300">
                            <Filter size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{t('admin.total')}</p>
                            <p className="text-2xl font-bold text-gray-800">1,248</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <AlertTriangle size={20} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{t('admin.pending')}</p>
                            <p className="text-2xl font-bold text-orange-600">42</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">In Progress</p>
                            <p className="text-2xl font-bold text-blue-600">156</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Clock size={20} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{t('admin.resolved')}</p>
                            <p className="text-2xl font-bold text-green-600">1,050</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <CheckCircle size={20} />
                        </div>
                    </div>
                </div>

                {/* Complaints Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <h2 className="font-bold text-gray-800">Complaint Management</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search ID, Location..."
                                className="pl-9 pr-4 py-2 text-sm border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none w-64"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600 font-medium border-b">
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Issue Type</th>
                                    <th className="p-4">Severity</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">{t('admin.status')}</th>
                                    <th className="p-4 text-right">{t('admin.action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">#{report.id}</td>
                                        <td className="p-4">
                                            <img src={report.image} alt="Evidence" className="w-12 h-12 rounded object-cover border" />
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-800">{report.type}</div>
                                            <div className="text-xs text-gray-500">{report.citizen}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${report.severity === 'High' ? 'bg-red-100 text-red-700' :
                                                report.severity === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {report.severity}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-600 max-w-[150px] truncate">{report.location}</td>
                                        <td className="p-4 text-gray-600">{report.date}</td>
                                        <td className="p-4">
                                            <select
                                                value={report.status}
                                                onChange={(e) => updateStatus(report.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold border cursor-pointer outline-none ${report.status === 'Resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    report.status === 'In Progress' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'
                                                    }`}
                                            >
                                                <option value="Submitted">Submitted</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-gray-400 hover:text-blue-600 p-1">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t bg-gray-50 text-xs text-gray-500 text-center">
                        Showing {reports.length} latest reports
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
