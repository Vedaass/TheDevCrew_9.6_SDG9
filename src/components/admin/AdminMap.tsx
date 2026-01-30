"use client";

import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Report } from '@/lib/mockData';
import { Icon } from 'leaflet';
import { useRouter } from 'next/navigation';

// Fix for default Leaflet markers in Next.js
const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

interface AdminMapProps {
    reports: Report[];
}

export default function AdminMap({ reports }: AdminMapProps) {
    const router = useRouter();
    // Default center: Nagpur
    const center = { lat: 21.1458, lng: 79.0882 };

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-md border border-gray-200 z-0 relative">
            <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        position={[report.coordinates.lat, report.coordinates.lng]}
                        icon={customIcon}
                        eventHandlers={{
                            click: () => {
                                router.push(`/admin-dashboard/reports/${report.id}`);
                            },
                        }}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong>{report.type}</strong> <br />
                                Status: <span className={`font-bold ${report.status === 'Resolved' ? 'text-green-600' :
                                        report.status === 'Critical' || report.priority === 'Critical' ? 'text-red-600' : 'text-orange-600'
                                    }`}>{report.status}</span> <br />
                                <button
                                    onClick={() => router.push(`/admin-dashboard/reports/${report.id}`)}
                                    className="text-blue-600 underline mt-1"
                                >
                                    View Details
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
