
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(supportedLanguages[0]);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('recoai-language');
    if (savedLanguage) {
      const language = supportedLanguages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('recoai-language', language.code);
    // Update document language attribute
    document.documentElement.lang = language.code;
  };

  // Simple translation function (in a real app, you'd load from translation files)
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'nav.features': 'Features',
        'nav.pricing': 'Pricing',
        'nav.integrations': 'Integrations',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.login': 'Login',
        'nav.signup': 'Sign Up',
        'hero.title': 'Unlock powerful insights into your customer\'s purchasing behavior',
        'hero.subtitle': 'RecoAI empowers you to take actionable steps to improve sales, enhance usability, and boost product discoverability in real-time.',
        'dashboard.welcome': 'Welcome back',
        'dashboard.overview': 'Here\'s an overview of your store\'s performance.',
        'dashboard.visitors': 'Visitors',
        'dashboard.conversion': 'Conversion Rate',
        'dashboard.sales': 'Sales',
        'dashboard.customers': 'Active Customers',
      },
      es: {
        'nav.features': 'Características',
        'nav.pricing': 'Precios',
        'nav.integrations': 'Integraciones',
        'nav.about': 'Acerca de',
        'nav.contact': 'Contacto',
        'nav.login': 'Iniciar Sesión',
        'nav.signup': 'Registrarse',
        'hero.title': 'Desbloquea conocimientos poderosos sobre el comportamiento de compra de tus clientes',
        'hero.subtitle': 'RecoAI te permite tomar medidas accionables para mejorar las ventas, mejorar la usabilidad y aumentar la descubribilidad de productos en tiempo real.',
        'dashboard.welcome': 'Bienvenido de nuevo',
        'dashboard.overview': 'Aquí tienes un resumen del rendimiento de tu tienda.',
        'dashboard.visitors': 'Visitantes',
        'dashboard.conversion': 'Tasa de Conversión',
        'dashboard.sales': 'Ventas',
        'dashboard.customers': 'Clientes Activos',
      },
      fr: {
        'nav.features': 'Fonctionnalités',
        'nav.pricing': 'Tarifs',
        'nav.integrations': 'Intégrations',
        'nav.about': 'À propos',
        'nav.contact': 'Contact',
        'nav.login': 'Connexion',
        'nav.signup': 'S\'inscrire',
        'hero.title': 'Débloquez des insights puissants sur le comportement d\'achat de vos clients',
        'hero.subtitle': 'RecoAI vous permet de prendre des mesures concrètes pour améliorer les ventes, améliorer l\'utilisabilité et augmenter la découvrabilité des produits en temps réel.',
        'dashboard.welcome': 'Bon retour',
        'dashboard.overview': 'Voici un aperçu des performances de votre boutique.',
        'dashboard.visitors': 'Visiteurs',
        'dashboard.conversion': 'Taux de Conversion',
        'dashboard.sales': 'Ventes',
        'dashboard.customers': 'Clients Actifs',
      },
      // Add more translations as needed...
    };

    return translations[currentLanguage.code]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
