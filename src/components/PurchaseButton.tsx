import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Plus, ShoppingBag } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface PurchaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  className?: string;
  icon?: 'ticket' | 'plus' | 'shopping';
  loadingText?: string;
  preselectedLottery?: string;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  icon = 'ticket',
  loadingText = 'Redirection...',
  preselectedLottery
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
    
    // Petit délai pour l'animation puis navigation
    setTimeout(() => {
      if (preselectedLottery) {
        navigate('/purchase', { state: { preselectedLottery: preselectedLottery } });
      } else {
        navigate('/draws');
      }
      // S'assurer que la page se charge en haut
      window.scrollTo(0, 0);
      setIsLoading(false);
    }, 500);
  };

  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg',
    secondary: 'bg-black text-white hover:bg-gray-800',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'
  };

  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-5 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const iconComponents = {
    ticket: Ticket,
    plus: Plus,
    shopping: ShoppingBag
  };

  const IconComponent = iconComponents[icon];

  if (isLoading) {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} cursor-not-allowed opacity-75`}>
        <LoadingSpinner size="small" text="" />
        <span>{loadingText}</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <IconComponent className="w-4 h-4" />
      {children}
    </button>
  );
};

export default PurchaseButton;