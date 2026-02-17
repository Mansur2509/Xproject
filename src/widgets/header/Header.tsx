import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@entities/user/model/userStore';
import { ThemeToggle } from '@widgets/theme-toggle';
import { LanguageSelector } from '@widgets/language-selector';
import { t, useI18nStore } from '@shared/lib/i18n';
import './Header.css';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useUserStore();
  const navigate = useNavigate();
  const { language } = useI18nStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <Link to="/" className="brand">
            <div className="logo-badge" aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img" aria-label="Admisstion triper logo">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--blue)" stopOpacity={0.95} />
                    <stop offset="1" stopColor="var(--blue2)" stopOpacity={0.85} />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="29" fill="none" stroke="url(#g)" strokeWidth="4" />
                <path
                  d="M20 24c3-8 8-12 12-12s9 4 12 12"
                  fill="none"
                  stroke="url(#g)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M18 26h28"
                  fill="none"
                  stroke="var(--navy)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity={0.9}
                />
                <path
                  d="M22 46l10-14 10 14"
                  fill="none"
                  stroke="var(--navy)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="brand-title">
              <b>Admisstion triper</b>
              <span>образовательная платформа</span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Навигация">
            <Link to="/about">{t('nav.about', language)}</Link>
            <Link to="/events">{t('nav.events', language)}</Link>
            <Link to="/team">{t('nav.team', language)}</Link>
            <Link to="/contact">{t('nav.contact', language)}</Link>
            <Link to="/pricing">{t('nav.pricing', language)}</Link>
            <Link to="/roadmap">{t('nav.roadmap', language)}</Link>
            <Link to="/qr">{t('nav.qr', language)}</Link>
          </nav>

          <div className="nav-cta">
            <ThemeToggle />
            <LanguageSelector />
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn">
                  {user?.name || t('nav.dashboard', language)}
                </Link>
                <button className="btn" onClick={handleLogout}>
                  {t('nav.logout', language)}
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="btn">
                  {t('nav.login', language)}
                </Link>
                <Link to="/auth/register" className="btn primary">
                  {t('nav.register', language)}
                </Link>
              </>
            )}
            <button
              className="burger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
              aria-expanded={isMenuOpen}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="drawer-top">
                <div className="drawer-title">
                  <span className="logo-badge" style={{ width: '40px', height: '40px' }}>
                    <svg viewBox="0 0 64 64">
                      <defs>
                        <linearGradient id="g-drawer" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="var(--blue)" />
                          <stop offset="1" stopColor="var(--blue2)" />
                        </linearGradient>
                      </defs>
                      <circle cx="32" cy="32" r="29" fill="none" stroke="url(#g-drawer)" strokeWidth="4" />
                    </svg>
                  </span>
                  <span>Admisstion triper</span>
                </div>
                <button
                  className="drawer-close"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="var(--navy)"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="drawer-links">
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.about', language)}</span>
                  <span style={{ opacity: 0.65 }}>›</span>
                </Link>
                <Link to="/events" onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.events', language)}</span>
                  <span style={{ opacity: 0.65 }}>›</span>
                </Link>
                <Link to="/team" onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.team', language)}</span>
                  <span style={{ opacity: 0.65 }}>›</span>
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.contact', language)}</span>
                  <span style={{ opacity: 0.65 }}>›</span>
                </Link>
                <Link to="/roadmap" onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.roadmap', language)}</span>
                  <span style={{ opacity: 0.65 }}>›</span>
                </Link>
                <Link to="/qr" onClick={() => setIsMenuOpen(false)}>
                  <span>{t('nav.qr', language)}</span>
                  <span style={{ opacity: 0.65 }}>›</span>
                </Link>
              </nav>

              <div className="drawer-cta">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="btn primary" onClick={() => setIsMenuOpen(false)}>
                      Профиль
                    </Link>
                    <button className="btn" onClick={handleLogout}>
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="btn primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Войти
                    </Link>
                    <Link to="/auth/register" className="btn" onClick={() => setIsMenuOpen(false)}>
                      Регистрация
                    </Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
