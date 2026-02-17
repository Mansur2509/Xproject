import { motion } from 'framer-motion';
import './ServicesSection.css';

const services = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19V6a2 2 0 0 1 2-2h11a3 3 0 0 1 3 3v12"
          stroke="var(--navy)"
          strokeWidth="2"
          opacity="0.9"
        />
        <path d="M6 18h13" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
    title: 'IELTS: тренинги и поддержка',
    description: 'Speaking/Writing/Reading: разбор ошибок, стратегия и регулярная практика.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12h6l3 8 4-16 2 8h3"
          stroke="var(--blue)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'SAT: Math / ERBW',
    description: 'Тренировки по темам + стратегия повышения балла и анализ ошибок.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7h16M4 12h10M4 17h16"
          stroke="var(--navy)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M16 10l2 2 3-3"
          stroke="var(--blue)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Motivation Letter & CV',
    description: 'Пишем и улучшаем: структура, смысл, стиль, правки и финальная версия.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8 4v6c0 5.5-8 10-8 10S4 17.5 4 12V6l8-4z"
          stroke="var(--navy)"
          strokeWidth="2"
          opacity="0.9"
        />
        <path
          d="M8.5 12.2l2.4 2.4 4.8-5"
          stroke="var(--blue)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Поступление: стратегия и кейсы',
    description: 'Extracurriculars, проекты и позиционирование под страну/университет.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M7 7h10v10H7z" stroke="var(--navy)" strokeWidth="2" opacity="0.9" />
        <path d="M9 9h6v6H9z" fill="rgba(123, 27, 58, 0.18)" stroke="var(--blue)" strokeWidth="2" />
      </svg>
    ),
    title: 'Проектная практика',
    description: 'Мини-проекты и кейсы, которые реально усиливают портфолио.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16v12H4z" stroke="var(--navy)" strokeWidth="2" opacity="0.9" />
        <path
          d="M7 9h10M7 12h8M7 15h6"
          stroke="var(--blue)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Разборы и консультации',
    description: 'Точечная помощь: план, документы, трек и шаги под твои цели.',
  },
];

export const ServicesSection = () => {
  return (
    <section id="whatwedo" style={{ background: 'linear-gradient(180deg,#ffffff,#fbfdff)' }}>
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2>Что мы делаем?</h2>
            <p>
              Онлайн-форматы Admisstion triper: экзамены, поступление, документы и практика — с фидбеком и
              системой.
            </p>
          </div>
        </motion.div>

        <div className="grid-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
