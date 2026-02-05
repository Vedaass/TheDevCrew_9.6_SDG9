"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, Send, AlertTriangle, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"; // Assuming sonner is available or installed, otherwise I'll use simple alert

export default function ComplaintForm() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // In a real app, use toast.success
            alert("Complaint Registered Successfully! Reference ID: POL-2024-8821");
        }, 1500);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-blue-900 px-6 py-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-white" />
                <h3 className="text-white font-bold text-lg">Online Complaint Registration</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-2 text-sm text-yellow-800 mb-4">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>For emergencies (Live Crime, Threat to Life), <strong>DIAL 100</strong> immediately. Do not use this form.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Full Name</label>
                        <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                        <input required type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="10-digit Number" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Complaint Type</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        <option>Cyber Crime</option>
                        <option>Theft / Robbery</option>
                        <option>Harassment</option>
                        <option>Traffic Violation</option>
                        <option>Lost Property</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea required rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the incident in detail..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Evidence / Attachments</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <span className="text-xs">Click to upload photos/videos (Max 5MB)</span>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
                >
                    {isSubmitting ? "Submitting..." : (
                        <>
                            <Send className="w-4 h-4" />
                            Submit Complaint
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
