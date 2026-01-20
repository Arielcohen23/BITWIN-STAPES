import React from 'react';
import { Bitcoin } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Chargement...' 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} text-orange-500 animate-spin`}>
        <Bitcoin className="w-full h-full" />
      </div>
      <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;