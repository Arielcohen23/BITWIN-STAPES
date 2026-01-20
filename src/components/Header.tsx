import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bitcoin, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/85 backdrop-blur-sm border-b border-orange-100/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bitcoin className="w-6 h-6 text-orange-500" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-black leading-tight">BitWin</span>
              <span className="text-xs text-gray-600 font-medium leading-none -mt-1">Compétition</span>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/draws"
              className={`${
                isActive('/draws') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              } transition-colors font-medium`}
            >
              {t('nav.draws')}
            </Link>
            <Link
              to="/how-it-works"
              className={`${
                isActive('/how-it-works') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              } transition-colors font-medium`}
            >
              {t('nav.howItWorks')}
            </Link>
            <Link
              to="/faq"
              className={`${
                isActive('/faq') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              } transition-colors font-medium`}
            >
              {t('nav.faq')}
            </Link>
            <Link
              to="/news"
              className={`${
                isActive('/news') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              } transition-colors font-medium`}
            >
              {t('nav.news')}
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'
              } transition-colors font-medium`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-2 py-1 text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                
                {/* User Space Button */}
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 flex items-center justify-center">
                      <User className="w-3 h-3 text-orange-500" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.tickets} tickets</div>
                    </div>
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="p-1 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-3 py-1 text-gray-700 hover:text-orange-500 transition-colors font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1 bg-orange-500 text-white hover:bg-orange-600 transition-colors font-medium"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;