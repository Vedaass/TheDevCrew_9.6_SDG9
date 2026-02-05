"use client";

import EmergencyCommand from "@/components/EmergencyCommand";
import SafetyWidget from "@/components/SafetyWidget";
import { HOSPITALS } from "@/lib/data";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

// Dynamically import Map to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => <div className="h-64 sm:h-80 w-full bg-gray-100 animate-pulse rounded-xl" />
});

export default function Home() {
  const featuredHospitals = HOSPITALS.filter(h => h.featured);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* 1. Emergency Command Center (Hero) */}
      <EmergencyCommand />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 2. Main Content Column */}
          <div className="lg:col-span-2">
            {/* Live Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                Live Emergency Map <span className="text-xs font-normal text-red-500 animate-pulse">● LIVE</span>
              </h2>
              <MapComponent />
            </motion.div>

            {/* Safety & Services Widget */}
            <SafetyWidget />

            {/* 4. Featured Hospitals (Added based on user request) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  Verified Hospitals
                </h2>
                <Link href="/hospitals" className="text-blue-600 text-sm font-semibold hover:underline flex items-center">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredHospitals.map(hospital => (
                  <div key={hospital.id} className="bg-white border hover:border-blue-300 p-4 rounded-xl shadow-sm hover:shadow-md transition group">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-blue-500 tracking-wider">{hospital.type}</span>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition">{hospital.name}</h3>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 truncate">{hospital.address}</p>
                    <a href={`tel:${hospital.phone}`} className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 border border-green-200 py-2 rounded-lg font-bold text-sm hover:bg-green-100 transition">
                      <Phone className="w-4 h-4" /> Call {hospital.phone}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 3. Sidebar / Additional Info */}
          <div className="mt-6 space-y-6">
            {/* Quick Government Notifications */}
            <div className="bg-blue-900 text-white rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <h3 className="font-bold text-lg mb-4 border-b border-blue-700 pb-2 relative z-10">District Alerts</h3>
              <ul className="space-y-4 text-sm relative z-10">
                <li className="flex gap-2">
                  <span className="bg-red-500 text-xs px-2 py-0.5 rounded font-bold h-fit ring-2 ring-red-400">ALERT</span>
                  <p className="opacity-90">Heavy rainfall warning in Yavatmal district for next 24 hours. Disaster management team on high alert.</p>
                </li>
                <li className="flex gap-2">
                  <span className="bg-orange-500 text-xs px-2 py-0.5 rounded font-bold h-fit text-black">NOTICE</span>
                  <p className="opacity-90">Polio vaccination drive scheduled for this Sunday at all government hospitals.</p>
                </li>
              </ul>
            </div>

            {/* Official Links */}
            <div className="bg-white border p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-800 mb-3">Other Portals</h3>
              <div className="flex flex-col gap-2 text-sm text-blue-700 font-medium">
                <a href="#" className="hover:underline flex items-center gap-2"><ArrowRight className="w-3 h-3 text-gray-400" /> maharashtra.gov.in</a>
                <a href="#" className="hover:underline flex items-center gap-2"><ArrowRight className="w-3 h-3 text-gray-400" /> yavatmal.gov.in</a>
                <a href="#" className="hover:underline flex items-center gap-2"><ArrowRight className="w-3 h-3 text-gray-400" /> police.gov.in</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
