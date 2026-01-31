import { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { STORAGE_KEYS, LIMITS } from '../constants';

export const useAnalysisHistory = () => {
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
        setHistory([]);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (result: AnalysisResult) => {
    setHistory(prev => [result, ...prev].slice(0, LIMITS.MAX_HISTORY_ITEMS));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};