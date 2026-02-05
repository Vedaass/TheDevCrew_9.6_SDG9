"use client";

import { useEffect, useState } from "react";
// Import Leaflet CSS - essential!
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix for default marker icon in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function MapComponent() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>;

    return (
        <div className="h-64 sm:h-80 w-full rounded-xl overflow-hidden shadow-md border border-gray-200 mt-6 z-0 relative">
            <MapContainer center={[20.389, 78.130]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[20.389, 78.130]} icon={icon}>
                    <Popup>
                        Yavatmal City Center <br /> You are here.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
