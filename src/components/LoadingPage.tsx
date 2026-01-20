import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" text="Chargement de la page d'achat..." />
        <p className="text-sm text-gray-500 mt-4">
          Préparation de votre expérience d'achat sécurisée
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;