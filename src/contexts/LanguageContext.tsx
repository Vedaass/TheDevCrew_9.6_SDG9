"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
}

const translations: Translations = {
  // General
  'app.title': { en: 'InfraGuard', hi: 'इन्फ्रागार्ड', mr: 'इन्फ्रागार्ड' },
  'app.subtitle': { en: 'Building a Better India', hi: 'बेहतर भारत का निर्माण', mr: 'एक बेहतर भारत घडवत आहे' },
  'login.title': { en: 'Login to Portal', hi: 'पोर्टल पर लॉगिन करें', mr: 'पोर्टलवर लॉगिन करा' },
  'login.email': { en: 'Email Address', hi: 'ईमेल पता', mr: 'ईमेल पत्ता' },
  'login.password': { en: 'Password', hi: 'पासवर्ड', mr: 'पासवर्ड' },
  'login.submit': { en: 'Login', hi: 'लॉगिन', mr: 'लॉगिन' },
  'role.citizen': { en: 'Citizen', hi: 'नागरिक', mr: 'नागरिक' },
  'role.admin': { en: 'Administrator', hi: 'प्रशासक', mr: 'प्रशासक' },
  // Dashboard
  'dash.welcome': { en: 'Welcome', hi: 'स्वागत हे', mr: 'स्वागत आहे' },
  'dash.report_issue': { en: 'Report Issue', hi: 'समस्या की रिपोर्ट करें', mr: 'समस्येची तक्रार करा' },
  'dash.my_reports': { en: 'My Reports', hi: 'मेरी रिपोर्ट', mr: 'माझे अहवाल' },
  'dash.logout': { en: 'Logout', hi: 'लॉग आउट', mr: 'बाहेर पडा' },
  'dash.recent_reports': { en: 'Recent Reports', hi: 'हाल की रिपोर्ट', mr: 'अलीकडील अहवाल' },
  // Admin
  'admin.total': { en: 'Total Reports', hi: 'कुल रिपोर्ट', mr: 'एकूण अहवाल' },
  'admin.pending': { en: 'Pending', hi: 'लंबित', mr: 'प्रलंबित' },
  'admin.resolved': { en: 'Resolved', hi: 'हल किया गया', mr: 'निराकरण झाले' },
  'admin.status': { en: 'Status', hi: 'स्थिति', mr: 'स्थिती' },
  'admin.action': { en: 'Action', hi: 'कार्रवाई', mr: 'कृती' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
