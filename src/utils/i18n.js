export const DEFAULT_LANG = 'fr';
export const SUPPORTED_LANGS = ['fr', 'en'];

// Get language from URL (/en/about -> 'en')
export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
}

// Remove language prefix from URL (/en/about -> /about)
export function removeLanguageFromUrl(url) {
  const [, lang, ...rest] = url.pathname.split('/');
  return SUPPORTED_LANGS.includes(lang) ? `/${rest.join('/')}` : url.pathname;
}

// Add language prefix to URL (/about -> /en/about)
export function addLanguageToUrl(url, lang) {
  const cleanUrl = removeLanguageFromUrl(url);
  return `/${lang}${cleanUrl}`.replace('//', '/');
}

// Get browser's preferred language
export function getBrowserLang() {
  if (typeof navigator === 'undefined') return DEFAULT_LANG;
  
  const browserLang = navigator.language.split('-')[0];
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG;
}

// Get user's preferred language
export function getPreferredLang() {
  if (typeof localStorage === 'undefined') return DEFAULT_LANG;
  
  const savedLang = localStorage.getItem('preferredLanguage');
  return SUPPORTED_LANGS.includes(savedLang) ? savedLang : getBrowserLang();
} 