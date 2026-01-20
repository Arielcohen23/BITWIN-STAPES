import React from 'react';
import { FileText, Scale, Shield, AlertCircle, Users, Bitcoin, Globe, Clock } from 'lucide-react';

const TermsConditions: React.FC = () => {
  const sections = [
    {
      id: 'definitions',
      title: 'Définitions',
      icon: FileText,
      content: [
        '"BitWins" désigne la plateforme de loterie Bitcoin exploitée par BitWins SAS.',
        '"Utilisateur" désigne toute personne physique utilisant les services BitLotto.',
        '"Ticket" désigne un droit de participation à un tirage Bitcoin.',
        '"Tirage" désigne l\'événement de sélection aléatoire d\'un gagnant.',
        '"BTC" désigne la cryptomonnaie Bitcoin.',
        '"TPAL" désigne le système Third Party Audited Lottery utilisé pour les tirages.'
      ]
    },
    {
      id: 'eligibility',
      title: 'Conditions d\'Éligibilité',
      icon: Users,
      content: [
        'Vous devez être âgé d\'au moins 18 ans pour utiliser BitLotto.',
        'Vous devez résider dans un pays où les jeux en ligne sont légaux.',
        'Vous ne devez pas être exclu ou auto-exclu d\'autres plateformes de jeu.',
        'Vous devez fournir des informations exactes lors de l\'inscription.',
        'Un seul compte par personne est autorisé.'
      ]
    },
    {
      id: 'services',
      title: 'Description des Services',
      icon: Bitcoin,
      content: [
        'BitWins organise des tirages hebdomadaires (1 BTC) et mensuels (3 BTC).',
        'BitWins organise des tirages hebdomadaires (1 Bitcoin) et mensuels (3 Bitcoin).',
        'Les tickets sont vendus au prix de 29,99€ (≈0.001 BTC) chacun.',
        'Les tickets sont vendus au prix de 29,99€ (≈0.001 Bitcoin) chacun.',
        'Maximum 50 tickets par transaction par utilisateur.',
        'Les tirages utilisent un système TPAL certifié pour garantir l\'équité.',
        'Les gains sont transférés automatiquement sur le wallet Bitcoin du gagnant.'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Scale className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Conditions Générales d'Utilisation
          </h1>
          <p className="text-xl text-gray-600">
            Termes et conditions régissant l'utilisation de BitLotto
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 15 janvier 2025 • Version 2.1
          </div>
        </div>

        {/* Acceptation */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Acceptation des Conditions</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              En accédant et en utilisant BitWins, vous acceptez d'être lié par ces Conditions 
              Générales d'Utilisation ("CGU"). Si vous n'acceptez pas ces conditions, 
              vous ne devez pas utiliser nos services.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Important</h3>
                  <p className="text-orange-700">
                    Ces conditions constituent un contrat légalement contraignant entre vous et BitWins. 
                    Veuillez les lire attentivement avant d'utiliser nos services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections principales */}
        {sections.map((section) => (
          <div key={section.id} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <section.icon className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl font-bold text-black">{section.title}</h2>
            </div>
            <ul className="space-y-3">
              {section.content.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Règles des Tirages */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Règles des Tirages</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Jackpots</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Ont lieu chaque dimanche à 20h00 UTC</li>
                <li>• Prix : 1 Bitcoin (≈95,000€)</li>
                <li>• Tous les tickets valides participent automatiquement</li>
                <li>• Un seul gagnant par tirage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Méga Jackpots Mensuels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Ont lieu le 1er de chaque mois à 20h00 UTC</li>
                <li>• Prix : 3 Bitcoin (≈285,000€)</li>
                <li>• Tous les tickets valides participent automatiquement</li>
                <li>• Diffusion en direct sur nos canaux officiels</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Processus de Tirage</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Utilisation du système TPAL certifié</li>
                <li>• Hash du bloc Bitcoin comme source d'aléatoire</li>
                <li>• Certificat public généré pour chaque tirage</li>
                <li>• Résultats vérifiables sur la blockchain</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Paiements et Remboursements */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Paiements et Remboursements</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Méthodes de Paiement</h3>
              <p className="text-gray-700 mb-3">Nous acceptons :</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Bitcoin - 0% de frais</li>
                <li>• Cartes bancaires - 2.9% de frais</li>
                <li>• Portefeuilles crypto - 1% de frais</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Politique de Remboursement</h3>
              <p className="text-gray-700">
                Les achats de tickets sont généralement non remboursables. Des exceptions peuvent 
                être accordées en cas d'erreur technique de notre part ou de double paiement.
              </p>
            </div>
          </div>
        </div>

        {/* Responsabilités */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Responsabilités et Limitations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vos Responsabilités</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Maintenir la confidentialité de vos identifiants</li>
                <li>• Fournir des informations exactes et à jour</li>
                <li>• Respecter les lois locales applicables</li>
                <li>• Jouer de manière responsable</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nos Responsabilités</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Organiser les tirages de manière équitable</li>
                <li>• Protéger vos données personnelles</li>
                <li>• Transférer les gains aux gagnants</li>
                <li>• Maintenir la sécurité de la plateforme</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Limitations de Responsabilité</h3>
              <p className="text-gray-700">
                BitLotto ne peut être tenu responsable des pertes indirectes, des dommages 
                consécutifs ou des pertes de profits. Notre responsabilité est limitée au 
                montant des tickets achetés.
              </p>
            </div>
          </div>
        </div>

        {/* Droit Applicable */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Droit Applicable et Juridiction</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Ces conditions sont régies par le droit français. Tout litige sera soumis 
              à la juridiction exclusive des tribunaux de Paris, France.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En cas de conflit, nous encourageons la résolution amiable par médiation 
              avant tout recours judiciaire.
            </p>
          </div>
        </div>

        {/* Modifications */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Modifications des Conditions</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              BitWin se réserve le droit de modifier ces conditions à tout moment. 
              Les modifications importantes seront notifiées 30 jours à l'avance par email.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La poursuite de l'utilisation après modification constitue votre acceptation 
              des nouvelles conditions.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Des questions sur ces conditions ?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;