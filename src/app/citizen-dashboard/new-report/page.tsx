"use client";

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, MapPin, AlertCircle, CheckCircle2, Loader2, Camera, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MockDB } from '@/lib/mockData';

export default function NewReportPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState(1); // 1: Upload, 2: Details
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [aiResult, setAiResult] = useState<{ type: string, severity: string } | null>(null);

    const [formData, setFormData] = useState({
        issueType: '',
        description: '',
        location: '',
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
                runAiAnalysis();
            };
            reader.readAsDataURL(file);
        }
    };

    const runAiAnalysis = () => {
        setAnalyzing(true);
        // Simulate AI Latency
        setTimeout(() => {
            setAnalyzing(false);
            setAiResult({
                type: 'Road Damage',
                severity: 'High'
            });
            setFormData(prev => ({
                ...prev,
                issueType: 'Road Damage'
            }));
        }, 2500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        if (btn) btn.innerText = 'Submitting...';

        // Add to Mock DB
        MockDB.addReport({
            type: formData.issueType,
            description: formData.description,
            location: formData.location,
            severity: (aiResult?.severity as any) || 'Medium',
            image: image || '',
            userId: 'current_user' // In real app, from auth
        });

        // Small delay for UX
        setTimeout(() => {
            router.push('/citizen-dashboard');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="max-w-2xl mx-auto mb-6">
                    <button
                        onClick={() => router.push('/citizen-dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors font-medium"
                    >
                        <ChevronRight className="rotate-180" size={20} />
                        Back to Dashboard
                    </button>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                        <h1 className="font-bold text-lg text-gray-800">New Report</h1>
                        <div className="flex gap-2 text-sm font-medium">
                            <span className={`px-2 py-1 rounded ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1. Evidence</span>
                            <span className={`px-2 py-1 rounded ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2. Details</span>
                        </div>
                    </div>

                    <div className="p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors h-64 relative overflow-hidden"
                                    onClick={() => !image && fileInputRef.current?.click()}
                                >
                                    {image ? (
                                        <>
                                            <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setImage(null); setAiResult(null); }}
                                                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>

                                            {/* AI Overlay */}
                                            {analyzing && (
                                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                                                    <Loader2 size={32} className="animate-spin mb-2" />
                                                    <span className="animate-pulse">Analyzing Image...</span>
                                                </div>
                                            )}

                                            {/* Analysis Result */}
                                            {aiResult && !analyzing && (
                                                <motion.div
                                                    initial={{ y: 50, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 backdrop-blur-md"
                                                >
                                                    <div className="flex items-center gap-2 mb-1 text-sm text-green-300">
                                                        <CheckCircle2 size={16} />
                                                        <span>AI Detected Issue:</span>
                                                    </div>
                                                    <div className="flex justify-between items-end">
                                                        <span className="font-bold text-lg">{aiResult.type}</span>
                                                        <span className="text-xs px-2 py-1 bg-red-500 rounded font-bold uppercase">{aiResult.severity} Severity</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                                <Camera size={28} />
                                            </div>
                                            <h3 className="font-bold text-gray-700">Upload Photo Evidence</h3>
                                            <p className="text-sm text-gray-500 mt-2">Click to browse or drag and drop</p>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        disabled={!image || analyzing}
                                        onClick={() => setStep(2)}
                                        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                                        <select
                                            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                            value={formData.issueType}
                                            onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Road Damage">Road Damage</option>
                                            <option value="Bridge Damage">Bridge Damage</option>
                                            <option value="Drainage Issue">Drainage Issue</option>
                                            <option value="Streetlight Failure">Streetlight Failure</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {aiResult && (
                                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                                <CheckCircle2 size={12} />
                                                Auto-selected based on AI analysis
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Severity (Estimated)</label>
                                        <select
                                            className="w-full border rounded-lg p-2 bg-gray-50"
                                            defaultValue={aiResult?.severity || "Medium"}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter address or landmark"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <button type="button" className="text-xs text-blue-600 font-medium mt-1 flex items-center gap-1 hover:underline">
                                        <MapPin size={12} /> Detect Current Location
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                                        placeholder="Describe the issue in detail..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-3 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        Back
                                    </button>
                                    <button
                                        id="submit-btn"
                                        type="submit"
                                        className="flex-1 py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg hover:shadow-xl hover:from-blue-800 hover:to-blue-950 transition-all"
                                    >
                                        Submit Report
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
