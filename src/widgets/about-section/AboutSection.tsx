import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutSection.css';

export const AboutSection = () => {
  return (
    <section id="about">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2>О XProjectUZ</h2>
            <p>
              Мы превращаем подготовку к поступлению в понятную систему: действия → результаты →
              сильное портфолио.
            </p>
          </div>
        </motion.div>

        <div className="split">
          <motion.div
            className="banner"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="pill">
              <span className="dot"></span> Наша миссия
            </span>
            <p style={{ margin: '12px 0 0 0', color: 'var(--muted)', fontSize: '14px', fontWeight: 600 }}>
              Создать сильную образовательную среду в Ташкенте и онлайн: где школьники получают не
              только знания, но и реальные достижения — ивенты, проекты, результаты экзаменов и
              поддержку.
            </p>

            <ul className="list">
              <li className="li">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2l2.8 6.2 6.2.6-4.7 4.1 1.4 6.1L12 16.9 6.3 19l1.4-6.1L3 8.8l6.2-.6L12 2z"
                    stroke="#1e66b3"
                    strokeWidth="2"
                  />
                </svg>
                <div>
                  <b>Сильные форматы</b>
                  <span>дебаты, MUN, тренинги и подготовка к поступлению.</span>
                </div>
              </li>
              <li className="li">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h10"
                    stroke="#0f2a44"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </svg>
                <div>
                  <b>Система развития</b>
                  <span>траектории и шаги, а не разрозненные советы.</span>
                </div>
              </li>
              <li className="li">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 21s-7-4.2-7-10V6l7-3 7 3v5c0 5.8-7 10-7 10z"
                    stroke="#0f2a44"
                    strokeWidth="2"
                    opacity="0.85"
                  />
                </svg>
                <div>
                  <b>Сильное окружение</b>
                  <span>команда менторов и комьюнити, которое поддерживает.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V6a2 2 0 0 1 2-2h11a3 3 0 0 1 3 3v12"
                  stroke="#0f2a44"
                  strokeWidth="2"
                  opacity="0.9"
                />
                <path d="M6 18h13" stroke="#1e66b3" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </div>
            <h3>Что внутри</h3>
            <p>Ивенты, воркшопы, менторство по IELTS/SAT, помощь с кейсами и поступлением.</p>

            <div style={{ height: '12px' }}></div>
            <Link to="/auth/register" className="btn primary" style={{ width: '100%' }}>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
