import { useState, useEffect } from 'react';

const DEFAULT_LANG = 'fr';
const SUPPORTED_LANGS = ['fr', 'en'];

// Initial translations to avoid empty state
const INITIAL_TRANSLATIONS = {
  fr: {
    nav: {
      heroes: "Héros Méta",
      compositions: "Compositions",
      builds: "Builds & Perks",
      tips: "Conseils",
      propose_build: "Proposer un build",
      community_builds: "Builds communautaires"
    },
    home: {
      welcome: "BIENVENUE SUR STADIUM META",
      discover: "Découvrez le nouveau mode Stadium",
      description: "Un mode compétitif unique où chaque round compte, avec des builds personnalisés, des perks stratégiques et une gestion du Stadium Cash pour dominer l'arène.",
      cta_button: "DÉCOUVRIR LES HÉROS MÉTA"
    }
  },
  en: {
    nav: {
      heroes: "Meta Heroes",
      compositions: "Compositions",
      builds: "Builds & Perks",
      tips: "Tips",
      propose_build: "Submit Build",
      community_builds: "Community Builds"
    },
    home: {
      welcome: "WELCOME TO STADIUM META",
      discover: "Discover the new Stadium mode",
      description: "A unique competitive mode where every round counts, with custom builds, strategic perks, and Stadium Cash management to dominate the arena.",
      cta_button: "DISCOVER META HEROES"
    }
  }
};

export function useTranslations() {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== 'undefined') {
      // Détecter la langue à partir de l'URL d'abord
      const path = window.location.pathname;
      if (path.startsWith('/en/')) {
        localStorage.setItem('preferredLanguage', 'en');
        return 'en';
      }
      // Sinon, utiliser la langue stockée ou la langue par défaut
      return localStorage.getItem('preferredLanguage') || DEFAULT_LANG;
    }
    return DEFAULT_LANG;
  });

  useEffect(() => {
    // Mettre à jour la langue du document
    if (typeof window !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  const [translations, setTranslations] = useState(INITIAL_TRANSLATIONS[currentLang]);

  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) {
      console.warn(`Language ${newLang} is not supported. Using ${DEFAULT_LANG} instead.`);
      newLang = DEFAULT_LANG;
    }
    setCurrentLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLang);
      document.documentElement.lang = newLang;
      
      // Rediriger vers la bonne URL
      const currentPath = window.location.pathname;
      if (newLang === 'en' && !currentPath.startsWith('/en/')) {
        window.location.href = `/en${currentPath}`;
      } else if (newLang === 'fr' && currentPath.startsWith('/en/')) {
        window.location.href = currentPath.replace('/en/', '/');
      }
    }
    setTranslations(INITIAL_TRANSLATIONS[newLang]);
  };

  const t = (key) => {
    if (!key) return '';
    
    try {
      const keys = key.split('.');
      let value = translations;
      
      for (const k of keys) {
        value = value?.[k];
        if (value === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      return value;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return {
    t,
    currentLanguage: currentLang,
    changeLanguage,
    supportedLanguages: SUPPORTED_LANGS
  };
}
