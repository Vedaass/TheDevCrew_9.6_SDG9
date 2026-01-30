"use client";

import React, { useState } from 'react';
import { X, Building2, Hammer, Banknote, AlertCircle } from 'lucide-react';
import { Report } from '@/lib/mockData';

interface AssignmentModalProps {
    report: Report;
    isOpen: boolean;
    onClose: () => void;
    onAssign: (details: { vendorName: string; workType: string; estimatedCost: string }) => void;
}

export default function AssignmentModal({ report, isOpen, onClose, onAssign }: AssignmentModalProps) {
    const [formData, setFormData] = useState({
        vendorName: report.vendorName || '',
        workType: report.workType || 'Repair',
        estimatedCost: report.estimatedCost || '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAssign(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="p-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
                                #{report.id}
                            </span>
                            <span className="text-gray-500 text-xs font-medium">
                                {report.type}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Assign Vendor</h2>
                        <p className="text-gray-500 text-sm">Allocate resources for infrastructure repair.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <Building2 size={14} className="text-blue-500" />
                                Vendor / Contractor Name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Nagpur Infrastructure Pvt Ltd"
                                value={formData.vendorName}
                                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <Hammer size={14} className="text-orange-500" />
                                Work Type
                            </label>
                            <select
                                value={formData.workType}
                                onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                            >
                                <option value="Repair">Repair</option>
                                <option value="Replacement">Replacement</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Inspection">Inspection</option>
                                <option value="Construction">New Construction</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <Banknote size={14} className="text-green-600" />
                                Estimated Cost (₹)
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. 50,000"
                                value={formData.estimatedCost}
                                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg flex gap-3 items-start text-xs text-blue-800 border border-blue-100 mt-2">
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <p>Assigning this vendor will automatically update the report status to "In Progress" and notify the citizen.</p>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-2.5 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2.5 px-4 rounded-lg font-bold bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg hover:shadow-xl hover:translate-y-px transition-all"
                            >
                                Confirm Assignment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
