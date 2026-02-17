import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserStore } from '@entities/user/model/userStore';
import { t, useI18nStore } from '@shared/lib/i18n';
import './Hero.css';

export const Hero = () => {
  const { isAuthenticated } = useUserStore();
  const { language } = useI18nStore();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pill">
              <span className="dot"></span> {t('hero.badge', language)}
            </span>
            <h1>{t('hero.title', language)}</h1>
            <p className="lead">{t('hero.lead', language)}</p>

            <div className="hero-actions">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn primary">
                  {t('dashboard.profile', language)}
                </Link>
              ) : (
                <>
                  <Link to="/auth/register" className="btn primary">
                  {t('hero.cta.primary', language)}
                  </Link>
                  <Link to="/events" className="btn">
                  {t('hero.cta.secondary', language)}
                  </Link>
                </>
              )}
            </div>

            <div className="mini" style={{ marginTop: '14px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 22s8-4.5 8-11V6l-8-3-8 3v5c0 6.5 8 11 8 11z"
                  stroke="var(--navy)"
                  strokeWidth="2"
                  opacity="0.85"
                />
                <path
                  d="M8.5 12.2l2.4 2.4 4.8-5"
                  stroke="var(--blue)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <b style={{ color: 'var(--navy)' }}>Фокус на результат:</b> навыки, проекты,
                выступления и сильное портфолио.
              </span>
            </div>
          </motion.div>

          <motion.aside
            className="hero-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-label="Статистика Admisstion triper"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <div>
                <b style={{ display: 'block', fontSize: '16px', color: 'var(--navy)' }}>
                  Что дает Admisstion triper
                </b>
                <span style={{ color: 'var(--muted)', fontSize: '12px', fontWeight: 700 }}>
                  бордовая айдентика
                </span>
              </div>
              <span className="pill" style={{ padding: '6px 10px' }}>
                <span className="dot"></span> 2026
              </span>
            </div>

            <div className="stats">
              <div className="stat">
                <b>Debate</b>
                <span>сильные турниры</span>
              </div>
              <div className="stat">
                <b>MUN</b>
                <span>конференции и опыт</span>
              </div>
              <div className="stat">
                <b>IELTS/SAT</b>
                <span>менторство</span>
              </div>
              <div className="stat">
                <b>Admissions</b>
                <span>портфолио и кейсы</span>
              </div>
            </div>

            <div className="mini">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 11l5-5 5 5"
                  stroke="var(--blue)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6v12"
                  stroke="var(--navy)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>
              <span>Подключайся в Telegram и получай доступ к анонсам, материалам и наборам.</span>
            </div>

            <Link
              to={isAuthenticated ? '/dashboard' : '/auth/register'}
              className="btn primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              Присоединиться
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
