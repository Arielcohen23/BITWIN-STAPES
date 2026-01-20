import React from 'react';
import { AlertTriangle, TrendingDown, Shield, Info, DollarSign, Globe, Clock, FileText } from 'lucide-react';

const Disclaimer: React.FC = () => {
  const risks = [
    {
      title: 'Volatilité du Bitcoin',
      description: 'La valeur du Bitcoin peut fluctuer drastiquement. Les prix affichés sont indicatifs.',
      icon: TrendingDown
    },
    {
      title: 'Risque de Perte',
      description: 'Il n\'y a aucune garantie de gain. Vous pouvez perdre la totalité de votre mise.',
      icon: DollarSign
    },
    {
      title: 'Réglementation',
      description: 'Les lois sur les jeux peuvent changer et affecter la disponibilité du service.',
      icon: Globe
    },
    {
      title: 'Technologie',
      description: 'Les risques techniques liés à la blockchain et aux cryptomonnaies.',
      icon: Shield
    }
  ];

  const disclaimers = [
    {
      category: 'Investissement',
      items: [
        'BitLotto n\'est pas un conseil en investissement',
        'Ne jouez que ce que vous pouvez vous permettre de perdre',
        'Les performances passées ne garantissent pas les résultats futurs',
        'Consultez un conseiller financier pour vos décisions d\'investissement'
      ]
    },
    {
      category: 'Technique',
      items: [
        'Nous ne garantissons pas un fonctionnement ininterrompu du service',
        'Les délais de transaction Bitcoin peuvent varier',
        'Les frais de réseau Bitcoin sont variables et à votre charge',
        'Sauvegardez toujours vos clés privées et phrases de récupération'
      ]
    },
    {
      category: 'Légal',
      items: [
        'Vérifiez la légalité des jeux en ligne dans votre juridiction',
        'BitLotto n\'est pas responsable des violations de lois locales',
        'Certains pays peuvent bloquer l\'accès à notre service',
        'Vous êtes responsable de vos obligations fiscales'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-black mb-4">
            Avertissements et Disclaimers
          </h1>
          <p className="text-xl text-gray-600">
            Informations importantes sur les risques et limitations
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Dernière mise à jour : 15 janvier 2025
          </div>
        </div>

        {/* Avertissement Principal */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-4">
                Avertissement Important
              </h2>
              <div className="space-y-4 text-red-700">
                <p className="font-semibold text-lg">
                  Les jeux de hasard comportent des risques financiers importants.
                </p>
                <p>
                  BitWins est une plateforme de loterie utilisant Bitcoin. Comme tout jeu de hasard, 
                  il existe un risque de perte financière. La majorité des participants ne gagnent pas.
                </p>
                <p>
                  <strong>Ne jouez jamais plus que ce que vous pouvez vous permettre de perdre.</strong> 
                  Si vous ressentez des signes de dépendance au jeu, consultez immédiatement un professionnel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Risques Principaux */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Risques Principaux</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {risks.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <risk.icon className="w-6 h-6 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{risk.title}</h3>
                </div>
                <p className="text-gray-700">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimers par Catégorie */}
        {disclaimers.map((section, index) => (
          <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Disclaimer {section.category}
            </h2>
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Volatilité Bitcoin */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Volatilité du Bitcoin</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Le Bitcoin est une cryptomonnaie extrêmement volatile. Sa valeur peut fluctuer 
              de manière significative en très peu de temps, parfois de plus de 20% en une journée.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">Implications pour BitLotto :</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Les prix en euros sont indicatifs et basés sur le cours actuel</li>
                <li>• La valeur réelle de vos gains peut varier au moment du transfert</li>
                <li>• Les tickets sont vendus en euros mais les gains sont en Bitcoin</li>
                <li>• Nous ne garantissons aucune valeur minimale en devise fiat</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jeu Responsable */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-black">Jeu Responsable</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Signes d'Alerte</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Jouer plus que prévu initialement</li>
                <li>• Emprunter de l'argent pour jouer</li>
                <li>• Négliger ses responsabilités pour jouer</li>
                <li>• Mentir sur ses habitudes de jeu</li>
                <li>• Jouer pour récupérer ses pertes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ressources d'Aide</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <ul className="space-y-2 text-green-700">
                  <li>• <strong>SOS Joueurs :</strong> 09 74 75 13 13</li>
                  <li>• <strong>Joueurs Info Service :</strong> 0974751313</li>
                  <li>• <strong>En ligne :</strong> www.joueurs-info-service.fr</li>
                  <li>• <strong>Chat :</strong> Disponible 24h/24 sur notre site</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Limitations Techniques */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-black">Limitations Techniques</h2>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              BitWins dépend de technologies tierces (blockchain Bitcoin, systèmes de paiement, 
              internet) qui peuvent connaître des dysfonctionnements.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Nous ne garantissons pas :</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Un accès ininterrompu au service</li>
                  <li>• Des délais de transaction fixes</li>
                  <li>• L'absence de bugs ou erreurs</li>
                  <li>• La compatibilité avec tous les appareils</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">En cas de problème technique :</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Les tirages peuvent être reportés</li>
                  <li>• Les transactions peuvent être annulées</li>
                  <li>• Des compensations peuvent être accordées</li>
                  <li>• Le support technique est disponible 24h/24</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptation */}
        <div className="bg-gray-100 rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Acceptation des Risques</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              En utilisant BitWin, vous reconnaissez avoir lu, compris et accepté tous les 
              risques et limitations décrits dans ce disclaimer.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Vous confirmez que vous participez en connaissance de cause et que vous assumez 
              l'entière responsabilité de vos décisions de jeu.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Des questions sur ces avertissements ?
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

export default Disclaimer;