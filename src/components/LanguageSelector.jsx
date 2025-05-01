import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const LANGUAGE_NAMES = {
  fr: 'Français',
  en: 'English'
};

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useTranslations();

  const getPathInLanguage = (lang) => {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') return '/';
    
    const path = window.location.pathname;
    if (lang === 'fr') {
      // Pour le français, on enlève le préfixe /en/ s'il existe
      return path.startsWith('/en/') ? path.replace('/en/', '/') : path;
    } else {
      // Pour l'anglais, on ajoute le préfixe /en/ s'il n'existe pas déjà
      return path.startsWith('/en/') ? path : `/en${path}`;
    }
  };

  const handleLanguageChange = (e, lang) => {
    e.preventDefault();
    changeLanguage(lang);
  };

  return (
    <div className="language-selector">
      <a 
        href={getPathInLanguage('fr')} 
        className={`language-link ${currentLanguage === 'fr' ? 'active' : ''}`}
        onClick={(e) => handleLanguageChange(e, 'fr')}
      >
        {LANGUAGE_NAMES.fr}
      </a>
      <span className="language-separator">|</span>
      <a 
        href={getPathInLanguage('en')} 
        className={`language-link ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={(e) => handleLanguageChange(e, 'en')}
      >
        {LANGUAGE_NAMES.en}
      </a>
    </div>
  );
} 