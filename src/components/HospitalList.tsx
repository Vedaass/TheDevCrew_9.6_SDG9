"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { HOSPITALS } from "@/lib/data";
import { Phone, MapPin, Filter, Search, Stethoscope } from "lucide-react";
import { useState, useMemo } from "react";

export default function HospitalList() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");

    const specialties = ["All", "Multispecialty", "General", "Orthopedic", "Children", "Specialty"];

    const filteredHospitals = useMemo(() => {
        return HOSPITALS.filter((hospital) => {
            const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hospital.address?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === "All" || hospital.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, filterType]);

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search hospitals..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        {specialties.map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${filterType === type
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hospital Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHospitals.map((hospital) => (
                    <div key={hospital.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition relative overflow-hidden group">
                        {hospital.featured && (
                            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-bl-lg">
                                VERIFIED
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                                    {hospital.type}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition">
                                    {hospital.name}
                                </h3>
                            </div>
                        </div>

                        {hospital.address && (
                            <p className="text-sm text-gray-500 mb-4 flex items-start gap-1">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                {hospital.address}
                            </p>
                        )}

                        <div className="flex items-center gap-3 mt-auto">
                            {hospital.phone === "Number not listed" ? (
                                <span className="flex-grow text-center py-2 bg-gray-100 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed">
                                    {hospital.phone}
                                </span>
                            ) : (
                                <a
                                    href={`tel:${hospital.phone}`}
                                    className="flex-grow flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-bold transition shadow-sm active:transform active:scale-95"
                                >
                                    <Phone className="w-4 h-4" />
                                    {hospital.phone}
                                </a>
                            )}

                            <button className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                                <MapPin className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mt-2 text-xs text-gray-400 text-right">
                            Last Verified: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                ))}

                {filteredHospitals.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No hospitals found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
