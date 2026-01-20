import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Trophy, Target, Plus, Minus, CheckCircle, X, User, Mail, Lock, CreditCard, Bitcoin, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LotteryData {
  id: string;
  name: string;
  icon: React.ReactNode;
  prize: string;
  prizeEur: string;
  drawDate: string;
  ticketPrice: number;
  maxParticipants: number;
  currentParticipants: number;
  countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  color: string;
  bgColor: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PurchasePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addTickets } = useAuth();
  const location = useLocation();
  
  // Récupérer la loterie présélectionnée depuis l'état de navigation
  const preselectedLottery = location.state?.preselectedLottery;
  const [selectedLottery, setSelectedLottery] = useState<string>(
    preselectedLottery === 'monthly' ? 'monthly' : 'weekly'
  );
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'FR',
    address: '',
    postalCode: '',
    city: '',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay'>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const countries = [
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪', dialCode: '+32' },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭', dialCode: '+41' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352' },
    { code: 'MC', name: 'Monaco', flag: '🇲🇨', dialCode: '+377' },
    { code: 'DE', name: 'Allemagne', flag: '🇩🇪', dialCode: '+49' },
    { code: 'IT', name: 'Italie', flag: '🇮🇹', dialCode: '+39' },
    { code: 'ES', name: 'Espagne', flag: '🇪🇸', dialCode: '+34' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
    { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', dialCode: '+31' },
    { code: 'AT', name: 'Autriche', flag: '🇦🇹', dialCode: '+43' },
    { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', dialCode: '+44' },
    { code: 'IE', name: 'Irlande', flag: '🇮🇪', dialCode: '+353' },
    { code: 'DK', name: 'Danemark', flag: '🇩🇰', dialCode: '+45' },
    { code: 'SE', name: 'Suède', flag: '🇸🇪', dialCode: '+46' },
    { code: 'NO', name: 'Norvège', flag: '🇳🇴', dialCode: '+47' },
    { code: 'FI', name: 'Finlande', flag: '🇫🇮', dialCode: '+358' }
  ];

  const selectedCountry = countries.find(country => country.code === guestInfo.country) || countries[0];

  const lotteries: Record<string, LotteryData> = {
    weekly: {
      id: 'weekly',
      name: 'Jackpot Hebdomadaire',
      icon: <Calendar className="w-6 h-6" />,
      prize: '1 Bitcoin',
      prizeEur: '≈ 95,000€',
      drawDate: 'jeudi 10 juillet à 02:00',
      ticketPrice: 29.99,
      maxParticipants: 3000,
      currentParticipants: 847,
      countdown: { days: 3, hours: 14, minutes: 27, seconds: 45 },
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    monthly: {
      id: 'monthly',
      name: 'Méga Jackpot Mensuel',
      icon: <Trophy className="w-6 h-6" />,
      prize: '3 Bitcoin',
      prizeEur: '≈ 285,000€',
      drawDate: 'vendredi 1 août à 22:14',
      ticketPrice: 89.99,
      maxParticipants: 5000,
      currentParticipants: 1247,
      countdown: { days: 16, hours: 9, minutes: 54, seconds: 17 },
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  };

  const questions: Question[] = [
    {
      id: '1',
      question: 'Quel est le nombre maximum de Bitcoin qui pourront jamais exister ?',
      options: ['18 millions', '21 millions', '25 millions', '30 millions'],
      correctAnswer: 1,
      explanation: 'Bitcoin a une limite fixe de 21 millions de coins, ce qui en fait une monnaie déflationniste par design.'
    },
    {
      id: '2',
      question: 'Qui est le créateur pseudonyme de Bitcoin ?',
      options: ['Vitalik Buterin', 'Charlie Lee', 'Satoshi Nakamoto', 'Gavin Andresen'],
      correctAnswer: 2,
      explanation: 'Satoshi Nakamoto est le pseudonyme utilisé par la personne ou le groupe qui a créé Bitcoin en 2008.'
    },
    {
      id: '3',
      question: 'En quelle année Bitcoin a-t-il été lancé ?',
      options: ['2008', '2009', '2010', '2011'],
      correctAnswer: 1,
      explanation: 'Bitcoin a été lancé en janvier 2009 avec la création du premier bloc (bloc genesis).'
    },
    {
      id: '4',
      question: 'Qu\'est-ce qu\'un "halving" dans Bitcoin ?',
      options: [
        'Division du prix par deux',
        'Réduction de moitié de la récompense des mineurs',
        'Doublement de la difficulté',
        'Mise à jour du protocole'
      ],
      correctAnswer: 1,
      explanation: 'Le halving réduit de moitié la récompense accordée aux mineurs environ tous les 4 ans, contrôlant ainsi l\'inflation.'
    },
    {
      id: '5',
      question: 'Combien de temps faut-il en moyenne pour miner un bloc Bitcoin ?',
      options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'],
      correctAnswer: 1,
      explanation: 'Le réseau Bitcoin ajuste automatiquement la difficulté pour maintenir un temps de bloc moyen de 10 minutes.'
    }
  ];

  const currentLottery = lotteries[selectedLottery];
  const currentQuestion = questions[currentQuestionIndex];

  // Initialiser une question aléatoirement au chargement
  React.useEffect(() => {
    setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
  }, []);

  const steps = [
    { id: 1, name: 'Sélection du ticket', shortName: 'Sélection' },
    { id: 2, name: 'Challenge', shortName: 'Challenge' },
    { id: 3, name: 'Finalisation', shortName: 'Finalisation' }
  ];

  const getReduction = (count: number): number => {
    if (count >= 50) return 25;
    if (count >= 25) return 20;
    if (count >= 20) return 15;
    if (count >= 15) return 10;
    return 0;
  };

  const calculateTotal = () => {
    const basePrice = currentLottery.ticketPrice * ticketCount;
    const reduction = getReduction(ticketCount);
    const discount = (basePrice * reduction) / 100;
    return {
      basePrice,
      reduction,
      discount,
      finalPrice: basePrice - discount
    };
  };

  const { basePrice, reduction, discount, finalPrice } = calculateTotal();

  const handleTicketChange = (newCount: number) => {
    if (newCount >= 1 && newCount <= 100) {
      setTicketCount(newCount);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setIsCorrect(answerIndex === currentQuestion.correctAnswer);
  };

  const handleContinueFromChallenge = () => {
    if (isCorrect) {
      setCurrentStep(3);
    }
  };

  const handleRetryQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    // Générer une nouvelle question aléatoire pour le retry
    setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
  };

  const validateGuestInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!guestInfo.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!guestInfo.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(guestInfo.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!guestInfo.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (guestInfo.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (guestInfo.password !== guestInfo.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!guestInfo.country) {
      newErrors.country = 'Le pays est requis';
    }

    if (!guestInfo.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    if (!guestInfo.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    }

    if (!guestInfo.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!guestInfo.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === 'card') {
      if (!cardInfo.number.trim()) {
        newErrors.cardNumber = 'Numéro de carte requis';
      }
      if (!cardInfo.expiry.trim()) {
        newErrors.expiry = 'Date d\'expiration requise';
      }
      if (!cardInfo.cvv.trim()) {
        newErrors.cvv = 'CVV requis';
      }
      if (!cardInfo.name.trim()) {
        newErrors.cardName = 'Nom sur la carte requis';
      }
    }
    // Apple Pay n'a pas besoin de validation supplémentaire

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalPurchase = async () => {
    if (!isAuthenticated && !validateGuestInfo()) return;
    if (!validatePayment()) return;

    setIsProcessing(true);

    // Simulation du traitement de paiement
    setTimeout(() => {
      // Générer les numéros de tickets
      const ticketNumbers = Array.from({ length: ticketCount }, (_, i) => 
        `${selectedLottery === 'weekly' ? 'JKP' : 'MJP'}-2024-${(Math.floor(Math.random() * 999999) + 100000).toString().padStart(6, '0')}`
      );

      // Ajouter les tickets à l'utilisateur connecté
      if (isAuthenticated && user) {
        const lotteryData = {
          name: currentLottery.name,
          prize: currentLottery.prize,
          prizeEur: currentLottery.prizeEur,
          ticketPrice: currentLottery.ticketPrice,
          nextDrawDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() // Dans 4 jours
        };
        
        addTickets(selectedLottery as 'jackpot' | 'megaJackpot', ticketCount, lotteryData);
      }

      // Préparer les données de confirmation
      const confirmationData = {
        lotteryType: selectedLottery as 'jackpot' | 'megaJackpot',
        lotteryName: currentLottery.name,
        ticketCount,
        ticketPrice: currentLottery.ticketPrice,
        originalAmount: basePrice.toFixed(2),
        finalAmount: finalPrice.toFixed(2),
        discount: reduction,
        savings: discount.toFixed(2),
        paymentMethod: paymentMethod === 'card' ? 'Carte bancaire' : 'Apple Pay',
        nextDrawDate: currentLottery.drawDate,
        drawTime: '20h00 UTC',
        prize: currentLottery.prize,
        prizeEur: currentLottery.prizeEur,
        transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        ticketNumbers,
        userInfo: isAuthenticated ? {
          name: user?.name || '',
          email: user?.email || ''
        } : {
          name: guestInfo.name,
          email: guestInfo.email
        }
      };

      setIsProcessing(false);
      navigate('/payment-confirmation', { state: { confirmationData } });
    }, 2000);
  };

  const quickSelectButtons = [1, 5, 10, 15, 20, 25, 50];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Ticket Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez vos tickets</h3>
              
              {/* Ticket Counter */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => handleTicketChange(ticketCount - 1)}
                  disabled={ticketCount <= 1}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                
                <div className="text-6xl font-bold text-gray-900 min-w-[120px] text-center">
                  {ticketCount}
                </div>
                
                <button
                  onClick={() => handleTicketChange(ticketCount + 1)}
                  disabled={ticketCount >= 100}
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Select Buttons with Reductions */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mb-8">
                {quickSelectButtons.map((count) => {
                  const reductionPercent = getReduction(count);
                  return (
                    <div key={count} className="text-center">
                      <button
                        onClick={() => handleTicketChange(count)}
                        className={`w-full py-3 px-2 rounded-lg font-semibold transition-colors ${
                          ticketCount === count
                            ? 'bg-black text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        {count}
                      </button>
                      {reductionPercent > 0 && (
                        <div className="mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          -{reductionPercent}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chances */}
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-semibold text-blue-900">Vos chances de gagner</h4>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                1 / {Math.floor(currentLottery.maxParticipants / ticketCount)}
              </div>
              <div className="text-sm text-blue-700 mt-1">
                Avec {ticketCount} ticket{ticketCount > 1 ? 's' : ''}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {ticketCount} ticket{ticketCount > 1 ? 's' : ''} × {currentLottery.ticketPrice}€
                  </span>
                  <span className="font-semibold">{basePrice.toFixed(2)}€</span>
                </div>
                
                {reduction > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Réduction (-{reduction}%)</span>
                    <span>-{discount.toFixed(2)}€</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{finalPrice.toFixed(2)}€</span>
                  </div>
                  {reduction > 0 && (
                    <div className="text-sm text-green-600 text-right">
                      Vous économisez {discount.toFixed(2)}€
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-black text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Continuer
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Challenge Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bitcoin className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Challenge Bitcoin</h3>
                <p className="text-gray-600">
                  Répondez correctement à cette question pour valider votre participation
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {currentQuestion.question}
                  </h4>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? showResult
                              ? index === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-green-50 text-green-800'
                                : 'border-red-500 bg-red-50 text-red-800'
                              : 'border-orange-500 bg-orange-50'
                            : showResult && index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-800'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index && showResult
                              ? index === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-green-500'
                                : 'border-red-500 bg-red-500'
                              : showResult && index === currentQuestion.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                          }`}>
                            {showResult && (
                              (selectedAnswer === index && index === currentQuestion.correctAnswer) ||
                              (selectedAnswer !== index && index === currentQuestion.correctAnswer)
                            ) ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer ? (
                              <X className="w-4 h-4 text-white" />
                            ) : null}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className={`rounded-xl p-6 mb-6 ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                      ) : (
                        <X className="w-6 h-6 text-red-500 mt-1" />
                      )}
                      <div>
                        <h5 className={`font-semibold mb-2 ${
                          isCorrect ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {isCorrect ? 'Bonne réponse !' : 'Réponse incorrecte'}
                        </h5>
                        <p className={`text-sm ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {showResult && (
                  <div className="flex gap-4">
                    {!isCorrect && (
                      <button
                        onClick={handleRetryQuestion}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Réessayer
                      </button>
                    )}
                    {isCorrect && (
                      <button
                        onClick={handleContinueFromChallenge}
                        className="flex-1 bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      >
                        Continuer vers le paiement
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Guest Information (if not authenticated) */}
            {!isAuthenticated && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h3>
                
                <div className="space-y-6">
                  {/* Nom et Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={guestInfo.name}
                          onChange={(e) => setGuestInfo(prev => ({ ...prev, name: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={guestInfo.email}
                          onChange={(e) => setGuestInfo(prev => ({ ...prev, email: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="votre@email.com"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Pays et Téléphone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pays *
                      </label>
                      <select
                        value={guestInfo.country}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, country: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.country ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
                          <span className="text-sm font-medium text-gray-700">
                            {selectedCountry.flag} {selectedCountry.dialCode}
                          </span>
                        </div>
                        <input
                          type="tel"
                          value={guestInfo.phone}
                          onChange={(e) => setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="123456789"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      value={guestInfo.address}
                      onChange={(e) => setGuestInfo(prev => ({ ...prev, address: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="123 Rue de la Paix"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  {/* Code postal et Ville */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        value={guestInfo.postalCode}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.postalCode ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="75001"
                      />
                      {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        value={guestInfo.city}
                        onChange={(e) => setGuestInfo(prev => ({ ...prev, city: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.city ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Paris"
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                  </div>

                  {/* Mots de passe */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={guestInfo.password}
                          onChange={(e) => setGuestInfo(prev => ({ ...prev, password: e.target.value }))}
                          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.password ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le mot de passe *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          value={guestInfo.confirmPassword}
                          onChange={(e) => setGuestInfo(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Méthode de paiement</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-6 h-6 ${
                      paymentMethod === 'card' ? 'text-orange-500' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <div className="font-semibold">Carte bancaire</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 flex items-center justify-center ${
                      paymentMethod === 'applepay' ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Apple Pay</div>
                      <div className="text-sm text-gray-600">Paiement sécurisé</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de carte *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiration *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.expiry ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="MM/AA"
                      />
                      {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                          errors.cvv ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom sur la carte *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.name}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                        errors.cardName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Nom comme sur la carte"
                    />
                    {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Apple Pay</h3>
                  <p className="text-gray-600 mb-6">
                    Payez rapidement et en toute sécurité avec Touch ID ou Face ID
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      Votre paiement sera traité de manière sécurisée via Apple Pay. 
                      Aucune information de carte n'est partagée avec BitWin.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Final Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Récapitulatif final</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Loterie :</span>
                  <span className="font-semibold">{currentLottery.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Nombre de tickets :</span>
                  <span className="font-semibold">{ticketCount}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Pays :</span>
                  <span className="font-semibold">{selectedCountry.flag} {selectedCountry.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Prix unitaire :</span>
                  <span className="font-semibold">{currentLottery.ticketPrice}€</span>
                </div>
                {reduction > 0 && (
                  <>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-600">Sous-total :</span>
                      <span className="line-through text-gray-500">{basePrice.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-green-600">Réduction ({reduction}%) :</span>
                      <span className="text-green-600 font-semibold">-{discount.toFixed(2)}€</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">Méthode de paiement :</span>
                  <span className="font-semibold">
                    {paymentMethod === 'card' ? 'Carte bancaire' : 'Apple Pay'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xl font-bold text-gray-900">Total à payer :</span>
                  <span className="text-2xl font-bold text-orange-500">{finalPrice.toFixed(2)}€</span>
                </div>
              </div>
            </div>

            {/* Purchase Button */}
            <button
              onClick={handleFinalPurchase}
              disabled={isProcessing}
              className="w-full bg-black text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  Finaliser l'achat
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="text-sm text-green-700">
                  <p className="font-medium mb-1">Paiement sécurisé</p>
                  <p>Vos informations sont protégées par un chiffrement SSL 256-bit et ne sont jamais stockées sur nos serveurs.</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            {/* Desktop Progress Bar */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200">
                  <div 
                    className="h-full bg-black transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>
                
                {/* Steps */}
                <div className="relative flex justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                      {/* Step Circle */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        step.id <= currentStep
                          ? 'bg-black border-black text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        {step.id < currentStep ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span className="font-bold">{step.id}</span>
                        )}
                      </div>
                      
                      {/* Step Label */}
                      <div className="mt-3 text-center">
                        <div className={`font-semibold transition-colors duration-300 ${
                          step.id === currentStep ? 'text-black' : 'text-gray-400'
                        }`}>
                          {step.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  Étape {currentStep} sur {steps.length}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {steps[currentStep - 1].name}
                </div>
              </div>
              
              {/* Mobile Progress Line */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-black h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Mobile Steps Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      step.id <= currentStep ? 'bg-black' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Selected Lottery (only on step 1) */}
          {currentStep === 1 && (
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                {/* Header with icon and title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${currentLottery.bgColor}`}>
                    <div className={currentLottery.color}>
                      {currentLottery.icon}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentLottery.name}
                  </h2>
                </div>

                {/* Prize */}
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-gray-900 mb-2">
                    {currentLottery.prize}
                  </div>
                  <div className="text-xl text-gray-600">
                    {currentLottery.prizeEur}
                  </div>
                </div>

                {/* Draw date */}
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 mb-1">Prochain tirage</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {currentLottery.drawDate}
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-6">
                  <div className="text-center text-sm text-gray-500 mb-3">Temps restant</div>
                  <div className="flex justify-center gap-2">
                    {Object.entries(currentLottery.countdown).map(([unit, value]) => (
                      <div key={unit} className="text-center">
                        <div className="w-12 h-12 bg-black text-white text-lg font-bold rounded-lg flex items-center justify-center">
                          {value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 capitalize">
                          {unit === 'days' ? 'Jours' : 
                           unit === 'hours' ? 'Heures' : 
                           unit === 'minutes' ? 'Minutes' : 'Secondes'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Participants :</span>
                    <span className="font-semibold">{currentLottery.currentParticipants} tickets vendus</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        selectedLottery === 'weekly' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(currentLottery.currentParticipants / currentLottery.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Ticket info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-500">Prix du ticket</div>
                    <div className="text-2xl font-bold text-gray-900">{currentLottery.ticketPrice}€</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Participants max</div>
                    <div className="text-2xl font-bold text-gray-900">{currentLottery.maxParticipants}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Column - Step Content */}
          <div className={currentStep === 1 ? '' : 'lg:col-span-2'}>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;