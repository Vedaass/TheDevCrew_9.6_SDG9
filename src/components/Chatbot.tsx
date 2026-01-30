"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ id: number, text: string, sender: 'user' | 'bot' }[]>([
        { id: 1, text: "Namaste! I am the InfraGuard Virtual Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg = { id: Date.now(), text: inputText, sender: 'user' as const };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");

        // Simulate Bot Response
        setTimeout(() => {
            const botResponses = [
                "I can help you track your report status.",
                "To file a new complaint, use the 'New Report' button.",
                "Thank you for being a responsible citizen!",
                "Please provide more details on the location.",
                "Emergency services have been notified for high severity issues."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'bot'
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 md:w-96 overflow-hidden mb-4 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Bot size={20} />
                                <span className="font-bold">InfraGuard Assistant</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                                    <Minimize2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex w-full mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 group"
                >
                    <MessageSquare size={24} />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                        Need Help?
                    </span>
                </motion.button>
            )}
        </div>
    );
}
