import ReportIssueForm from "@/components/ReportIssueForm";
import { SERVICES } from "@/lib/data";
import { FileText, Zap, Droplets, Home, MessageSquareWarning, Baby, ArrowUpRight } from "lucide-react";

// Map icon strings to components
const iconMap: Record<string, any> = {
    "Baby": Baby,
    "FileText": FileText,
    "Zap": Zap,
    "Droplets": Droplets,
    "Home": Home,
    "MessageSquareWarning": MessageSquareWarning
};

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                    <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Smart Citizen Services</h1>
                    <p className="text-gray-600 text-sm">Access municipal services and report issues instantly</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Services Grid */}
                <div className="lg:col-span-2">
                    <h2 className="font-bold text-xl mb-4 text-gray-800">Online Services</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {SERVICES.map((service) => {
                            const Icon = iconMap[service.icon] || FileText;
                            return (
                                <a
                                    key={service.title}
                                    href={service.link}
                                    className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:shadow-md hover:border-blue-300 transition group"
                                >
                                    <div className="bg-gray-50 p-3 rounded-full group-hover:bg-blue-50 transition">
                                        <Icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
                                    </div>
                                    <span className="font-semibold text-gray-800 text-sm">{service.title}</span>
                                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition" />
                                </a>
                            );
                        })}
                    </div>

                    <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="font-bold text-gray-800 mb-3">Downloads & Forms</h3>
                        <ul className="space-y-2 text-sm text-blue-700">
                            <li><a href="#" className="hover:underline flex items-center gap-2"><FileText className="w-4 h-4" /> Application for New Water Connection (PDF)</a></li>
                            <li><a href="#" className="hover:underline flex items-center gap-2"><FileText className="w-4 h-4" /> Birth Certificate Application Form (PDF)</a></li>
                            <li><a href="#" className="hover:underline flex items-center gap-2"><FileText className="w-4 h-4" /> Trade License Renewal Form (PDF)</a></li>
                        </ul>
                    </div>
                </div>

                {/* Right Col: Report Issue */}
                <div>
                    <ReportIssueForm />
                </div>

            </div>
        </div>
    );
}
