import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserStore } from '@entities/user/model/userStore';
import './PublicRoadmapPage.css';

const tracks = [
  {
    id: 'sat',
    title: 'SAT Roadmap',
    badge: 'Exam',
    description:
      'От “нулевого уровня” до решенных Bluebook-пакетов: алгебра, геометрия, проценты, тексты и Writing.',
    points: [
      'Базовая математика → алгебра → текстовые задачи → геометрия',
      'Практика в формате SAT (Bluebook-style) с разбором решений',
      'Стратегии по тайм-менеджменту и разбор частых ловушек',
    ],
    to: '/dashboard/roadmap',
  },
  {
    id: 'ielts',
    title: 'IELTS Roadmap',
    badge: 'Exam',
    description:
      'Writing / Speaking / Reading: от структуры эссе до живых speaking-сессий и работы над словарем.',
    points: [
      'Writing Task 1/2: структура, тезис, аргументы и логика',
      'Speaking: Part 1–3, устойчивые формулировки и фидбек',
      'Reading: стратегии под разные типы вопросов (T/F/NG и др.)',
    ],
    to: '/dashboard/roadmap',
  },
];

export const PublicRoadmapPage = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <section className="public-roadmap">
      <div className="container">
        <motion.div
          className="roadmap-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill">
            <span className="dot" /> SAT / IELTS
          </span>
          <h1>Роадмапа подготовки</h1>
          <p>
            Куда идти дальше: коротко по шагам для SAT и IELTS. Детальная версия — внутри личного кабинета
            Admisstion triper.
          </p>
          <div className="roadmap-hero-actions">
            <Link to={isAuthenticated ? '/dashboard/roadmap' : '/auth/register'} className="btn primary">
              {isAuthenticated ? 'Открыть в дашборде' : 'Начать обучение'}
            </Link>
            <Link to="/pricing" className="btn">
              Тарифы
            </Link>
          </div>
        </motion.div>

        <div className="public-roadmap-grid">
          {tracks.map((track, index) => (
            <motion.article
              key={track.id}
              className="public-roadmap-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 * index }}
            >
              <div className="card-top">
                <span className="badge">{track.badge}</span>
                <h2>{track.title}</h2>
                <p className="roadmap-description">{track.description}</p>
              </div>
              <ul className="roadmap-points">
                {track.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="card-footer">
                <Link to={track.to} className="btn primary">
                  Войти в трек
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

