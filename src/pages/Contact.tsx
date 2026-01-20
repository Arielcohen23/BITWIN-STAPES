import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageSquare, HelpCircle, Shield, Bitcoin, Users, Zap } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { id: 'support', name: 'Support technique', icon: HelpCircle },
    { id: 'account', name: 'Problème de compte', icon: Users },
    { id: 'payment', name: 'Paiement & Tickets', icon: Bitcoin },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'partnership', name: 'Partenariat', icon: Zap },
    { id: 'other', name: 'Autre', icon: MessageSquare }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@bitwins.com',
      description: 'Réponse sous 2-4 heures',
      action: 'mailto:support@bitwins.com'
    },
    {
      icon: MessageSquare,
      title: 'Chat en direct',
      value: 'Disponible 24h/24',
      description: 'Réponse immédiate',
      action: '#'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      description: 'Lun-Ven 9h-18h CET',
      action: 'tel:+33123456789'
    }
  ];

  const faqQuestions = [
    {
      question: 'Comment acheter des tickets ?',
      answer: 'Connectez-vous à votre compte, cliquez sur "Acheter des tickets" et suivez les étapes.'
    },
    {
      question: 'Quand aura lieu le prochain tirage ?',
      answer: 'Les jackpots ont lieu chaque dimanche à 20h00 UTC, les méga jackpots le 1er de chaque mois.'
    },
    {
      question: 'Comment récupérer mes gains ?',
      answer: 'Les gains sont automatiquement transférés sur votre wallet Bitcoin dans les 30 minutes.'
    },
    {
      question: 'Puis-je faire confiance à BitLotto ?',
      answer: 'Nous utilisons un système TPAL certifié et tous nos tirages sont vérifiables sur la blockchain.'
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.category) {
      newErrors.category = 'Veuillez sélectionner une catégorie';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message envoyé !</h2>
          <p className="text-gray-600 mb-6">
            Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
          </p>
          <div className="space-y-3 text-sm text-gray-600">
            <p>📧 Confirmation envoyée à : <strong>{formData.email}</strong></p>
            <p>⏱️ Temps de réponse estimé : <strong>2-4 heures</strong></p>
            <p>🎫 Numéro de ticket : <strong>#BTC-{Math.random().toString(36).substr(2, 8).toUpperCase()}</strong></p>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                subject: '',
                category: '',
                message: '',
                priority: 'normal'
              });
            }}
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            Notre équipe support est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions 
            sur BitLotto, vos tickets et vos participations.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <method.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="font-medium text-orange-500 mb-2">{method.value}</p>
              <p className="text-gray-600">{method.description}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Envoyez-nous un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Votre nom complet"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Category and Priority */}
                <div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                        errors.category ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                      errors.subject ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Résumé de votre demande"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Décrivez votre demande en détail..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.message.length}/1000 caractères
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Office Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                Informations de contact
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-gray-600 text-sm">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Horaires</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Support 24h/24 - 7j/7</p>
                      <p>Téléphone : Lun-Ven 9h-18h CET</p>
                      <p>Email : Réponse sous 2-4h</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Emails spécialisés</p>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Support : support@bitwin.com</p>
                      <p>Sécurité : security@bitwin.com</p>
                      <p>Partenariats : partners@bitwin.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                Questions fréquentes
              </h3>
              
              <div className="space-y-3">
                {faqQuestions.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              
              <a
                href="/faq"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium mt-3"
              >
                Voir toutes les FAQ
                <HelpCircle className="w-3 h-3" />
              </a>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <h3 className="font-semibold text-red-800">Urgence sécurité</h3>
              </div>
              <p className="text-red-700 text-sm mb-2">
                En cas de problème de sécurité urgent (compte compromis, transaction suspecte), 
                contactez-nous immédiatement :
              </p>
              <div className="space-y-1">
                <a
                  href="mailto:security@bitwin.com"
                  className="block text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  📧 security@bitwin.com
                </a>
                <a
                  href="tel:+33123456789"
                  className="block text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  📞 +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;