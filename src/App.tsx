import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { BackupProvider } from './contexts/BackupContext';
import { LotteryProvider } from './contexts/LotteryContext';
import AgeVerificationModal from './components/AgeVerificationModal';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import HowItWorks from './pages/HowItWorks';
import PurchasePage from './pages/PurchasePage';
import FAQ from './pages/FAQ';
import NewsPage from './pages/NewsPage';
import Contact from './pages/Contact';
import AcceptableUsePolicy from './pages/AcceptableUsePolicy';
import TermsConditions from './pages/TermsConditions';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundCancellationPolicy from './pages/RefundCancellationPolicy';
import DrawsPage from './pages/DrawsPage';
import PaymentConfirmation from './pages/PaymentConfirmation';

// Composant pour gérer le scroll vers le haut lors des changements de route
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
function App() {
  const [showAgeVerification, setShowAgeVerification] = React.useState(false);
  const [isAgeVerified, setIsAgeVerified] = React.useState(false);

  React.useEffect(() => {
    // Vérifier si l'âge a déjà été vérifié
    const ageVerified = localStorage.getItem('ageVerified');
    const verificationDate = localStorage.getItem('ageVerifiedDate');
    
    if (ageVerified === 'true' && verificationDate) {
      // Vérifier si la vérification n'est pas trop ancienne (30 jours)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      if (new Date(verificationDate) > thirtyDaysAgo) {
        setIsAgeVerified(true);
      } else {
        // Vérification expirée, redemander
        localStorage.removeItem('ageVerified');
        localStorage.removeItem('ageVerifiedDate');
        setShowAgeVerification(true);
      }
    } else {
      // Première visite ou vérification manquante
      setShowAgeVerification(true);
    }
  }, []);

  const handleAgeVerified = () => {
    setShowAgeVerification(false);
    setIsAgeVerified(true);
  };

  const handleAgeRejected = () => {
    // Rediriger vers Google ou afficher un message de blocage
    window.location.href = 'https://www.google.com';
  };

  return (
    <LanguageProvider>
      <LotteryProvider>
        <AuthProvider>
          <BackupProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen gradient-bg flex flex-col">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/register" element={<Auth />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/purchase" element={<PurchasePage />} />
                    <Route path="/draws" element={<DrawsPage />} />
                    <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute adminOnly>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    {/* Placeholder routes for footer links */}
                    <Route path="/acceptable-use" element={<AcceptableUsePolicy />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/return-policy" element={<ReturnPolicy />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/refund-cancellation" element={<RefundCancellationPolicy />} />
                    <Route path="/security" element={<div className="p-8 text-center">Page de sécurité en construction</div>} />
                    <Route path="/winners" element={<div className="p-8 text-center">Page des gagnants en construction</div>} />
                  </Routes>
                </main>
                <Footer />
              </div>
              
              {/* Modal de vérification d'âge par-dessus le contenu */}
              <AgeVerificationModal
                isOpen={showAgeVerification}
                onVerified={handleAgeVerified}
                onRejected={handleAgeRejected}
              />
            </Router>
          </BackupProvider>
        </AuthProvider>
      </LotteryProvider>
    </LanguageProvider>
  );
}

export default App;