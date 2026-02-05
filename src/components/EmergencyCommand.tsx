"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Ambulance, Flame, ShieldAlert, Baby, HeartPulse, Download, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function EmergencyCommand() {
    const { t } = useLanguage();
    const [location, setLocation] = useState<string>("Locating...");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, reverse geocode here. For now, show coords or mock.
                    setLocation("Near Civil Lines, Yavatmal");
                },
                () => {
                    setLocation("Location Access Denied");
                }
            );
        }
    }, []);

    const emergencyServices = [
        { name: t("police"), number: "100", icon: ShieldAlert, color: "bg-blue-600 hover:bg-blue-700" },
        { name: t("ambulance"), number: "108", icon: Ambulance, color: "bg-red-600 hover:bg-red-700" },
        { name: t("fire"), number: "101", icon: Flame, color: "bg-orange-500 hover:bg-orange-600" },
        { name: t("women_helpline"), number: "1091", icon: HeartPulse, color: "bg-pink-600 hover:bg-pink-700" },
        { name: t("child_helpline"), number: "1098", icon: Baby, color: "bg-teal-500 hover:bg-teal-600" },
        { name: t("disaster_mgmt"), number: "1077", icon: Phone, color: "bg-gray-700 hover:bg-gray-800" },
    ];

    return (
        <div className="bg-red-50 border-b-4 border-red-600 p-4 md:p-8 animate-fade-in">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-red-700 flex items-center gap-2">
                            <ShieldAlert className="w-8 h-8" />
                            {t("emergency")}
                        </h2>
                        <p className="text-red-600 font-medium mt-1">
                            {t("location")}: <span className="font-bold underline">{location}</span>
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            const btn = document.activeElement as HTMLElement;
                            if (btn) {
                                const originalText = btn.innerText;
                                btn.innerText = "Downloading...";
                                setTimeout(() => {
                                    alert("Emergency Directory PDF downloaded to your device.");
                                    btn.innerText = "Downloaded!";
                                    setTimeout(() => btn.innerText = "PDF Directory", 2000);
                                }, 1500);
                            }
                        }}
                        className="hidden md:flex items-center gap-2 bg-white text-red-700 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition shadow-sm mt-4 md:mt-0 cursor-pointer"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-bold">PDF Directory</span>
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {emergencyServices.map((service) => (
                        <a
                            key={service.name}
                            href={`tel:${service.number}`}
                            className={`${service.color} text-white p-4 rounded-xl shadow-lg transform transition active:scale-95 flex flex-col items-center justify-center text-center h-28 md:h-32 border-2 border-white/20`}
                        >
                            <service.icon className="w-8 h-8 md:w-10 md:h-10 mb-2" />
                            <div className="text-xs md:text-sm font-medium opacity-90">{service.name}</div>
                            <div className="text-lg md:text-xl font-bold tracking-wider">{service.number}</div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
