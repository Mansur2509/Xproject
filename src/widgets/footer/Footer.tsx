import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div className="logo-badge" style={{ width: '42px', height: '42px' }} aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img" aria-label="Admisstion triper logo small">
                <defs>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--blue)" stopOpacity={0.95} />
                    <stop offset="1" stopColor="var(--blue2)" stopOpacity={0.85} />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="29" fill="none" stroke="url(#g2)" strokeWidth="4" />
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
            <div>
              <b style={{ color: 'var(--navy)', fontWeight: 900 }}>Admisstion triper</b>
              <div className="foot-note">
                Образовательная платформа и комьюнити: дебаты, MUN, тренинги и подготовка к экзаменам.
                <br />© {currentYear} Admisstion triper. Все права защищены.
              </div>
            </div>
          </div>

          <div className="quick" style={{ justifyItems: 'end' }}>
            <Link to="/">Наверх</Link>
            <a href="https://t.me/xprojectinfo" target="_blank" rel="noopener">
              Присоединиться
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
