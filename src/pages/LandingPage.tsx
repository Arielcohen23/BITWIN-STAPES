import { Bitcoin, Calendar, Trophy, Clock, ArrowRight, Users, Shield, TrendingUp, Zap, ChevronLeft, ChevronRight, Star, CheckCircle, Ticket, Scale, Eye, DollarSign, HelpCircle } from 'lucide-react';
import NewsCarousel from '../components/NewsCarousel';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from '../components/Countdown';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleParticipateNow = () => {
    navigate('/purchase');
    window.scrollTo(0, 0);
  };

  const handleParticipateJackpot = () => {
    navigate('/purchase', { state: { preselectedLottery: 'jackpot' } });
    window.scrollTo(0, 0);
  };

  const handleParticipateMegaJackpot = () => {
    navigate('/purchase', { state: { preselectedLottery: 'megaJackpot' } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {/* Bloc 1 - Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre principal */}
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-8 leading-tight">
            Gagnez jusqu'à <span className="text-orange-500">3 BITCOIN</span> à
            <br />
            partir de 50,00 €
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Participez à la première compétition Bitcoin transparente et
            équitable. Des tirages hebdomadaires et mensuels avec des
            récompenses pouvant atteindre 3 Bitcoin.
          </p>
          
          {/* Bouton principal */}
          <button 
            onClick={handleParticipateNow}
            className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition-colors mb-16"
          >
            <Ticket className="w-5 h-5" />
            Participer maintenant
            <ArrowRight className="w-5 h-5" />
          </button>
          
          {/* Texte de confiance */}
          <div className="space-y-6">
            <p className="text-black text-xl font-bold">
              Le jeu sans compromis
            </p>
            
            {/* Trois piliers avec icônes */}
            <div className="flex items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium">Équitable</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium">Vérifiable</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-gray-700 font-medium">Sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 2 - Nos Tirages en Cours */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <p className="bg-orange-500 text-white text-lg tracking-wider uppercase mb-4 inline-block px-6 py-2">
                NOS TIRAGES EN COURS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                Découvrez les tirages ouverts en ce moment
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Deux compétitions Bitcoin exclusives avec des tirages impartiaux et transparents
              </p>
            </div>
          </div>

          {/* Grille des tirages */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Tirage Hebdomadaire */}
            <div className="bg-white border border-gray-200 overflow-hidden flex flex-col h-full">
              <div className="p-8 flex-1 flex flex-col">
                {/* Badge */}
                <div className="mb-6">
                  <span className="bg-orange-500 text-white text-sm font-bold px-4 py-2 tracking-wider">
                    HEBDOMADAIRE
                  </span>
                </div>

                {/* Prix principal */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-black mb-2">1 BTC</div>
                  <div className="text-xl text-gray-600 mb-4">≈ 95 000 €</div>
                  <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
                </div>

                {/* Détails */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Prix du ticket</span>
                    <span className="font-bold text-black text-lg">50 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tickets maximum</span>
                    <span className="font-bold text-black text-lg">3 000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Vos chances</span>
                    <span className="font-bold text-orange-500 text-lg">1/3 000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Fréquence</span>
                    <span className="font-bold text-black text-lg">Dimanche 20h00 UTC</span>
                  </div>
                </div>

                {/* Timer */}
                <div className="mb-6 flex-1">
                  <Countdown 
                    targetDate={new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString()} 
                    title="Prochain tirage dans"
                    size="small"
                  />
                </div>

                {/* Bouton */}
                <button 
                  onClick={handleParticipateJackpot}
                  className="w-full bg-orange-500 text-white font-bold py-4 hover:bg-orange-600 transition-colors mt-auto"
                >
                  Participer maintenant
                </button>
              </div>
            </div>

            {/* Méga Jackpot Mensuel */}
            <div className="bg-black text-white border-2 border-black overflow-hidden flex flex-col h-full">
              <div className="p-8 flex-1 flex flex-col">
                {/* Badge */}
                <div className="mb-6">
                  <span className="bg-orange-500 text-white text-sm font-bold px-4 py-2 tracking-wider">
                    MÉGA JACKPOT
                  </span>
                </div>

                {/* Prix principal */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-white mb-2">3 BTC</div>
                  <div className="text-xl text-gray-300 mb-4">≈ 285 000 €</div>
                  <div className="w-16 h-1 bg-orange-500 mx-auto"></div>
                </div>

                {/* Détails */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Prix du ticket</span>
                    <span className="font-bold text-white text-lg">80 €</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Tickets maximum</span>
                    <span className="font-bold text-white text-lg">5 000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-300">Vos chances</span>
                    <span className="font-bold text-orange-500 text-lg">1/5 000</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Fréquence</span>
                    <span className="font-bold text-white text-lg">1er du mois 20h00 UTC</span>
                  </div>
                </div>

                {/* Timer */}
                <div className="mb-6 flex-1">
                  <Countdown 
                    targetDate={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()} 
                    title="Prochain tirage dans"
                    size="small"
                  />
                </div>

                {/* Bouton */}
                <button 
                  onClick={handleParticipateMegaJackpot}
                  className="w-full bg-orange-500 text-white font-bold py-4 hover:bg-orange-600 transition-colors mt-auto"
                >
                  Participer maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 3 - Pourquoi BitWin */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Titre secondaire */}
          <div className="mb-8">
            <p className="bg-orange-500 text-white text-lg tracking-wider uppercase mb-4 inline-block px-6 py-2">
              POURQUOI BITWIN
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Une solution qui convient à tous
            </h2>
          </div>
          
          {/* Description principale */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Que vous soyez expert en Bitcoin ou simplement curieux, notre compétition 
            est conçue pour vous offrir une expérience unique
          </p>
          
          {/* Grille des profils utilisateurs */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Expert Bitcoin */}
            <div className="bg-white p-8 border border-gray-300 hover:border-orange-500 transition-all duration-300 hover:shadow-lg">
              <div className="w-20 h-20 bg-orange-500 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Je suis...</p>
              <h3 className="text-2xl font-bold text-black mb-6">Expert Bitcoin ↗</h3>
              <p className="text-gray-600 leading-relaxed">
                Pour découvrir une nouvelle expérience ludique autour du Bitcoin avec un format unique et transparent.
              </p>
              <button 
                onClick={handleParticipateNow}
                className="mt-4 px-4 py-1 bg-black text-white font-bold hover:bg-gray-800 transition-colors text-sm"
              >
                Participer
              </button>
            </div>

            {/* Curieux débutant */}
            <div className="bg-white p-8 border border-gray-300 hover:border-orange-500 transition-all duration-300 hover:shadow-lg">
              <div className="w-20 h-20 bg-gray-800 flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Je suis...</p>
              <h3 className="text-2xl font-bold text-black mb-6">Curieux débutant ↗</h3>
              <p className="text-gray-600 leading-relaxed">
                Pour découvrir l'univers Bitcoin de manière simple et interactive, sans complexité technique.
              </p>
              <button 
                onClick={handleParticipateNow}
                className="mt-4 px-4 py-1 bg-black text-white font-bold hover:bg-gray-800 transition-colors text-sm"
              >
                Participer
              </button>
            </div>

            {/* Joueur stratégique */}
            <div className="bg-white p-8 border border-gray-300 hover:border-orange-500 transition-all duration-300 hover:shadow-lg">
              <div className="w-20 h-20 bg-gray-600 flex items-center justify-center mx-auto mb-6">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-4">Je suis...</p>
              <h3 className="text-2xl font-bold text-black mb-6">Joueur stratégique ↗</h3>
              <p className="text-gray-600 leading-relaxed">
                Pour participer à une expérience 100% transparente où stratégie et chance se rencontrent.
              </p>
              <button 
                onClick={handleParticipateNow}
                className="mt-4 px-4 py-1 bg-black text-white font-bold hover:bg-gray-800 transition-colors text-sm"
              >
                Participer
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* Bloc 4 - Fonctionnement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="bg-orange-500 text-white text-lg tracking-wider uppercase mb-6 inline-block px-6 py-2">
              FONCTIONNEMENT
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Comment participer en 4 étapes simples
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Un parcours de participation simplifié et transparent pour maximiser vos chances de gagner du Bitcoin
            </p>
          </div>

          {/* Timeline avec étapes - Design amélioré */}
          <div className="relative max-w-5xl mx-auto">
            {/* Ligne de connexion orange continue */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-orange-500 hidden lg:block"></div>
            
            {/* Grille des étapes avec espacement parfait */}
            <div className="grid lg:grid-cols-4 gap-0 relative">
              {/* Étape 1 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg mb-4">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center mx-auto font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Sélectionnez votre tirage</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Jackpot hebdomadaire (1 BTC) ou Méga Jackpot mensuel (3 BTC)
                </p>
              </div>

              {/* Étape 2 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg mb-4">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center mx-auto font-bold text-lg">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Répondez à une question</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Répondez à une question de culture générale pour valider votre participation
                </p>
              </div>

              {/* Étape 3 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg mb-4">
                    <Shield className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center mx-auto font-bold text-lg">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Participez en toute sécurité</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Notre partenaire Randomdraws utilise un générateur de nombres aléatoires tiers pour une sélection des gagnants impartiale et sécurisée
                </p>
              </div>

              {/* Étape 4 */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg mb-4">
                    <Bitcoin className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center mx-auto font-bold text-lg">
                    4
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Recevez vos gains</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Recevez vos gains en Bitcoin directement sur votre portefeuille en moins de 30 minutes
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <button 
              onClick={handleParticipateNow}
              className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-colors"
            >
              PARTICIPER MAINTENANT
              <Bitcoin className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Bloc 5 - Nos Tirages */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <p className="bg-orange-500 text-white text-lg tracking-wider uppercase mb-4 inline-block px-6 py-2">
                NOS TIRAGES
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                Tirages Certifiés et Vérifiables
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                Une transparence totale pour chaque résultat
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6" fill="white"/>
                    <circle cx="12" cy="12" r="2" fill="black"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-black">randomdraws.com</span>
                <span className="text-sm text-gray-600">by TPAL</span>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche - Texte et avantages */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Nous utilisons la technologie de pointe de randomdraws.com 
                pour sélectionner aléatoirement les gagnants de nos tirages en 
                conformité avec les réglementations. Cela signifie que vous 
                pouvez avoir confiance que votre tirage sera impartial et 
                digne de confiance. Tirages contrôlés et publiés sur 
                RandomDraws.com pour vérification publique.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Système TPAL Certifié</h3>
                    <p className="text-gray-600">Third Party Audited Lottery pour une équité garantie</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Certificats Publics</h3>
                    <p className="text-gray-600">Chaque tirage génère un certificat vérifiable</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Blockchain Bitcoin</h3>
                    <p className="text-gray-600">Utilise les hash des blocs comme source d'aléatoire</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Transparence Totale</h3>
                    <p className="text-gray-600">Tous les résultats sont publiquement vérifiables</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Certificat mockup */}
            <div className="flex justify-center">
              <div className="bg-black p-6 max-w-md w-full shadow-2xl">
                {/* Header du certificat */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="6" fill="white"/>
                        <circle cx="12" cy="12" r="2" fill="black"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">randomdraws.com</div>
                      <div className="text-gray-400 text-xs">by TPAL</div>
                    </div>
                  </div>
                  <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    CERTIFICAT EXEMPLE
                  </div>
                </div>

                {/* Titre du certificat */}
                <div className="text-center mb-6">
                  <h3 className="text-white font-bold text-lg mb-2">
                    CERTIFICATE OF RANDOM DRAW
                  </h3>
                </div>

                {/* Détails du tirage */}
                <div className="space-y-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-300 mb-1">This certificate states that the draw named</p>
                    <p className="text-white font-bold">BITWIN JACKPOT HEBDOMADAIRE</p>
                    <p className="text-gray-300 mt-2 mb-1">for the organisation</p>
                    <p className="text-white font-bold">BITWIN</p>
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="text-center">
                      <p className="text-gray-300 mb-1">occurred at</p>
                      <p className="text-white font-bold text-base">18:12 (6:12 PM) on 15 Jan 2025</p>
                      <p className="text-gray-400 text-xs">(Europe/Paris time)</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-600 pt-4">
                    <div className="text-center">
                      <p className="text-gray-300 mb-1">Winner selected:</p>
                      <p className="text-white font-bold">Entry #1,847</p>
                      <p className="text-gray-400 text-xs">from 3,000 total entries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold text-lg hover:bg-gray-800 transition-colors">
              VÉRIFIER UN CERTIFICAT
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Bloc 6 - BitWin en Chiffres */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <p className="bg-orange-500 text-white text-lg tracking-wider uppercase mb-4 inline-block px-6 py-2">
                BITWIN EN CHIFFRES
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                Des données claires qui parlent d'elles-mêmes
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Des indicateurs concrets pour une plateforme fiable, rapide et engagée.
              </p>
            </div>
          </div>

          {/* Grille des statistiques */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Carte 1 - Maximum par mois */}
            <div className="bg-white border border-gray-200 p-8 text-center hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-colors">
                  <Bitcoin className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="mb-4">
                <div className="text-5xl font-bold text-black mb-2">4</div>
                <div className="text-2xl font-bold text-black mb-3">Bitcoin</div>
              </div>
              <div className="text-lg font-semibold text-black mb-4">Maximum par mois</div>
              <p className="text-orange-500 font-medium text-sm">1 BTC/semaine + 3 BTC/mois</p>
            </div>

            {/* Carte 2 - Transparence */}
            <div className="bg-white border border-gray-200 p-8 text-center hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-colors">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="text-5xl font-bold text-black mb-4">100%</div>
              <div className="text-lg font-semibold text-black mb-4">Transparence garantie</div>
              <p className="text-blue-500 font-medium text-sm">Système TPAL certifié</p>
            </div>

            {/* Carte 3 - Réception des gains */}
            <div className="bg-white border border-gray-200 p-8 text-center hover:border-orange-500 transition-all duration-300 hover:shadow-lg group">
              <div className="mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-200 transition-colors">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-5xl font-bold text-black mb-4">30min</div>
              <div className="text-lg font-semibold text-black mb-4">Réception des gains</div>
              <p className="text-green-500 font-medium text-sm">Transfert automatique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 7 - Suivi en Temps Réel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="bg-orange-500 text-white text-lg tracking-wider uppercase mb-6 inline-block px-6 py-2">
              SUIVI EN TEMPS RÉEL DE VOS TIRAGES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Un accès direct à l'historique et aux résultats depuis votre espace personnel
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Consultez vos tickets, résultats et preuves de tirage en toute transparence.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 font-bold text-sm">JM</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Bienvenue, Jean Martin</h3>
                    <p className="text-sm text-gray-600">Gérez vos tickets et suivez vos participations</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Tickets actifs</div>
                  <div className="text-2xl font-bold text-orange-500">7</div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Tickets Actifs</span>
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-black">7</div>
                  <div className="text-sm text-gray-500">Participent aux prochains tirages</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Historique</span>
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-black">23</div>
                  <div className="text-sm text-gray-500">Tirages passés</div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 font-medium">Gains Totaux</span>
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <Bitcoin className="w-3 h-3 text-orange-500" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-black">0.15</div>
                  <div className="text-sm text-gray-500">Bitcoin gagnés</div>
                </div>
              </div>

              {/* Tickets List Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-black">Tickets Actifs (7)</h4>
                  <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    Voir tout →
                  </button>
                </div>

                {/* Ticket Card 1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-black mb-1">Jackpot Hebdomadaire</h5>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Numéro :</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">JKP-2025-847392</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Acheté le 12 Jan 2025 à 14:30
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-black">1 Bitcoin</div>
                      <div className="text-sm text-gray-600">≈ 95,000€</div>
                      <div className="text-xs text-gray-500">50€ payé</div>
                      <span className="inline-block mt-2 px-2 py-1 bg-orange-50 text-orange-500 text-xs font-medium rounded-full border border-orange-200">
                        En cours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket Card 2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-black mb-1">Méga Jackpot Mensuel</h5>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Numéro :</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">MJP-2025-194857</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Acheté le 10 Jan 2025 à 09:15
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-black">3 Bitcoin</div>
                      <div className="text-sm text-gray-600">≈ 285,000€</div>
                      <div className="text-xs text-gray-500">80€ payé</div>
                      <span className="inline-block mt-2 px-2 py-1 bg-orange-50 text-orange-500 text-xs font-medium rounded-full border border-orange-200">
                        En cours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ticket Card 3 - Historique */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-black mb-1">Jackpot Hebdomadaire</h5>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>Numéro :</span>
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">JKP-2025-738291</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Tirage du 05 Jan 2025 à 20:00
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-black">1 Bitcoin</div>
                      <div className="text-sm text-gray-600">≈ 95,000€</div>
                      <div className="text-xs text-gray-500">50€ payé</div>
                      <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                        Non gagnant
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                  Accéder à mon espace personnel
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc 8 - Nos Gagnants */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ils ont gagné grâce à BitWin
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Découvrez les témoignages de nos gagnants Bitcoin
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="grid md:grid-cols-5 gap-4 px-16">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                  <CheckCircle className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-500 text-xs">Vérifié</span>
                </div>
                
                {/* Stats principales */}
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-500" />
                    <span className="text-lg font-bold text-black">3</span>
                    <span className="text-sm text-gray-600">tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                    <span className="text-xl font-bold text-orange-500">3 BTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">$285,000</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Marie C.</p>
                    <p className="text-gray-500 text-xs">il y a 4 jours</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                  <CheckCircle className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-500 text-xs">Vérifié</span>
                </div>
                
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-500" />
                    <span className="text-lg font-bold text-black">1</span>
                    <span className="text-sm text-gray-600">ticket</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                    <span className="text-xl font-bold text-orange-500">1 BTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">$95,000</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Pierre L.</p>
                    <p className="text-gray-500 text-xs">il y a 4 jours</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                  <CheckCircle className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-500 text-xs">Vérifié</span>
                </div>
                
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-500" />
                    <span className="text-lg font-bold text-black">15</span>
                    <span className="text-sm text-gray-600">tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                    <span className="text-xl font-bold text-orange-500">1 BTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">$95,000</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Sophie D.</p>
                    <p className="text-gray-500 text-xs">il y a 4 jours</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                  <CheckCircle className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-500 text-xs">Vérifié</span>
                </div>
                
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-500" />
                    <span className="text-lg font-bold text-black">8</span>
                    <span className="text-sm text-gray-600">tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                    <span className="text-xl font-bold text-orange-500">1 BTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">$95,000</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Marc R.</p>
                    <p className="text-gray-500 text-xs">il y a 5 jours</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-500 text-green-500" />
                  ))}
                  <CheckCircle className="w-4 h-4 text-gray-400 ml-2" />
                  <span className="text-gray-500 text-xs">Vérifié</span>
                </div>
                
                <div className="mb-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-500" />
                    <span className="text-lg font-bold text-black">2</span>
                    <span className="text-sm text-gray-600">tickets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                    <span className="text-xl font-bold text-orange-500">1 BTC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-green-600">$95,000</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">VO</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Vianney O.</p>
                    <p className="text-gray-500 text-xs">il y a 5 jours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trustpilot-style Rating */}
            <div className="text-center mt-8">
              <p className="text-white text-lg mb-2">
                Une note de <span className="font-bold">4.8 sur 5</span> sur la base de <span className="font-bold">2,847 avis</span>. Nos avis 4 et 5 étoiles.
              </p>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-6 h-6 fill-green-400 text-green-400" />
                <span className="text-white font-bold text-xl">BitWin</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              to="/winners"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Voir tous les gagnants
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bloc 9 - Actualités Crypto */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Actualités Bitcoin & Crypto
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Restez informé des dernières tendances des cryptomonnaies
            </p>
          </div>

          {/* Carrousel d'actualités */}
          <NewsCarousel />

          {/* CTA vers toutes les actualités */}
          <div className="text-center mt-12">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
            >
              <TrendingUp className="w-5 h-5" />
              Voir toutes les actualités
            </Link>
          </div>
        </div>
      </section>

      {/* Bloc 11 - Rareté Bitcoin */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Bitcoin Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-8 backdrop-blur-sm border border-orange-500/30">
            <Bitcoin className="w-10 h-10 text-orange-500" />
          </div>

          {/* Main Message */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Il n'y aura jamais plus de
            <span className="block text-orange-500 mt-2">21 millions de Bitcoin.</span>
          </h2>

          {/* Sub Message */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 font-light">
            Rejoignez les <span className="text-orange-500 font-bold">0,2 %</span> qui en possèdent un.
          </p>

          {/* Stats visuelles */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">21M</div>
              <div className="text-gray-400">Bitcoin maximum</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">19.8M</div>
              <div className="text-gray-400">Déjà minés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">0.2%</div>
              <div className="text-gray-400">Possèdent 1+ BTC</div>
            </div>
          </div>

          {/* Call to Action */}
          <Link
            to="/draws"
            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-1"
          >
            <Trophy className="w-6 h-6" />
            Choisir un tirage
            <ArrowRight className="w-6 h-6" />
          </Link>

          {/* Subtle note */}
          <p className="text-gray-500 text-sm mt-8 max-w-2xl mx-auto">
            Chaque Bitcoin gagné vous place dans une élite mondiale très restreinte. 
            Une opportunité unique de rejoindre les détenteurs Bitcoin.
          </p>
        </div>
      </section>

      {/* Bloc 9 - Introduction FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-orange-500" />
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Questions Fréquentes
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Trouvez rapidement les réponses aux questions les plus importantes
            </p>
          </div>

          {/* Questions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Question 1 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-black mb-3">
                Comment acheter des tickets ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connectez-vous, choisissez votre tirage, répondez à la question et payez. Vos tickets sont immédiatement validés.
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-black mb-3">
                Quand ont lieu les tirages ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jackpots chaque dimanche à 20h UTC. Méga Jackpots le 1er de chaque mois à 20h UTC.
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-black mb-3">
                Comment récupérer mes gains ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Paiement automatique en 30 minutes maximum. Bitcoin transférés directement sur votre wallet.
              </p>
            </div>

            {/* Question 4 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-black mb-3">
                Les tirages sont-ils équitables ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Système TPAL certifié avec randomdraws.com. Blockchain Bitcoin comme source d'aléatoire.
              </p>
            </div>

            {/* Question 5 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-black mb-3">
                Combien coûte un ticket ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                29,99€ pour le Jackpot, 89,99€ pour le Méga Jackpot. Réductions jusqu'à -25% selon la quantité.
              </p>
            </div>

            {/* Question 6 - Bonus pour équilibrer la grille */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-black mb-3">
                Puis-je acheter plusieurs tickets ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Oui, jusqu'à 50 tickets par transaction. Plus vous en achetez, plus vos chances augmentent.
              </p>
            </div>
          </div>

          {/* CTA vers FAQ complète */}
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Plus de 20 questions détaillées avec réponses complètes
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
            >
              <HelpCircle className="w-5 h-5" />
              Voir la FAQ complète
            </Link>
          </div>
        </div>
      </section>

      {/* Bloc 9 - Tarifs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-500">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block mb-6">
              <span className="text-white font-medium text-sm tracking-wide uppercase">
                CE QU'IL FAUT SAVOIR
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Pourquoi ces prix ?
            </h2>
            <div className="max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold text-white mb-4">Prix étudiés</h4>
              <p className="text-white/90 leading-relaxed text-lg">
                Nos tarifs sont établis pour maintenir un équilibre entre accessibilité et viabilité économique.
              </p>
            </div>
          </div>
          
          {/* Deux cartes côte à côte */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Carte Jackpot */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Jackpot</h3>
                  <h4 className="text-lg font-semibold text-white">Hebdomadaire</h4>
                  <p className="text-white/80 text-sm">1 Bitcoin à gagner</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-bold text-white">50€</div>
                  <div className="text-white/80 text-sm">par ticket</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-white/80">Fréquence :</span>
                  <div className="text-white font-medium">Chaque dimanche</div>
                </div>
                <div>
                  <span className="text-white/80">Participants :</span>
                  <div className="text-orange-300 font-medium">1 sur 3 000</div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4">
                <h5 className="text-white font-semibold mb-2">Avantages :</h5>
                <ul className="space-y-1 text-white/90 text-sm">
                  <li>• Tirages réguliers chaque semaine</li>
                  <li>• Excellentes probabilités de gain</li>
                  <li>• Prix accessible à tous</li>
                  <li>• Paiement rapide des gains</li>
                </ul>
              </div>
            </div>

            {/* Carte Méga Jackpot */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-300" />
                <div>
                  <h3 className="text-xl font-bold text-white">Méga Jackpot</h3>
                  <h4 className="text-lg font-semibold text-white">Mensuel</h4>
                  <p className="text-white/80 text-sm">3 Bitcoin à gagner</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-3xl font-bold text-white">80€</div>
                  <div className="text-white/80 text-sm">par ticket</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-white/80">Fréquence :</span>
                  <div className="text-white font-medium">1er du mois</div>
                </div>
                <div>
                  <span className="text-white/80">Participants :</span>
                  <div className="text-orange-300 font-medium">1 sur 5 000</div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4">
                <h5 className="text-white font-semibold mb-2">Avantages :</h5>
                <ul className="space-y-1 text-white/90 text-sm">
                  <li>• Gain exceptionnel de 3 Bitcoin</li>
                  <li>• Événement mensuel exclusif</li>
                  <li>• Potentiel de gain maximal</li>
                  <li>• Prestige du grand gagnant</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section Combien ça coûte */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Combien ça coûte ?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Des prix accessibles pour participer aux plus gros jackpots Bitcoin
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {/* Jackpot Hebdomadaire */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-bold text-black">Jackpot Hebdomadaire</h3>
                  </div>
                  <div className="text-right mb-4">
                    <div className="text-3xl font-bold text-black">50€</div>
                    <div className="text-sm text-gray-600">par ticket</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    1 Bitcoin à gagner
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fréquence :</span>
                      <span>Chaque dimanche</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants :</span>
                      <span className="text-orange-500">1 sur 3 000</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-black mb-2">Avantages :</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Tirages réguliers chaque semaine</li>
                      <li>• Excellentes probabilités de gain</li>
                      <li>• Prix accessible à tous</li>
                      <li>• Paiement rapide des gains</li>
                    </ul>
                  </div>
                </div>

                {/* Méga Jackpot Mensuel */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-bold text-black">Méga Jackpot Mensuel</h3>
                  </div>
                  <div className="text-right mb-4">
                    <div className="text-3xl font-bold text-black">80€</div>
                    <div className="text-sm text-gray-600">par ticket</div>
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    3 Bitcoin à gagner
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fréquence :</span>
                      <span>1er du mois</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants :</span>
                      <span className="text-orange-500">1 sur 5 000</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-black mb-2">Avantages :</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Gain exceptionnel de 3 Bitcoin</li>
                      <li>• Événement mensuel exclusif</li>
                      <li>• Potentiel de gain maximal</li>
                      <li>• Prestige du grand gagnant</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;