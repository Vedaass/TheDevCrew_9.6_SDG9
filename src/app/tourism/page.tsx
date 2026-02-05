import { TOURISM } from "@/lib/data";
import { Camera, MapPin, Star, Phone } from "lucide-react";

export default function TourismPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                    <Camera className="w-8 h-8 text-green-700" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tourism & Hospitality</h1>
                    <p className="text-gray-600 text-sm">Explore Yavatmal: Wildlife, Temples, and More</p>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="font-bold text-xl mb-4 text-gray-800">Featured Destinations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TOURISM.map((spot) => (
                        <div key={spot.name} className="relative rounded-xl overflow-hidden h-64 shadow-md group">
                            {/* Real Image Background */}
                            <img
                                src={spot.image}
                                alt={spot.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                                <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-1 shadow-black drop-shadow-md">{spot.category}</span>
                                <h3 className="text-white font-bold text-2xl drop-shadow-md">{spot.name}</h3>
                                <p className="text-gray-200 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                                    {(spot as any).desc}
                                </p>
                                <button className="mt-3 bg-white/20 hover:bg-white/30 backdrop-blur text-white text-sm px-4 py-2 rounded-lg w-fit transition border border-white/30">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="font-bold text-xl mb-4 text-gray-800">Recommended Hotels</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { name: "Hotel Revati Pride", stars: 4, area: "Darwha Road", phone: "+91 72322 45678" },
                        { name: "Hotel Gyanson", stars: 3, area: "Main Market", phone: "+91 72322 44111" },
                        { name: "Hotel Chintamani", stars: 3, area: "Bus Stand", phone: "+91 72322 42222" },
                    ].map((hotel) => (
                        <div key={hotel.name} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-800">{hotel.name}</h3>
                                <div className="flex items-center bg-yellow-100 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-800">
                                    <Star className="w-3 h-3 mr-0.5 fill-current" /> {hotel.stars}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {hotel.area}
                            </p>
                            <a href={`tel:${hotel.phone}`} className="mt-auto w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
                                <Phone className="w-4 h-4" /> Call Hotel
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
