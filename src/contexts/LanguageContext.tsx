"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
  // Common
  "app.title": { en: "Yavatmal District Smart Portal", mr: "यवतमाळ जिल्हा स्मार्ट पोर्टल" },
  "emergency": { en: "Emergency", mr: "आणीबाणी" },
  "hospital": { en: "Hospital", mr: "रुग्णालय" },
  "police": { en: "Police", mr: "पोलीस" },
  "home": { en: "Home", mr: "मुख्यपृष्ठ" },
  "services": { en: "Services", mr: "सेवा" },
  "call_now": { en: "Call Now", mr: "कॉल करा" },
  "location": { en: "Location", mr: "स्थान" },
  "report_issue": { en: "Report Issue", mr: "तक्रार नोंदवा" },
  "admin": { en: "Admin", mr: "प्रशासन" },
  "view_map": { en: "View Map", mr: "नकाशा पहा" },
  "get_directions": { en: "Get Directions", mr: "दिशा मिळवा" },

  // Emergency types
  "ambulance": { en: "Ambulance", mr: "रुग्णवाहिका" },
  "fire": { en: "Fire Brigade", mr: "अग्निशमन दल" },
  "women_helpline": { en: "Women Helpline", mr: "महिला हेल्पलाइन" },
  "child_helpline": { en: "Child Helpline", mr: "बाल हेल्पलाइन" },
  "disaster_mgmt": { en: "Disaster Mgmt", mr: "आपत्ती व्यवस्थापन" },

  // Footer
  "govt_maharashtra": { en: "Government of Maharashtra", mr: "महाराष्ट्र शासन" },
  "district_admin": { en: "District Administration Yavatmal", mr: "जिल्हा प्रशासन यवतमाळ" },
  "privacy": { en: "Privacy Policy", mr: "गोपनीयता धोरण" },
  "terms": { en: "Terms of Use", mr: "वापर अटी" }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Persist language preference
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
