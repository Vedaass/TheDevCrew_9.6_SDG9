"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmergencyBar() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay slightly to ensure hydration
        setIsVisible(true);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
            <div className="grid grid-cols-3 h-16">
                <Link
                    href="/emergency"
                    className="flex flex-col items-center justify-center text-red-600 active:bg-red-50"
                >
                    <div className="bg-red-100 p-1.5 rounded-full mb-1">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{t("emergency")}</span>
                </Link>

                <a
                    href="tel:100"
                    className="flex flex-col items-center justify-center text-primary active:bg-blue-50 border-x border-gray-100"
                >
                    <Phone className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">{t("call_now")}</span>
                </a>

                <Link
                    href="/hospitals"
                    className="flex flex-col items-center justify-center text-primary active:bg-blue-50"
                >
                    <MapPin className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">{t("hospital")}</span>
                </Link>
            </div>
        </div>
    );
}
