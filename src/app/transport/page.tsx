import { Bus, Train, Map } from "lucide-react";

export default function TransportPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                <div className="bg-gray-100 p-2 rounded-lg">
                    <Bus className="w-8 h-8 text-gray-700" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transport & Infrastructure</h1>
                    <p className="text-gray-600 text-sm">Bus, Rail, and Road Connectivity</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Bus className="w-5 h-5 text-blue-600" /> MSRTC Bus Stand</h2>
                    <p className="text-gray-600 mb-2">Main Bus Stand, Arni Road, Yavatmal</p>
                    <p className="text-sm font-bold text-blue-800">Enquiry: 07232-244555</p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                        <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">Nagpur Schedule</button>
                        <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">Pune Schedule</button>
                        <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">Amravati Schedule</button>
                        <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">Nanded Schedule</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Train className="w-5 h-5 text-blue-600" /> Railway Stations</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-3">
                            <h3 className="font-bold">Dhamangaon (Closest Main Station)</h3>
                            <p className="text-sm text-gray-600">45 km from Yavatmal</p>
                        </div>
                        <div className="border-l-4 border-blue-500 pl-3">
                            <h3 className="font-bold">Yavatmal Station (Narrow Gauge)</h3>
                            <p className="text-sm text-gray-600">Shakuntala Express (Heritage) - Currently suspended for gauge conversion.</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-full">
                    <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-500 font-medium">
                        <Map className="w-6 h-6 mr-2" /> Interactive Transport Map Placeholder
                    </div>
                    <p className="text-xs text-center mt-2 text-gray-500">Map shows live traffic and bus locations (Integration Pending)</p>
                </div>

            </div>
        </div>
    );
}
