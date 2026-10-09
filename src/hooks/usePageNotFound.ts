// src/hooks/usePageNotFound.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageNotFound() {
  const location = useLocation();

  useEffect(() => {
    console.warn(`[404] Ruta no encontrada: ${location.pathname}`);
  }, [location.pathname]);
}