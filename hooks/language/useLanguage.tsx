"use client";

import { useEffect, useState } from "react";
import i18n from "@/lib/i18n";
import { i18nSettings } from "@/lib/i18n/settings";

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<string>(
    i18n.language || i18nSettings.defaultLocale
  );

  // Sync with i18n and localStorage on mount + subscribe to language changes
  useEffect(() => {
    let savedLang: string = i18nSettings.defaultLocale;
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem("lang") : null;
      if (raw && i18nSettings.locales.includes(raw)) {
        savedLang = raw;
      }
    } catch {
      // ignore storage access errors
    }

    // Apply saved language if different
    if (savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang).then(() => setCurrentLang(savedLang));
    }

    // Listen for external language changes
    const handler = (lng: string) => {
      setCurrentLang(lng);
      try {
        localStorage.setItem("lang", lng);
      } catch {
        // ignore
      }
    };
    i18n.on("languageChanged", handler);

    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  const changeLanguage = (lang: string) => {
    if (!i18nSettings.locales.includes(lang)) return;
    i18n.changeLanguage(lang).then(() => {
      try {
        localStorage.setItem("lang", lang);
      } catch {
        // ignore
      }
      setCurrentLang(lang);
    });
  };

  return {
    currentLang,
    changeLanguage,
    isRTL: currentLang === "ar", // optional: handle RTL layouts
  };
}
