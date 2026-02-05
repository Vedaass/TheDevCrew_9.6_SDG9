import HospitalList from "@/components/HospitalList";
import { HeartPulse } from "lucide-react";

export default function HospitalsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                <div className="bg-red-100 p-2 rounded-lg">
                    <HeartPulse className="w-8 h-8 text-red-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Emergency Hospital Directory</h1>
                    <p className="text-gray-600 text-sm">Find nearest reliable healthcare centers in Yavatmal</p>
                </div>
            </div>

            <HospitalList />

            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                <h3 className="font-bold text-blue-900 text-lg mb-2">Can't find a hospital?</h3>
                <p className="text-blue-800 mb-4">Call the 24/7 District Health Helpline for immediate assistance.</p>
                <a href="tel:108" className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-lg">
                    <HeartPulse className="w-5 h-5" />
                    Call Emergency Ambulance (108)
                </a>
            </div>
        </div>
    );
}
