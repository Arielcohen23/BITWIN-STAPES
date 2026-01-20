import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const navigateWithLoading = useCallback((path: string, delay: number = 300) => {
    setIsLoading(true);
    
    // Simuler un petit délai pour l'animation
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, delay);
  }, [navigate]);

  return {
    isLoading,
    navigateWithLoading
  };
};