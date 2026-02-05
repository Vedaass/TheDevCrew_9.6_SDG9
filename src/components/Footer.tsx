"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 mt-auto mb-16 md:mb-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                    {/* Identity */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">{t("app.title")}</h3>
                        <p className="text-sm text-gray-400">
                            {t("district_admin")}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col space-y-2 text-sm">
                        <a href="#" className="hover:text-white transition">{t("privacy")}</a>
                        <a href="#" className="hover:text-white transition">{t("terms")}</a>
                        <a href="/admin" className="hover:text-white transition">{t("admin")}</a>
                    </div>

                    {/* Emergency Numbers */}
                    <div className="text-sm">
                        <p className="font-bold text-white mb-2">{t("emergency")}</p>
                        <p>Police: 100</p>
                        <p>Ambulance: 108</p>
                        <p>Women Helpline: 1091</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} {t("govt_maharashtra")}. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
