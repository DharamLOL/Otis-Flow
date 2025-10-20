// src/hooks/useCache.js
import { useCallback } from "react";

export const useCache = () => {
  const STORAGE_KEY = "formularios";

  const getAll = useCallback(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }, []);

  const setAll = useCallback((obj) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }, []);

  const addEntry = useCallback((empresa, dataISO, payload) => {
    const db = getAll();

    if (!db[empresa]) db[empresa] = {};
    if (!db[empresa][dataISO]) db[empresa][dataISO] = [];

    db[empresa][dataISO].push(payload);
    setAll(db);
  }, [getAll, setAll]);

  const getEntries = useCallback((empresa = null, dataISO = null) => {
    const db = getAll();

    if (empresa && !db[empresa]) return {};

    if (empresa && dataISO) {
      return db[empresa][dataISO] || [];
    }

    if (empresa) {
      return db[empresa];
    }

    return db;
  }, [getAll]);

  return { addEntry, getEntries };
};