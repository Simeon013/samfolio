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

  const publishToGitHub = async () => {
    const token = localStorage.getItem('samfolio_gh_token');
    const repo = localStorage.getItem('samfolio_gh_repo'); // format: "owner/repo"
    if (!token || !repo) {
      return { success: false, error: 'config_missing' };
    }

    const filePath = 'src/data/portfolioData.js';
    const jsContent = `export const defaultData = ${JSON.stringify(data, null, 2)};\n`;
    const contentBase64 = btoa(unescape(encodeURIComponent(jsContent)));

    try {
      // 1. Get current file SHA (required by GitHub API to update)
      const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/vnd.github.v3+json' },
      });
      if (!getRes.ok) throw new Error(`Erreur GitHub: ${getRes.status}`);
      const fileData = await getRes.json();

      // 2. Update the file
      const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `update: portfolio data (${new Date().toLocaleDateString('fr-FR')})`,
          content: contentBase64,
          sha: fileData.sha,
        }),
      });

      if (!putRes.ok) throw new Error(`Erreur commit: ${putRes.status}`);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
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
    <DataContext.Provider value={{ data, setData, updateSection, updateSettings, resetData, exportData, exportAsSourceFile, publishToGitHub, importData }}>
      {children}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('usePortfolioData must be used within DataProvider');
  return context;
}
