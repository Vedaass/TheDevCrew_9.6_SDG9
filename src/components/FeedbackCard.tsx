"use client";

import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeedbackCard() {
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Mock submission
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-full"
            >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <Star size={24} fill="currentColor" />
                </div>
                <h3 className="font-bold text-gray-800">Thank You!</h3>
                <p className="text-sm text-gray-500">Your feedback helps us improve.</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Feedback</h3>
            <p className="text-sm text-gray-500 mb-4">Rate your experience with the portal.</p>

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                            <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
                        </button>
                    ))}
                </div>

                <textarea
                    className="w-full border rounded-lg p-2 text-sm mb-3 focus:outline-none focus:border-blue-500 h-20 resize-none"
                    placeholder="Tell us what you think..."
                    required
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    <Send size={14} /> Submit Feedback
                </button>
            </form>
        </div>
    );
}
