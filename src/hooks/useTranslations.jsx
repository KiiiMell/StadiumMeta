import { useState, useEffect } from 'react';

export function useTranslations() {
  const [translations, setTranslations] = useState({});
  const [lang, setLang] = useState('fr');

  const loadTranslations = async () => {
    const response = await fetch(`/i18n/${lang}.json`);
    const data = await response.json();
    setTranslations(data);
  };

  useEffect(() => {
    loadTranslations();
    const langChangeHandler = (event) => {
      setLang(event.detail.lang);
      loadTranslations();
    };
    window.addEventListener('languageChange', langChangeHandler);
    return () => window.removeEventListener('languageChange', langChangeHandler);
  }, [lang]);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  return { t: (key) => translations[key] || key, lang };
    setLang(lang);
    localStorage.setItem('lang', lang);
  };

  return { t: (key) => translations[key] || key, lang, changeLanguage };
}
