import React, { useState } from 'react';
import { Bitcoin } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerified: () => void;
  onRejected: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  isOpen,
  onVerified,
  onRejected
}) => {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null);

  const handleConfirm = () => {
    if (selectedOption === 'yes') {
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('ageVerifiedDate', new Date().toISOString());
      onVerified();
    } else if (selectedOption === 'no') {
      onRejected();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="age-verification-overlay">
      <div className="age-verification-modal">
        {/* Header avec logo */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bitcoin className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold text-black">BITWIN</span>
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            # LUXURY BITCOIN CONTEST
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-xl font-bold text-black mb-4">
          Welcome to our website!
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 text-sm">
          Please confirm that you are 18 years of age or older to proceed
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          <label className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${
            selectedOption === 'yes' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="ageVerification"
              value="yes"
              checked={selectedOption === 'yes'}
              onChange={() => setSelectedOption('yes')}
              className="w-4 h-4 text-blue-500"
            />
            <span className="text-gray-800 text-sm">
              Yes, I am 18 years of age or older
            </span>
          </label>

          <label className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-all ${
            selectedOption === 'no' 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              type="radio"
              name="ageVerification"
              value="no"
              checked={selectedOption === 'no'}
              onChange={() => setSelectedOption('no')}
              className="w-4 h-4 text-red-500"
            />
            <span className="text-gray-800 text-sm">
              No, I am under 18 years of age
            </span>
          </label>
        </div>

        {/* Bouton */}
        <button
          onClick={handleConfirm}
          disabled={!selectedOption}
          className={`w-full py-3 px-6 rounded font-semibold transition-all ${
            selectedOption
              ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirm
        </button>

        {/* Texte légal */}
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          Participants must confirm they are 18 years of age or older before 
          entering any competition. BitWins reserves the right to 
          verify age upon winning, and non-compliance may result in 
          disqualification.
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;