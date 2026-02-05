"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Users, AlertTriangle, Building, Megaphone, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("reports");

    const [reports, setReports] = useState([
        { id: "CITY-5520", type: "Pothole", location: "Civil Lines, Near SBI", date: "2024-10-24", status: "Pending" },
        { id: "CITY-5519", type: "Garbage", location: "Bus Stand Area", date: "2024-10-23", status: "Resolved" },
        { id: "CITY-5518", type: "Street Light", location: "Wadgaon Road", date: "2024-10-22", status: "In Progress" },
    ]);

    const handleStatusChange = (id: string, newStatus: string) => {
        setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-800 p-2 rounded-lg">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{t("admin")} Dashboard</h1>
                        <p className="text-gray-600 text-sm">Welcome, District Administrator</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Last Login: Just now</p>
                    <p className="text-xs font-bold text-green-600">Secure Connection</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Sidebar Navigation */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab("reports")}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === "reports" ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <AlertTriangle className="w-5 h-5" /> Citizen Reports
                            {reports.filter(r => r.status === "Pending").length > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">{reports.filter(r => r.status === "Pending").length}</span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("hospitals")}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === "hospitals" ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <Building className="w-5 h-5" /> Manage Hospitals
                        </button>
                        <button
                            onClick={() => setActiveTab("alerts")}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === "alerts" ? "bg-blue-50 text-blue-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <Megaphone className="w-5 h-5" /> Public Alerts
                        </button>
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-3">

                    {activeTab === "reports" && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <h2 className="font-bold text-gray-800">Recent Citizen Reports</h2>
                                <button className="text-sm text-blue-600 hover:underline">Download CSV</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3">ID</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Location</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((report) => (
                                            <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{report.id}</td>
                                                <td className="px-6 py-4">{report.type}</td>
                                                <td className="px-6 py-4">{report.location}</td>
                                                <td className="px-6 py-4">{report.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                            ${report.status === "Resolved" ? "bg-green-100 text-green-800" :
                                                            report.status === "Pending" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button onClick={() => handleStatusChange(report.id, "Resolved")} className="text-green-600 hover:bg-green-50 p-1 rounded" title="Mark Resolved"><CheckCircle className="w-5 h-5" /></button>
                                                    <button onClick={() => handleStatusChange(report.id, "Pending")} className="text-red-600 hover:bg-red-50 p-1 rounded" title="Reject / Pending"><XCircle className="w-5 h-5" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "hospitals" && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-800">Hospital Registry</h3>
                            <p className="text-gray-500 mb-6">Manage the directory of government and private hospitals.</p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                                + Add New Hospital
                            </button>
                        </div>
                    )}

                    {activeTab === "alerts" && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                            <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-800">Public Announcements</h3>
                            <p className="text-gray-500 mb-6">Broadcast emergency alerts or general notices to the portal.</p>
                            <div className="space-x-4">
                                <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">
                                    Post Emergency Alert
                                </button>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                                    Post General Notice
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
