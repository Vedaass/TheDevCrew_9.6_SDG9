"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, MapPin, Send, AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function ReportIssueForm() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [location, setLocation] = useState("");

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`),
                () => alert("Location access denied")
            );
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Issue Reported Successfully! Ticket #CITY-5521");
        }, 1500);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-orange-600 px-6 py-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-white" />
                <h3 className="text-white font-bold text-lg">{t("report_issue")}</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <p className="text-sm text-gray-500 mb-4">
                    Spot a pothole, garbage dump, or broken street light? Report it here and help keep Yavatmal clean and safe.
                </p>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Issue Category</label>
                    <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                        <option>Roads & Potholes</option>
                        <option>Garbage / Sanitation</option>
                        <option>Street Lights</option>
                        <option>Water Leakage</option>
                        <option>Stray Animals</option>
                        <option>Encroachment</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Location</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            placeholder="Enter address or pinpoint..."
                        />
                        <button type="button" onClick={handleGetLocation} className="bg-gray-100 p-2 rounded-lg text-gray-600 hover:text-orange-600 border border-gray-300">
                            <MapPin className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Photo Evidence</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                        <Camera className="w-8 h-8 mb-2 text-gray-400" />
                        <span className="text-xs">Tap to take photo</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Details..." />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-70"
                >
                    {isSubmitting ? "Submitting..." : (
                        <>
                            <Send className="w-4 h-4" />
                            Submit Report
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
