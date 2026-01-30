"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Report } from '@/lib/mockData';

interface ReportTableProps {
    reports: Report[];
}

export default function ReportTable({ reports }: ReportTableProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredReports = reports.filter(r => {
        const matchesSearch =
            r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Controls */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID, Type, Location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative">
                        <Filter className="absolute left-3 top-2.5 text-gray-500" size={16} />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-8 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Review">In Review</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold border-b">Report ID</th>
                            <th className="p-4 font-semibold border-b">Issue Type</th>
                            <th className="p-4 font-semibold border-b">SDG</th>
                            <th className="p-4 font-semibold border-b">Location</th>
                            <th className="p-4 font-semibold border-b">Date</th>
                            <th className="p-4 font-semibold border-b">Priority</th>
                            <th className="p-4 font-semibold border-b">Status</th>
                            <th className="p-4 font-semibold border-b text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                        {filteredReports.map((report) => (
                            <tr key={report.id} className="hover:bg-blue-50 transition-colors group">
                                <td className="p-4 font-mono font-medium text-gray-500">#{report.id}</td>
                                <td className="p-4 font-medium text-gray-800">{report.type}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${report.sdg === 6 ? 'bg-cyan-500' : 'bg-orange-500'}`}>
                                        {report.sdg}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600">{report.location}</td>
                                <td className="p-4 text-gray-500">{report.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${report.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                            report.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                                report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                        }`}>
                                        {report.priority}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${report.status === 'Resolved' ? 'bg-green-50 text-green-600 border-green-200' :
                                            report.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                                                report.status === 'In Review' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                                    'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => router.push(`/admin-dashboard/reports/${report.id}`)}
                                        className="bg-white border border-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-gray-700 px-3 py-1.5 rounded-md text-xs font-medium transition-all shadow-sm flex items-center gap-1 mx-auto"
                                    >
                                        <Eye size={14} /> Open
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Mockup */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-xs text-gray-500">
                <span>Showing {filteredReports.length} reports</span>
                <div className="flex gap-2">
                    <button disabled className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"><ChevronLeft size={16} /></button>
                    <button className="p-1 rounded hover:bg-gray-200"><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
}
