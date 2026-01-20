import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Trophy, Clock, Ticket, User, Bitcoin, ArrowRight, Copy, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Countdown from '../components/Countdown';
import PurchaseButton from '../components/PurchaseButton';

interface PaymentConfirmationData {
  lotteryType: 'jackpot' | 'megaJackpot';
  lotteryName: string;
  ticketCount: number;
  ticketPrice: number;
  originalAmount: string;
  finalAmount: string;
  discount: number;
  savings: string;
  paymentMethod: string;
  nextDrawDate: string;
  drawTime: string;
  prize: string;
  prizeEur: string;
  transactionId: string;
  ticketNumbers: string[];
}

const PaymentConfirmation: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationData, setConfirmationData] = useState<PaymentConfirmationData | null>(null);

  useEffect(() => {
    // Récupérer les données de confirmation depuis l'état de navigation
    const data = location.state?.confirmationData;
    if (data) {
      setConfirmationData(data);
    } else {
      // Si pas de données, rediriger vers l'accueil
      navigate('/');
    }
  }, [location.state, navigate]);

  const copyTransactionId = () => {
    if (confirmationData?.transactionId) {
      navigator.clipboard.writeText(confirmationData.transactionId);
    }
  };

  const shareSuccess = () => {
    if (navigator.share && confirmationData) {
      navigator.share({
        title: 'BitWin - Achat confirmé !',
        text: `Je viens d'acheter ${confirmationData.ticketCount} ticket${confirmationData.ticketCount > 1 ? 's' : ''} pour le ${confirmationData.lotteryName} ! 🎉`,
        url: window.location.origin
      });
    }
  };

  if (!confirmationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de confirmation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Paiement Confirmé !
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Félicitations {user?.name} ! Votre achat a été traité avec succès. 
            Vous participez maintenant au prochain tirage !
          </p>
        </div>

        {/* Layout 2 colonnes */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne gauche - Détails de l'achat */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-black mb-6">Détails de votre achat</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Nombre de tickets :</span>
                <span className="text-2xl font-bold text-black">{confirmationData.ticketCount}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Prix par ticket :</span>
                <span className="font-semibold text-lg text-black">{confirmationData.ticketPrice}€</span>
              </div>
              
              {confirmationData.discount > 0 && (
                <>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Sous-total :</span>
                    <span className="line-through text-gray-500">{confirmationData.originalAmount}€</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-green-600 font-medium">Réduction ({confirmationData.discount}%) :</span>
                    <span className="text-green-600 font-semibold">-{confirmationData.savings}€</span>
                  </div>
                </>
              )}
              
              <div className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Méthode de paiement :</span>
                <span className="font-semibold text-black">{confirmationData.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between items-start py-4 border-b border-gray-100">
                <span className="text-gray-600 font-medium">ID de transaction :</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm bg-gray-100 px-3 py-2 rounded-lg">
                    {confirmationData.transactionId.substring(0, 12)}...
                  </span>
                  <button
                    onClick={copyTransactionId}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-4">
                <span className="text-xl font-bold text-black">Total payé :</span>
                <div className="text-right">
                  <div className="text-3xl font-bold text-orange-500">{confirmationData.finalAmount}€</div>
                  {confirmationData.discount > 0 && (
                    <div className="text-sm text-green-600">
                      Économie : {confirmationData.savings}€
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Numéros de tickets */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Ticket className="w-5 h-5" />
                <span className="font-medium">Vos numéros de tickets :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {confirmationData.ticketNumbers.map((number, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg text-sm font-mono"
                  >
                    {number}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite - Prochain tirage */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              {confirmationData.lotteryType === 'jackpot' ? (
                <Calendar className="w-6 h-6 text-orange-500" />
              ) : (
                <Trophy className="w-6 h-6 text-yellow-600" />
              )}
              <h3 className="text-2xl font-bold text-black">Prochain tirage</h3>
            </div>
            
            {/* Prix du jackpot */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-black mb-2">
                {confirmationData.prize}
              </div>
              <div className="text-xl text-gray-600">
                {confirmationData.prizeEur}
              </div>
            </div>

            {/* Date et heure */}
            <div className="text-center mb-8">
              <div className="text-lg font-semibold text-black mb-2">
                {confirmationData.nextDrawDate}
              </div>
              <div className="text-gray-600">{confirmationData.drawTime}</div>
            </div>
            
            {/* Countdown */}
            <div className="mb-8">
              <Countdown 
                targetDate={new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()} 
                title="Temps restant"
                size="small"
              />
            </div>

            {/* Information importante */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Bitcoin className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Gains automatiques</h4>
                  <p className="text-green-700 text-sm">
                    En cas de victoire, vos Bitcoin seront transférés dans les 30 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-action final */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Tout est prêt !
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu peux maintenant suivre le tirage dans ton compte et consulter l'historique 
            de tes participations à tout moment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Link
              to="/dashboard"
              className="flex-1 w-full px-8 py-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors font-semibold text-center flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Accéder à mon compte
            </Link>

            <button
              onClick={shareSuccess}
              className="flex-1 w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Partager
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentConfirmation;