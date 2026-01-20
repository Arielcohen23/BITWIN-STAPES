import React from 'react';
import { Bitcoin, Users, Shield, Trophy, Calendar, TrendingUp, Globe, Award, CheckCircle, Star, Zap, Target } from 'lucide-react';

const AboutUs: React.FC = () => {
  const milestones = [
    {
      year: '2017',
      title: 'Les débuts dans la crypto',
      description: 'Nos fondateurs découvrent Bitcoin et commencent à investir dans l\'écosystème crypto naissant.',
      icon: Bitcoin
    },
    {
      year: '2019',
      title: 'Première expertise',
      description: 'Développement de notre première plateforme d\'échange et accumulation d\'une expertise technique solide.',
      icon: Zap
    },
    {
      year: '2021',
      title: 'Vision démocratique',
      description: 'Constat que Bitcoin reste inaccessible au grand public. Naissance de l\'idée BitWins.',
      icon: Target
    },
    {
      year: '2023',
      title: 'Développement de BitLotto',
      description: 'Création de la plateforme avec un système de tirage certifié TPAL pour garantir l\'équité.',
      icon: Shield
    },
    {
      year: '2024',
      title: 'Lancement officiel',
      description: 'BitWins ouvre ses portes au public avec plus de 12 BTC déjà distribués aux gagnants.',
      icon: Trophy
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Transparence totale',
      description: 'Tous nos tirages sont vérifiables publiquement sur la blockchain Bitcoin. Aucune manipulation possible.'
    },
    {
      icon: Users,
      title: 'Accessibilité pour tous',
      description: 'Nous rendons Bitcoin accessible à partir de 29,99€, sans connaissance technique requise.'
    },
    {
      icon: Globe,
      title: 'Innovation responsable',
      description: 'Nous utilisons les dernières technologies tout en respectant les réglementations en vigueur.'
    },
    {
      icon: Award,
      title: 'Excellence opérationnelle',
      description: '7 ans d\'expérience crypto nous permettent d\'offrir un service de qualité institutionnelle.'
    }
  ];

  const team = [
    {
      name: 'Alexandre Martin',
      role: 'CEO & Co-fondateur',
      description: 'Expert Bitcoin depuis 2017, ancien trader institutionnel chez Goldman Sachs.',
      achievements: '50M€+ gérés en crypto'
    },
    {
      name: 'Sophie Dubois',
      role: 'CTO & Co-fondatrice',
      description: 'Ingénieure blockchain, ancienne développeuse senior chez Binance.',
      achievements: '15+ projets DeFi lancés'
    },
    {
      name: 'Thomas Leroy',
      role: 'Head of Security',
      description: 'Expert cybersécurité, certifié CISSP, ancien consultant chez Deloitte.',
      achievements: 'Zéro incident sécurité'
    },
    {
      name: 'Marie Chen',
      role: 'Head of Compliance',
      description: 'Juriste spécialisée fintech, ancienne avocate en droit financier.',
      achievements: 'Conformité 12 juridictions'
    }
  ];

  const stats = [
    { number: '7+', label: 'Années d\'expérience crypto', icon: Calendar },
    { number: '12.7', label: 'Bitcoin distribués aux gagnants', icon: Bitcoin },
    { number: '2,847', label: 'Joueurs actifs', icon: Users },
    { number: '156', label: 'Gagnants depuis janvier', icon: Trophy },
    { number: '99.9%', label: 'Uptime de la plateforme', icon: TrendingUp },
    { number: '24/7', label: 'Support client', icon: Shield }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              7 ans d'expertise crypto
              <span className="block text-orange-500">au service de tous</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Depuis 2017, nous évoluons dans l'écosystème Bitcoin avec une mission claire : 
              rendre la crypto-monnaie accessible à tous, sans barrière technique ni financière.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-black mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
                Notre mission :
                <span className="block text-orange-500">démocratiser Bitcoin</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  En 2017, quand nous avons découvert Bitcoin, nous avons été fascinés par son potentiel 
                  révolutionnaire. Mais nous avons rapidement réalisé que cette technologie restait 
                  inaccessible au grand public : complexité technique, volatilité, barrières à l'entrée élevées.
                </p>
                
                <p>
                  Après 7 années passées à naviguer dans l'écosystème crypto - du trading institutionnel 
                  au développement blockchain - nous avons acquis une expertise unique. Nous avons vu 
                  Bitcoin passer de 1 000€ à plus de 90 000€, créant des fortunes pour quelques initiés.
                </p>
                
                <p className="font-semibold text-black">
                  BitWin est né de cette frustration : pourquoi Bitcoin ne serait-il accessible 
                  qu'aux experts ? Nous avons créé la première loterie Bitcoin transparente et équitable, 
                  permettant à chacun de posséder du Bitcoin pour seulement 29,99€.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Notre vision</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <p>Rendre Bitcoin accessible à tous, sans exception</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <p>Maintenir la transparence absolue dans tous nos processus</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <p>Créer une communauté mondiale de détenteurs Bitcoin</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                    <p>Éduquer sur les crypto-monnaies de manière ludique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Notre parcours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              7 années d'évolution dans l'écosystème crypto, de nos premiers investissements 
              à la création de BitLotto.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        {index % 2 === 0 ? (
                          <>
                            <div>
                              <h3 className="text-xl font-bold text-black">{milestone.title}</h3>
                              <p className="text-orange-500 font-semibold">{milestone.year}</p>
                            </div>
                            <milestone.icon className="w-8 h-8 text-orange-500" />
                          </>
                        ) : (
                          <>
                            <milestone.icon className="w-8 h-8 text-orange-500" />
                            <div>
                              <h3 className="text-xl font-bold text-black">{milestone.title}</h3>
                              <p className="text-orange-500 font-semibold">{milestone.year}</p>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Nos valeurs fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces principes guident chacune de nos décisions et façonnent l'expérience BitLotto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              L'équipe BitWins
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des experts passionnés unis par la même vision : démocratiser l'accès à Bitcoin sur BitWins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black mb-1">{member.name}</h3>
                <p className="text-orange-500 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">{member.description}</p>
                <div className="bg-orange-50 rounded-lg p-2">
                  <p className="text-orange-700 text-xs font-medium">{member.achievements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
                Technologie de pointe
                <span className="block text-orange-500">& sécurité maximale</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Système TPAL Certifié</h3>
                    <p className="text-gray-700">
                      Nous utilisons randomdraws.com, un système de tirage électronique tiers 
                      certifié pour garantir l'équité absolue de chaque tirage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bitcoin className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Blockchain Bitcoin</h3>
                    <p className="text-gray-700">
                      Chaque tirage utilise les hash des blocs Bitcoin comme source d'aléatoire, 
                      rendant toute manipulation impossible.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-2">Infrastructure Sécurisée</h3>
                    <p className="text-gray-700">
                      Cold storage multi-signatures, chiffrement AES-256, et surveillance 24/7 
                      pour protéger vos fonds et données.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Certifications & Conformité</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Système TPAL certifié</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Conformité RGPD</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Chiffrement SSL 256-bit</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Audit sécurité trimestriel</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Réglementation jeux en ligne</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-gray-300">
                    Nos processus sont audités par des tiers indépendants et 
                    tous nos certificats sont disponibles publiquement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Notre impact en chiffres
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold mb-2">12.7 Bitcoin</div>
              <p className="text-orange-100">Distribués aux gagnants</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <p className="text-orange-100">Nouveaux détenteurs Bitcoin</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">156</div>
              <p className="text-orange-100">Vies changées par nos gains</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1.2M€</div>
              <p className="text-orange-100">Valeur totale redistribuée</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-xl leading-relaxed mb-8 opacity-90">
              Chaque jour, BitWin rapproche Bitcoin du grand public. Notre mission ne s'arrête pas 
              aux tirages : nous éduquons, nous démocratisons, et nous créons une nouvelle génération 
              de détenteurs Bitcoin conscients et informés.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/purchase"
                className="px-8 py-4 bg-white text-orange-500 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
              >
                Rejoindre l'aventure
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-orange-500 transition-colors font-semibold"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;