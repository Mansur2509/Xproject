import { motion } from 'framer-motion';
import { BookOpen, Award, TrendingUp, Clock } from 'lucide-react';
import './StatsCards.css';

const stats = [
  { icon: BookOpen, value: 24, label: 'Пройдено уроков', color: 'var(--blue)', suffix: '' },
  { icon: Award, value: 8, label: 'Достижений', color: 'var(--green)', suffix: '' },
  { icon: TrendingUp, value: 75, label: 'Прогресс курса', color: 'var(--purple)', suffix: '%' },
  { icon: Clock, value: 120, label: 'Часов обучения', color: 'var(--orange)', suffix: 'ч' },
];

export const StatsCards = () => {
  return (
    <div className="stats-cards">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <div className="stat-card-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              <Icon size={24} />
            </div>
            <div className="stat-card-content">
              <div className="stat-card-value">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="stat-card-label">{stat.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
