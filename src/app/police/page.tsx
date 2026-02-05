import ComplaintForm from "@/components/ComplaintForm";
import { POLICE_STATIONS } from "@/lib/data";
import { Shield, Phone, MapPin, Mail } from "lucide-react";

export default function PolicePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <Shield className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Police & Public Safety</h1>
                    <p className="text-gray-600 text-sm">Yavatmal District Police - Serving Citizen Safety</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Col: Stations List & Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="font-bold text-xl mb-4 text-blue-900">Key Police Contacts</h2>
                        <div className="space-y-4">
                            {POLICE_STATIONS.map((station, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition">
                                    <div className="mb-3 md:mb-0">
                                        <h3 className="font-bold text-gray-800">{station.name}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3" /> {station.address}
                                        </p>
                                    </div>
                                    <a href={`tel:${station.phone}`} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition w-fit">
                                        <Phone className="w-4 h-4" />
                                        Call {station.phone}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <h3 className="font-bold text-blue-900 mb-2">Cyber Crime & Women Safety</h3>
                        <p className="text-sm text-blue-800 mb-4">
                            Specialized cells are available for sensitive reporting. Your identity will be protected.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a href="tel:1930" className="flex items-center justify-center gap-2 bg-white text-blue-700 border border-blue-200 px-4 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition">
                                <Shield className="w-4 h-4" /> Cyber Cell (1930)
                            </a>
                            <a href="tel:1091" className="flex items-center justify-center gap-2 bg-pink-100 text-pink-700 border border-pink-200 px-4 py-3 rounded-lg font-bold text-sm hover:bg-pink-200 transition">
                                <Phone className="w-4 h-4" /> Women Line (1091)
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Col: Complaint Form */}
                <div>
                    <ComplaintForm />
                </div>

            </div>
        </div>
    );
}
