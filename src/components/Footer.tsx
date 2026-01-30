
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div>
                    <h3 className="font-bold text-lg mb-4">InfraGuard</h3>
                    <p className="text-gray-400">
                        A verified Government of India platform for crowdsourcing infrastructure maintenance.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-4">Contact</h3>
                    <p className="text-gray-400">
                        Ministry of Infrastructure<br />
                        New Delhi, India<br />
                        Email: help@infraguard.gov.in
                    </p>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
                © 2026 Government of India. All rights reserved.
            </div>
        </footer>
    );
}
