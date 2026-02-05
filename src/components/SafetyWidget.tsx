"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { POLICE_STATIONS } from "@/lib/data";
import { Shield, FileText, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SafetyWidget() {
    const { t } = useLanguage();
    const nearestStation = POLICE_STATIONS[1]; // Mock nearest

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
            {/* Quick Complaint / Safety Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Shield className="w-32 h-32" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    {t("police")} & Safety
                </h3>

                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">Nearest Station</p>
                        <p className="font-bold text-gray-900">{nearestStation.name}</p>
                        <p className="text-sm text-gray-600">{nearestStation.address}</p>
                        <div className="mt-3 flex gap-2">
                            <a href={`tel:${nearestStation.phone}`} className="flex-1 bg-white text-blue-700 border border-blue-200 text-center py-2 rounded font-medium text-sm hover:bg-blue-50 transition">
                                Call Station
                            </a>
                            <button className="flex-1 bg-blue-600 text-white text-center py-2 rounded font-medium text-sm hover:bg-blue-700 transition">
                                {t("get_directions")}
                            </button>
                        </div>
                    </div>

                    <Link href="/police/complaint" className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition">
                        Register Online Complaint
                    </Link>
                </div>
            </div>

            {/* Quick Services Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-orange-500" />
                    {t("services")}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                    {[
                        "Birth Certificate",
                        "Death Certificate",
                        "Property Tax",
                        "Water Bill",
                        "Electricity",
                        "Ration Card"
                    ].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition group"
                        >
                            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-800">{item}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                        </Link>
                    ))}
                </div>

                <Link href="/services" className="mt-4 inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700">
                    View All Services <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </div>
    );
}
