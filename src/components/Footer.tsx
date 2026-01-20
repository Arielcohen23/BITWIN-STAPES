import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Shield, FileText, Mail, Instagram, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-orange-100/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Bitcoin className="w-6 h-6 text-orange-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-black leading-tight">BitWin</span>
                <span className="text-xs text-gray-600 font-medium leading-none -mt-1">Compétition</span>
              </div>
            </div>
            <p className="text-gray-600 mb-3 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <Link to="/contact" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Mail className="w-4 h-4" />
              </Link>
              <a 
                href="https://instagram.com/bitwin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500 transition-colors"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://tiktok.com/@bitwin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-orange-500 transition-colors"
                aria-label="Suivez-nous sur TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.lotteries')}</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/draws" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.allDraws')}
                </Link>
              </li>
              <li>
                <Link to="/weekly" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('offers.jackpot')}
                </Link>
              </li>
              <li>
                <Link to="/monthly" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('offers.megaJackpot')}
                </Link>
              </li>
              <li>
                <Link to="/winners" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.winners')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t('footer.support')}</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.disclaimer')}
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link to="/refund-cancellation" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.refunds')}
                </Link>
              </li>
              <li>
                <Link to="/acceptable-use" className="text-gray-600 hover:text-orange-500 transition-colors">
                  {t('footer.usage')}
                </Link>
              </li>
            </ul>
          </div>
        </div>






        <div className="border-t border-orange-200/40 mt-8 pt-8 text-center">
          <div className="space-y-3">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <Link to="/terms" className="hover:text-orange-500 transition-colors">{t('footer.terms')}</Link>
              <span>•</span>
              <Link to="/privacy" className="hover:text-orange-500 transition-colors">{t('footer.privacy')}</Link>
              <span>•</span>
              <Link to="/disclaimer" className="hover:text-orange-500 transition-colors">{t('footer.disclaimer')}</Link>
              <span>•</span>
              <Link to="/return-policy" className="hover:text-orange-500 transition-colors">{t('footer.returns')}</Link>
              <span>•</span>
              <Link to="/refund-cancellation" className="hover:text-orange-500 transition-colors">{t('footer.refunds')}</Link>
              <span>•</span>
              <Link to="/acceptable-use" className="hover:text-orange-500 transition-colors">{t('footer.usage')}</Link>
            </div>
            <p className="text-gray-600 text-xs">
              © 2024 BitWins. Tous droits réservés. Jeu responsable - Ne jouez que ce que vous pouvez vous permettre de perdre.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;