import React, { createContext, useContext, useState } from 'react';
import { en } from '../translations/en';
import { id } from '../translations/id';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => setLanguage(l => l === 'en' ? 'id' : 'en');

  const t = language === 'en' ? en : id;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
