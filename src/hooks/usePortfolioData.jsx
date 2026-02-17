import { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '../data/portfolioData';

const DataContext = createContext();

const STORAGE_KEY = 'samfolio_data';

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultData, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load stored data:', e);
    }
    return defaultData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save data:', e);
    }
  }, [data]);

  const updateSection = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }));
  };

  const updateSettings = (key, value) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }));
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'samfolio_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsSourceFile = () => {
    const jsContent = `export const defaultData = ${JSON.stringify(data, null, 2)};\n`;
    const blob = new Blob([jsContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      setData({ ...defaultData, ...imported });
      return true;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, updateSection, updateSettings, resetData, exportData, exportAsSourceFile, importData }}>
      {children}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('usePortfolioData must be used within DataProvider');
  return context;
}
