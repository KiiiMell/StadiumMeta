import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSelector from './LanguageSelector';

export default function Navigation() {
  const { t, currentLanguage } = useTranslations();

  const getLocalizedHref = (path) => {
    if (typeof window === 'undefined') return path;
    return currentLanguage === 'en' ? `/en${path}` : `/fr${path}`;
  };

  return (
    <nav className="main-nav">
      <div className="dropdown-categorie">
        <button id="category-btn" className="dropdown-btn" tabIndex="0">
          {currentLanguage === 'fr' ? 'Catégorie ▾' : 'Category ▾'}
        </button>
        <div className="dropdown-content">
          <a href={getLocalizedHref('/heroes')} id="nav-heroes">{t('nav.heroes')}</a>
          <a href={getLocalizedHref('/compositions')} id="nav-compositions">{t('nav.compositions')}</a>
          <a href={getLocalizedHref('/proposer-build')} id="nav-propose">{t('nav.propose_build')}</a>
          <a href={getLocalizedHref('/builds-commu')} id="nav-community">{t('nav.community_builds')}</a>
        </div>
      </div>
      <LanguageSelector />
      <div id="nav-auth-action">
        <a href="/login" className="nav-login-link">Connexion</a>
      </div>
    </nav>
  );
} 