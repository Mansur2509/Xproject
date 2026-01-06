import { motion } from 'framer-motion';
import { CheckCircle2, BookOpen, Award, Clock } from 'lucide-react';
import './RecentActivity.css';

const activities = [
  { icon: CheckCircle2, text: 'Завершен урок "Основы IELTS Writing"', time: '2 часа назад', color: 'var(--green)' },
  { icon: BookOpen, text: 'Начат курс "SAT Math Preparation"', time: '5 часов назад', color: 'var(--blue)' },
  { icon: Award, text: 'Получено достижение "Первые шаги"', time: 'Вчера', color: 'var(--orange)' },
  { icon: Clock, text: 'Запланирован урок на завтра', time: '2 дня назад', color: 'var(--purple)' },
];

export const RecentActivity = () => {
  return (
    <div className="recent-activity">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <motion.div
            key={index}
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ x: 4 }}
          >
            <div className="activity-icon" style={{ background: `${activity.color}15`, color: activity.color }}>
              <Icon size={18} />
            </div>
            <div className="activity-content">
              <div className="activity-text">{activity.text}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
