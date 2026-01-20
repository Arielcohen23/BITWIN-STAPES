import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'es' | 'it';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  fr: {
    // Navigation
    'nav.draws': 'Tirages',
    'nav.howItWorks': 'Comment ça marche',
    'nav.faq': 'FAQ',
    'nav.news': 'Actualités',
    'nav.contact': 'Contact',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.admin': 'Admin',

    // Hero Section
    'hero.title': 'Gagnez jusqu\'à',
    'hero.subtitle': 'chaque mois',
    'hero.description': 'Participez à la première loterie Bitcoin transparente et équitable. Tirages hebdomadaires et mensuels avec des gains pouvant atteindre',
    'hero.buyTickets': 'Acheter des tickets',
    'hero.login': 'Se connecter',

    // Draw Section
    'draw.current': 'Tirage en cours',
    'draw.nextJackpot': 'Prochain Jackpot',
    'draw.toWin': 'à gagner',
    'draw.participate': 'Participer',
    'draw.perTicket': 'par ticket',
    'draw.limitedPlaces': 'Places limitées',

    // Stats Section
    'stats.title': 'BitWin en Chiffres',
    'stats.description': 'Des statistiques qui parlent d\'elles-mêmes',
    'stats.maxPerMonth': 'Maximum par mois',
    'stats.breakdown': '1 BTC/semaine + 3 BTC/mois',
    'stats.transparency': 'Transparence garantie',
    'stats.tpalSystem': 'Système TPAL certifié',
    'stats.winningsReception': 'Réception des gains',
    'stats.automaticTransfer': 'Transfert automatique',

    // Offers Section
    'offers.weeklyJackpot': 'Jackpot Hebdomadaire',
    'offers.monthlyMegaJackpot': 'Méga Jackpot Mensuel',
    'offers.perTicket': 'par ticket',
    'offers.maxTickets': 'Tickets max',
    'offers.yourChances': 'Vos chances',
    'offers.frequency': 'Fréquence',
    'offers.frequencyWeekly': 'Hebdomadaire',
    'offers.frequencyMonthly': 'Mensuel',
    'offers.participateNow': 'Participer maintenant',
    'offers.comparison': 'Comparaison des Offres',
    'offers.details': 'Détails des Compétitions',
    'offers.detailsSubtitle': 'Deux formats, un seul objectif : gagner du Bitcoin',
    'offers.characteristic': 'Caractéristique',
    'offers.jackpot': 'Jackpot',
    'offers.megaJackpot': 'Méga Jackpot',
    'offers.prizeToWin': 'Prix à gagner',
    'offers.ticketPrice': 'Prix du ticket',
    'offers.maxParticipants': 'Participants max',
    'offers.tableFrequencyWeekly': 'Chaque dimanche',
    'offers.tableFrequencyMonthly': 'Chaque 1er du mois',

    // Participate Section
    'participate.title': 'Comment participer',
    'participate.titleHighlight': 'en 4 étapes',
    'participate.titleEnd': 'simples',
    'participate.description': 'Un parcours de jeu simplifié et vérifiable, conçu pour maximiser vos probabilités de gain.',
    'participate.step1': 'CHOISIR',
    'participate.step2': 'JOUER',
    'participate.step3': 'ACHETER',
    'participate.step4': 'GAGNER',
    'participate.step1Description': 'Sélectionnez le tirage auquel vous souhaitez participer',
    'participate.step2Description': 'Répondez à une question de culture générale',
    'participate.step3Description': 'Achetez vos tickets de participation',
    'participate.step4Description': 'Recevez vos Bitcoin en cas de victoire',

    // TPAL Section
    'tpal.title': 'Tirages Certifiés et Vérifiables',
    'tpal.description': 'Nous utilisons la technologie de pointe de randomdraws.com pour sélectionner aléatoirement les gagnants de nos tirages en conformité avec les réglementations. Cela signifie que vous pouvez avoir confiance que votre tirage sera impartial et digne de confiance.',
    'tpal.certifiedSystem': 'Système TPAL Certifié',
    'tpal.certifiedSystemDesc': 'Third Party Audited Lottery pour une équité garantie',
    'tpal.publicCertificates': 'Certificats Publics',
    'tpal.publicCertificatesDesc': 'Chaque tirage génère un certificat vérifiable',
    'tpal.blockchainBitcoin': 'Blockchain Bitcoin',
    'tpal.blockchainBitcoinDesc': 'Utilise les hash des blocs comme source d\'aléatoire',
    'tpal.totalTransparency': 'Transparence Totale',
    'tpal.totalTransparencyDesc': 'Tous les résultats sont publiquement vérifiables',

    // Certified Draws Section
    'certified.title': 'Tirages Certifiés et Vérifiables',
    'certified.description': 'Nous utilisons la technologie de pointe de randomdraws.com pour sélectionner aléatoirement les gagnants de nos tirages en conformité avec les réglementations. Cela signifie que vous pouvez avoir confiance que votre tirage sera impartial et digne de confiance.',
    'certified.tpalSystem': 'Système TPAL Certifié',
    'certified.tpalSystemDesc': 'Third Party Audited Lottery pour une équité garantie',
    'certified.publicCertificates': 'Certificats Publics',
    'certified.publicCertificatesDesc': 'Chaque tirage génère un certificat vérifiable',
    'certified.blockchainBitcoin': 'Blockchain Bitcoin',
    'certified.blockchainBitcoinDesc': 'Utilise les hash des blocs comme source d\'aléatoire',
    'certified.totalTransparency': 'Transparence Totale',
    'certified.totalTransparencyDesc': 'Tous les résultats sont publiquement vérifiables',

    // Dashboard
    'dashboard.welcome': 'Bienvenue',
    'dashboard.description': 'Gérez vos tickets et suivez vos participations',

    // Draws Page
    'draws.title': 'Tirages Bitcoin',
    'draws.description': 'Participez aux tirages hebdomadaires et mensuels',
    'draws.active': 'Actifs',
    'draws.upcoming': 'À venir',
    'draws.completed': 'Terminés',
    'draws.timeRemaining': 'Temps restant',
    'draws.participants': 'participants',
    'draws.buyTickets': 'Acheter des tickets',
    'draws.noDraws': 'Aucun tirage',
    'draws.comingSoon': 'De nouveaux tirages arrivent bientôt',

    // FAQ
    'faq.title': 'Questions Fréquentes',
    'faq.description': 'Trouvez rapidement les réponses à vos questions',
    'faq.allQuestions': 'Toutes les questions',
    'faq.general': 'Général',
    'faq.ticketsParticipation': 'Tickets & Participation',
    'faq.payments': 'Paiements',
    'faq.security': 'Sécurité',
    'faq.draws': 'Tirages',
    'faq.winningsWithdrawals': 'Gains & Retraits',
    'faq.technical': 'Technique',
    'faq.searchPlaceholder': 'Rechercher dans les questions...',
    'faq.questionFound': 'question trouvée',
    'faq.questionsFound': 'questions trouvées',
    'faq.for': 'pour',
    'faq.noQuestionsFound': 'Aucune question trouvée',
    'faq.tryModifyingSearch': 'Essayez de modifier votre recherche ou vos filtres',
    'faq.resetFilters': 'Réinitialiser les filtres',
    'faq.cantFindAnswer': 'Vous ne trouvez pas votre réponse ?',
    'faq.supportTeamAvailable': 'Notre équipe support est disponible 24h/24',
    'faq.contactSupport': 'Contacter le support',
    'faq.helpCenter': 'Centre d\'aide',
    'faq.quickResponse': 'Réponse rapide',
    'faq.supportAvailable24h': 'Support disponible 24h/24',
    'faq.activeCommunity': 'Communauté active',
    'faq.moreThanPlayers': 'Plus de 2000 joueurs',
    'faq.guaranteedSatisfaction': 'Satisfaction garantie',
    'faq.customerSatisfaction': '98% de satisfaction client',

    // Winners Section
    'winners.title': 'Nos Derniers Gagnants',
    'winners.subtitle': 'Découvrez les témoignages de nos gagnants récents',
    'winners.verified': 'Vérifié',
    'winners.bigWinner': 'Gros Gagnant',
    'winners.viewAll': 'Voir tous les gagnants',
    'winners.nextTestimonial': 'Témoignage suivant',
    'winners.prevTestimonial': 'Témoignage précédent',

    // Crypto News Section
    'cryptoNews.title': 'Actualités Bitcoin & Crypto',
    'cryptoNews.subtitle': 'Restez informé des dernières tendances des cryptomonnaies',
    'cryptoNews.readMore': 'En savoir plus',
    'cryptoNews.previous': 'Précédent',
    'cryptoNews.next': 'Suivant',

    // Footer
    'footer.description': 'La première plateforme de loterie Bitcoin transparente et équitable sur BitWins',
    'footer.lotteries': 'Loteries',
    'footer.allDraws': 'Tous les tirages',
    'footer.winners': 'Gagnants',
    'footer.support': 'Support',
    'footer.howItWorks': 'Comment ça marche',
    'footer.terms': 'Conditions',
    'footer.privacy': 'Confidentialité',
    'footer.disclaimer': 'Avertissements',
    'footer.returns': 'Retours',
    'footer.refunds': 'Remboursements',
    'footer.usage': 'Utilisation'
  },
  en: {
    // Navigation
    'nav.draws': 'Draws',
    'nav.howItWorks': 'How it Works',
    'nav.faq': 'FAQ',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Sign Up',
    'nav.admin': 'Admin',

    // Hero Section
    'hero.title': 'Win up to',
    'hero.subtitle': 'every month',
    'hero.description': 'Join the first transparent and fair Bitcoin lottery. Weekly and monthly draws with prizes up to',
    'hero.buyTickets': 'Buy Tickets',
    'hero.login': 'Login',

    // Draw Section
    'draw.current': 'Current Draw',
    'draw.nextJackpot': 'Next Jackpot',
    'draw.toWin': 'to win',
    'draw.participate': 'Participate',
    'draw.perTicket': 'per ticket',
    'draw.limitedPlaces': 'Limited places',

    // Stats Section
    'stats.title': 'BitWin in Numbers',
    'stats.description': 'Statistics that speak for themselves',
    'stats.maxPerMonth': 'Maximum per month',
    'stats.breakdown': '1 BTC/week + 3 BTC/month',
    'stats.transparency': 'Guaranteed transparency',
    'stats.tpalSystem': 'TPAL certified system',
    'stats.winningsReception': 'Winnings reception',
    'stats.automaticTransfer': 'Automatic transfer',

    // Offers Section
    'offers.weeklyJackpot': 'Weekly Jackpot',
    'offers.monthlyMegaJackpot': 'Monthly Mega Jackpot',
    'offers.perTicket': 'per ticket',
    'offers.maxTickets': 'Max tickets',
    'offers.yourChances': 'Your chances',
    'offers.frequency': 'Frequency',
    'offers.frequencyWeekly': 'Weekly',
    'offers.frequencyMonthly': 'Monthly',
    'offers.participateNow': 'Participate now',
    'offers.comparison': 'Offers Comparison',
    'offers.details': 'Competition Details',
    'offers.detailsSubtitle': 'Two formats, one goal: win Bitcoin',
    'offers.characteristic': 'Characteristic',
    'offers.jackpot': 'Jackpot',
    'offers.megaJackpot': 'Mega Jackpot',
    'offers.prizeToWin': 'Prize to win',
    'offers.ticketPrice': 'Ticket price',
    'offers.maxParticipants': 'Max participants',
    'offers.tableFrequencyWeekly': 'Every Sunday',
    'offers.tableFrequencyMonthly': 'Every 1st of month',

    // Participate Section
    'participate.title': 'How to participate',
    'participate.titleHighlight': 'in 4 simple',
    'participate.titleEnd': 'steps',
    'participate.description': 'A simplified and verifiable gaming journey, designed to maximize your winning probabilities.',
    'participate.step1': 'CHOOSE',
    'participate.step2': 'PLAY',
    'participate.step3': 'BUY',
    'participate.step4': 'WIN',
    'participate.step1Description': 'Select the draw you want to participate in',
    'participate.step2Description': 'Answer a general knowledge question',
    'participate.step3Description': 'Buy your participation tickets',
    'participate.step4Description': 'Receive your Bitcoin if you win',

    // TPAL Section
    'tpal.title': 'Certified and Verifiable Draws',
    'tpal.description': 'We use cutting-edge technology from randomdraws.com to randomly select winners of our draws in compliance with regulations. This means you can trust that your draw will be impartial and trustworthy.',
    'tpal.certifiedSystem': 'TPAL Certified System',
    'tpal.certifiedSystemDesc': 'Third Party Audited Lottery for guaranteed fairness',
    'tpal.publicCertificates': 'Public Certificates',
    'tpal.publicCertificatesDesc': 'Each draw generates a verifiable certificate',
    'tpal.blockchainBitcoin': 'Bitcoin Blockchain',
    'tpal.blockchainBitcoinDesc': 'Uses block hashes as source of randomness',
    'tpal.totalTransparency': 'Total Transparency',
    'tpal.totalTransparencyDesc': 'All results are publicly verifiable',

    // Certified Draws Section
    'certified.title': 'Certified and Verifiable Draws',
    'certified.description': 'We use cutting-edge technology from randomdraws.com to randomly select winners of our draws in compliance with regulations. This means you can trust that your draw will be impartial and trustworthy.',
    'certified.tpalSystem': 'TPAL Certified System',
    'certified.tpalSystemDesc': 'Third Party Audited Lottery for guaranteed fairness',
    'certified.publicCertificates': 'Public Certificates',
    'certified.publicCertificatesDesc': 'Each draw generates a verifiable certificate',
    'certified.blockchainBitcoin': 'Bitcoin Blockchain',
    'certified.blockchainBitcoinDesc': 'Uses block hashes as source of randomness',
    'certified.totalTransparency': 'Total Transparency',
    'certified.totalTransparencyDesc': 'All results are publicly verifiable',

    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.description': 'Manage your tickets and track your participations',

    // Draws Page
    'draws.title': 'Bitcoin Draws',
    'draws.description': 'Participate in weekly and monthly draws',
    'draws.active': 'Active',
    'draws.upcoming': 'Upcoming',
    'draws.completed': 'Completed',
    'draws.timeRemaining': 'Time remaining',
    'draws.participants': 'participants',
    'draws.buyTickets': 'Buy tickets',
    'draws.noDraws': 'No draws',
    'draws.comingSoon': 'New draws coming soon',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.description': 'Find answers to your questions quickly',
    'faq.allQuestions': 'All questions',
    'faq.general': 'General',
    'faq.ticketsParticipation': 'Tickets & Participation',
    'faq.payments': 'Payments',
    'faq.security': 'Security',
    'faq.draws': 'Draws',
    'faq.winningsWithdrawals': 'Winnings & Withdrawals',
    'faq.technical': 'Technical',
    'faq.searchPlaceholder': 'Search in questions...',
    'faq.questionFound': 'question found',
    'faq.questionsFound': 'questions found',
    'faq.for': 'for',
    'faq.noQuestionsFound': 'No questions found',
    'faq.tryModifyingSearch': 'Try modifying your search or filters',
    'faq.resetFilters': 'Reset filters',
    'faq.cantFindAnswer': 'Can\'t find your answer?',
    'faq.supportTeamAvailable': 'Our support team is available 24/7',
    'faq.contactSupport': 'Contact support',
    'faq.helpCenter': 'Help center',
    'faq.quickResponse': 'Quick response',
    'faq.supportAvailable24h': 'Support available 24/7',
    'faq.activeCommunity': 'Active community',
    'faq.moreThanPlayers': 'More than 2000 players',
    'faq.guaranteedSatisfaction': 'Guaranteed satisfaction',
    'faq.customerSatisfaction': '98% customer satisfaction',

    // Winners Section
    'winners.title': 'Our Latest Winners',
    'winners.subtitle': 'Discover testimonials from our recent winners',
    'winners.verified': 'Verified',
    'winners.bigWinner': 'Big Winner',
    'winners.viewAll': 'View all winners',
    'winners.nextTestimonial': 'Next testimonial',
    'winners.prevTestimonial': 'Previous testimonial',

    // Footer
    'footer.description': 'The first transparent and fair Bitcoin lottery platform - BitWins',
    'footer.lotteries': 'Lotteries',
    'footer.allDraws': 'All draws',
    'footer.winners': 'Winners',
    'footer.support': 'Support',
    'footer.howItWorks': 'How it works',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.disclaimer': 'Disclaimer',
    'footer.returns': 'Returns',
    'footer.refunds': 'Refunds',
    'footer.usage': 'Usage'
  },
  es: {
    // Navigation
    'nav.draws': 'Sorteos',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.faq': 'FAQ',
    'nav.news': 'Noticias',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.admin': 'Admin',

    // Hero Section
    'hero.title': 'Gana hasta',
    'hero.subtitle': 'cada mes',
    'hero.description': 'Únete a la primera lotería Bitcoin transparente y justa. Sorteos semanales y mensuales con premios de hasta',
    'hero.buyTickets': 'Comprar Boletos',
    'hero.login': 'Iniciar Sesión',

    // Draw Section
    'draw.current': 'Sorteo Actual',
    'draw.nextJackpot': 'Próximo Jackpot',
    'draw.toWin': 'para ganar',
    'draw.participate': 'Participar',
    'draw.perTicket': 'por boleto',
    'draw.limitedPlaces': 'Lugares limitados',

    // Stats Section
    'stats.title': 'BitWin en Números',
    'stats.description': 'Estadísticas que hablan por sí mismas',
    'stats.maxPerMonth': 'Máximo por mes',
    'stats.breakdown': '1 BTC/semana + 3 BTC/mes',
    'stats.transparency': 'Transparencia garantizada',
    'stats.tpalSystem': 'Sistema TPAL certificado',
    'stats.winningsReception': 'Recepción de ganancias',
    'stats.automaticTransfer': 'Transferencia automática',

    // Offers Section
    'offers.weeklyJackpot': 'Jackpot Semanal',
    'offers.monthlyMegaJackpot': 'Mega Jackpot Mensual',
    'offers.perTicket': 'por boleto',
    'offers.maxTickets': 'Boletos máx',
    'offers.yourChances': 'Tus posibilidades',
    'offers.frequency': 'Frecuencia',
    'offers.frequencyWeekly': 'Semanal',
    'offers.frequencyMonthly': 'Mensual',
    'offers.participateNow': 'Participar ahora',
    'offers.comparison': 'Comparación de Ofertas',
    'offers.details': 'Detalles de las Competiciones',
    'offers.detailsSubtitle': 'Dos formatos, un objetivo: ganar Bitcoin',
    'offers.characteristic': 'Característica',
    'offers.jackpot': 'Jackpot',
    'offers.megaJackpot': 'Mega Jackpot',
    'offers.prizeToWin': 'Premio a ganar',
    'offers.ticketPrice': 'Precio del boleto',
    'offers.maxParticipants': 'Participantes máx',
    'offers.tableFrequencyWeekly': 'Cada domingo',
    'offers.tableFrequencyMonthly': 'Cada 1 del mes',

    // Participate Section
    'participate.title': 'Cómo participar',
    'participate.titleHighlight': 'en 4 pasos',
    'participate.titleEnd': 'simples',
    'participate.description': 'Un recorrido de juego simplificado y verificable, diseñado para maximizar tus probabilidades de ganancia.',
    'participate.step1': 'ELEGIR',
    'participate.step2': 'JUGAR',
    'participate.step3': 'COMPRAR',
    'participate.step4': 'GANAR',
    'participate.step1Description': 'Selecciona el sorteo en el que quieres participar',
    'participate.step2Description': 'Responde una pregunta de cultura general',
    'participate.step3Description': 'Compra tus boletos de participación',
    'participate.step4Description': 'Recibe tu Bitcoin si ganas',

    // TPAL Section
    'tpal.title': 'Sorteos Certificados y Verificables',
    'tpal.description': 'Utilizamos tecnología de vanguardia de randomdraws.com para seleccionar aleatoriamente a los ganadores de nuestros sorteos en cumplimiento con las regulaciones. Esto significa que puedes confiar en que tu sorteo será imparcial y confiable.',
    'tpal.certifiedSystem': 'Sistema TPAL Certificado',
    'tpal.certifiedSystemDesc': 'Third Party Audited Lottery para equidad garantizada',
    'tpal.publicCertificates': 'Certificados Públicos',
    'tpal.publicCertificatesDesc': 'Cada sorteo genera un certificado verificable',
    'tpal.blockchainBitcoin': 'Blockchain Bitcoin',
    'tpal.blockchainBitcoinDesc': 'Usa hashes de bloques como fuente de aleatoriedad',
    'tpal.totalTransparency': 'Transparencia Total',
    'tpal.totalTransparencyDesc': 'Todos los resultados son públicamente verificables',

    // Certified Draws Section
    'certified.title': 'Sorteos Certificados y Verificables',
    'certified.description': 'Utilizamos tecnología de vanguardia de randomdraws.com para seleccionar aleatoriamente a los ganadores de nuestros sorteos en cumplimiento con las regulaciones. Esto significa que puedes confiar en que tu sorteo será imparcial y confiable.',
    'certified.tpalSystem': 'Sistema TPAL Certificado',
    'certified.tpalSystemDesc': 'Third Party Audited Lottery para equidad garantizada',
    'certified.publicCertificates': 'Certificados Públicos',
    'certified.publicCertificatesDesc': 'Cada sorteo genera un certificado verificable',
    'certified.blockchainBitcoin': 'Blockchain Bitcoin',
    'certified.blockchainBitcoinDesc': 'Usa hashes de bloques como fuente de aleatoriedad',
    'certified.totalTransparency': 'Transparencia Total',
    'certified.totalTransparencyDesc': 'Todos los resultados son públicamente verificables',

    // Dashboard
    'dashboard.welcome': 'Bienvenido',
    'dashboard.description': 'Gestiona tus boletos y sigue tus participaciones',

    // Draws Page
    'draws.title': 'Sorteos Bitcoin',
    'draws.description': 'Participa en sorteos semanales y mensuales',
    'draws.active': 'Activos',
    'draws.upcoming': 'Próximos',
    'draws.completed': 'Completados',
    'draws.timeRemaining': 'Tiempo restante',
    'draws.participants': 'participantes',
    'draws.buyTickets': 'Comprar boletos',
    'draws.noDraws': 'Sin sorteos',
    'draws.comingSoon': 'Nuevos sorteos próximamente',

    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.description': 'Encuentra respuestas a tus preguntas rápidamente',
    'faq.allQuestions': 'Todas las preguntas',
    'faq.general': 'General',
    'faq.ticketsParticipation': 'Boletos y Participación',
    'faq.payments': 'Pagos',
    'faq.security': 'Seguridad',
    'faq.draws': 'Sorteos',
    'faq.winningsWithdrawals': 'Ganancias y Retiros',
    'faq.technical': 'Técnico',
    'faq.searchPlaceholder': 'Buscar en preguntas...',
    'faq.questionFound': 'pregunta encontrada',
    'faq.questionsFound': 'preguntas encontradas',
    'faq.for': 'para',
    'faq.noQuestionsFound': 'No se encontraron preguntas',
    'faq.tryModifyingSearch': 'Intenta modificar tu búsqueda o filtros',
    'faq.resetFilters': 'Restablecer filtros',
    'faq.cantFindAnswer': '¿No encuentras tu respuesta?',
    'faq.supportTeamAvailable': 'Nuestro equipo de soporte está disponible 24/7',
    'faq.contactSupport': 'Contactar soporte',
    'faq.helpCenter': 'Centro de ayuda',
    'faq.quickResponse': 'Respuesta rápida',
    'faq.supportAvailable24h': 'Soporte disponible 24/7',
    'faq.activeCommunity': 'Comunidad activa',
    'faq.moreThanPlayers': 'Más de 2000 jugadores',
    'faq.guaranteedSatisfaction': 'Satisfacción garantizada',
    'faq.customerSatisfaction': '98% satisfacción del cliente',

    // Winners Section
    'winners.title': 'Nuestros Últimos Ganadores',
    'winners.subtitle': 'Descubre testimonios de nuestros ganadores recientes',
    'winners.verified': 'Verificado',
    'winners.bigWinner': 'Gran Ganador',
    'winners.viewAll': 'Ver todos los ganadores',
    'winners.nextTestimonial': 'Siguiente testimonio',
    'winners.prevTestimonial': 'Testimonio anterior',

    // Footer
    'footer.description': 'La primera plataforma de lotería Bitcoin transparente y justa - BitWins',
    'footer.lotteries': 'Loterías',
    'footer.allDraws': 'Todos los sorteos',
    'footer.winners': 'Ganadores',
    'footer.support': 'Soporte',
    'footer.howItWorks': 'Cómo funciona',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.disclaimer': 'Descargo',
    'footer.returns': 'Devoluciones',
    'footer.refunds': 'Reembolsos',
    'footer.usage': 'Uso'
  },
  it: {
    // Navigation
    'nav.draws': 'Estrazioni',
    'nav.howItWorks': 'Come Funziona',
    'nav.faq': 'FAQ',
    'nav.news': 'Notizie',
    'nav.contact': 'Contatto',
    'nav.login': 'Accedi',
    'nav.register': 'Registrati',
    'nav.admin': 'Admin',

    // Hero Section
    'hero.title': 'Vinci fino a',
    'hero.subtitle': 'ogni mese',
    'hero.description': 'Partecipa alla prima lotteria Bitcoin trasparente e giusta. Estrazioni settimanali e mensili con premi fino a',
    'hero.buyTickets': 'Compra Biglietti',
    'hero.login': 'Accedi',

    // Draw Section
    'draw.current': 'Estrazione Corrente',
    'draw.nextJackpot': 'Prossimo Jackpot',
    'draw.toWin': 'da vincere',
    'draw.participate': 'Partecipa',
    'draw.perTicket': 'per biglietto',
    'draw.limitedPlaces': 'Posti limitati',

    // Stats Section
    'stats.title': 'BitWin in Numeri',
    'stats.description': 'Statistiche che parlano da sole',
    'stats.maxPerMonth': 'Massimo per mese',
    'stats.breakdown': '1 BTC/settimana + 3 BTC/mese',
    'stats.transparency': 'Trasparenza garantita',
    'stats.tpalSystem': 'Sistema TPAL certificato',
    'stats.winningsReception': 'Ricezione vincite',
    'stats.automaticTransfer': 'Trasferimento automatico',

    // Offers Section
    'offers.weeklyJackpot': 'Jackpot Settimanale',
    'offers.monthlyMegaJackpot': 'Mega Jackpot Mensile',
    'offers.perTicket': 'per biglietto',
    'offers.maxTickets': 'Biglietti max',
    'offers.yourChances': 'Le tue possibilità',
    'offers.frequency': 'Frequenza',
    'offers.frequencyWeekly': 'Settimanale',
    'offers.frequencyMonthly': 'Mensile',
    'offers.participateNow': 'Partecipa ora',
    'offers.comparison': 'Confronto Offerte',
    'offers.details': 'Dettagli delle Competizioni',
    'offers.detailsSubtitle': 'Due formati, un obiettivo: vincere Bitcoin',
    'offers.characteristic': 'Caratteristica',
    'offers.jackpot': 'Jackpot',
    'offers.megaJackpot': 'Mega Jackpot',
    'offers.prizeToWin': 'Premio da vincere',
    'offers.ticketPrice': 'Prezzo biglietto',
    'offers.maxParticipants': 'Partecipanti max',
    'offers.tableFrequencyWeekly': 'Ogni domenica',
    'offers.tableFrequencyMonthly': 'Ogni 1° del mese',

    // Participate Section
    'participate.title': 'Come partecipare',
    'participate.titleHighlight': 'in 4 semplici',
    'participate.titleEnd': 'passaggi',
    'participate.description': 'Un percorso di gioco semplificato e verificabile, progettato per massimizzare le tue probabilità di vincita.',
    'participate.step1': 'SCEGLI',
    'participate.step2': 'GIOCA',
    'participate.step3': 'COMPRA',
    'participate.step4': 'VINCI',
    'participate.step1Description': 'Seleziona l\'estrazione a cui vuoi partecipare',
    'participate.step2Description': 'Rispondi a una domanda di cultura generale',
    'participate.step3Description': 'Compra i tuoi biglietti di partecipazione',
    'participate.step4Description': 'Ricevi i tuoi Bitcoin se vinci',

    // TPAL Section
    'tpal.title': 'Estrazioni Certificate e Verificabili',
    'tpal.description': 'Utilizziamo la tecnologia all\'avanguardia di randomdraws.com per selezionare casualmente i vincitori delle nostre estrazioni in conformità con le normative. Questo significa che puoi fidarti che la tua estrazione sarà imparziale e affidabile.',
    'tpal.certifiedSystem': 'Sistema TPAL Certificato',
    'tpal.certifiedSystemDesc': 'Third Party Audited Lottery per equità garantita',
    'tpal.publicCertificates': 'Certificati Pubblici',
    'tpal.publicCertificatesDesc': 'Ogni estrazione genera un certificato verificabile',
    'tpal.blockchainBitcoin': 'Blockchain Bitcoin',
    'tpal.blockchainBitcoinDesc': 'Usa hash dei blocchi come fonte di casualità',
    'tpal.totalTransparency': 'Trasparenza Totale',
    'tpal.totalTransparencyDesc': 'Tutti i risultati sono pubblicamente verificabili',

    // Certified Draws Section
    'certified.title': 'Estrazioni Certificate e Verificabili',
    'certified.description': 'Utilizziamo la tecnologia all\'avanguardia di randomdraws.com per selezionare casualmente i vincitori delle nostre estrazioni in conformità con le normative. Questo significa che puoi fidarti che la tua estrazione sarà imparziale e affidabile.',
    'certified.tpalSystem': 'Sistema TPAL Certificato',
    'certified.tpalSystemDesc': 'Third Party Audited Lottery per equità garantita',
    'certified.publicCertificates': 'Certificati Pubblici',
    'certified.publicCertificatesDesc': 'Ogni estrazione genera un certificato verificabile',
    'certified.blockchainBitcoin': 'Blockchain Bitcoin',
    'certified.blockchainBitcoinDesc': 'Usa hash dei blocchi come fonte di casualità',
    'certified.totalTransparency': 'Trasparenza Totale',
    'certified.totalTransparencyDesc': 'Tutti i risultati sono pubblicamente verificabili',

    // Dashboard
    'dashboard.welcome': 'Benvenuto',
    'dashboard.description': 'Gestisci i tuoi biglietti e segui le tue partecipazioni',

    // Draws Page
    'draws.title': 'Estrazioni Bitcoin',
    'draws.description': 'Partecipa alle estrazioni settimanali e mensili',
    'draws.active': 'Attive',
    'draws.upcoming': 'Prossime',
    'draws.completed': 'Completate',
    'draws.timeRemaining': 'Tempo rimanente',
    'draws.participants': 'partecipanti',
    'draws.buyTickets': 'Compra biglietti',
    'draws.noDraws': 'Nessuna estrazione',
    'draws.comingSoon': 'Nuove estrazioni in arrivo',

    // FAQ
    'faq.title': 'Domande Frequenti',
    'faq.description': 'Trova rapidamente le risposte alle tue domande',
    'faq.allQuestions': 'Tutte le domande',
    'faq.general': 'Generale',
    'faq.ticketsParticipation': 'Biglietti e Partecipazione',
    'faq.payments': 'Pagamenti',
    'faq.security': 'Sicurezza',
    'faq.draws': 'Estrazioni',
    'faq.winningsWithdrawals': 'Vincite e Prelievi',
    'faq.technical': 'Tecnico',
    'faq.searchPlaceholder': 'Cerca nelle domande...',
    'faq.questionFound': 'domanda trovata',
    'faq.questionsFound': 'domande trovate',
    'faq.for': 'per',
    'faq.noQuestionsFound': 'Nessuna domanda trovata',
    'faq.tryModifyingSearch': 'Prova a modificare la tua ricerca o i filtri',
    'faq.resetFilters': 'Reimposta filtri',
    'faq.cantFindAnswer': 'Non trovi la tua risposta?',
    'faq.supportTeamAvailable': 'Il nostro team di supporto è disponibile 24/7',
    'faq.contactSupport': 'Contatta il supporto',
    'faq.helpCenter': 'Centro assistenza',
    'faq.quickResponse': 'Risposta rapida',
    'faq.supportAvailable24h': 'Supporto disponibile 24/7',
    'faq.activeCommunity': 'Comunità attiva',
    'faq.moreThanPlayers': 'Più di 2000 giocatori',
    'faq.guaranteedSatisfaction': 'Soddisfazione garantita',
    'faq.customerSatisfaction': '98% soddisfazione clienti',

    // Winners Section
    'winners.title': 'I Nostri Ultimi Vincitori',
    'winners.subtitle': 'Scopri le testimonianze dei nostri vincitori recenti',
    'winners.verified': 'Verificato',
    'winners.bigWinner': 'Grande Vincitore',
    'winners.viewAll': 'Vedi tutti i vincitori',
    'winners.nextTestimonial': 'Prossima testimonianza',
    'winners.prevTestimonial': 'Testimonianza precedente',

    // Footer
    'footer.description': 'La prima piattaforma di lotteria Bitcoin trasparente e giusta - BitWin',
    'footer.lotteries': 'Lotterie',
    'footer.allDraws': 'Tutte le estrazioni',
    'footer.winners': 'Vincitori',
    'footer.support': 'Supporto',
    'footer.howItWorks': 'Come funziona',
    'footer.terms': 'Termini',
    'footer.privacy': 'Privacy',
    'footer.disclaimer': 'Disclaimer',
    'footer.returns': 'Resi',
    'footer.refunds': 'Rimborsi',
    'footer.usage': 'Utilizzo'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('bitwin-language') as Language;
    if (savedLanguage && ['fr', 'en', 'es', 'it'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bitwin-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};