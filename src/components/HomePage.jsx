import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

export default function HomePage() {
  const { t } = useTranslations();

  return (
    <div className="hero-section hero-section-center-flex">
      <div className="hero-title-3-block">
        <div className="hero-title-3-underline"></div>
        <div className="hero-title-3-center-wrap">
          <h1 className="hero-title hero-title-3">
            {t('home.welcome')}
          </h1>
        </div>
        <div className="hero-title-3-underline hero-title-3-underline-bottom"></div>
      </div>
      <div className="glass-card">
        <p className="hero-desc">
          {t('home.discover')} d'Overwatch 2 !<br />
          {t('home.description')}
        </p>
        <a href="/heroes" className="hero-btn-glow">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginRight: '8px'}}>
            <circle cx="11" cy="11" r="10" fill="#181c22" stroke="#FFA000" strokeWidth="2"/>
            <path d="M11 7V15" stroke="#FFA000" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7 11H15" stroke="#FFA000" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {t('home.cta_button')}
        </a>
      </div>
    </div>
  );
} 