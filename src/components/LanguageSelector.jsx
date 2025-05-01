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
    
    // Si on est à la racine
    if (path === '/' || path === '/fr' || path === '/en') {
      return lang === 'fr' ? '/fr' : '/en';
    }
    
    if (lang === 'fr') {
      // Pour le français
      if (path.startsWith('/en/')) {
        return path.replace('/en/', '/fr/');
      } else if (!path.startsWith('/fr/')) {
        return `/fr${path}`;
      }
      return path;
    } else {
      // Pour l'anglais
      if (path.startsWith('/fr/')) {
        return path.replace('/fr/', '/en/');
      } else if (!path.startsWith('/en/')) {
        return `/en${path}`;
      }
      return path;
    }
  };

  const handleLanguageChange = (e, lang) => {
    e.preventDefault();
    const newPath = getPathInLanguage(lang);
    window.location.href = newPath;
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