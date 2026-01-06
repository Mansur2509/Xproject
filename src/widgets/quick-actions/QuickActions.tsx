import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Map, BarChart3, Plus } from 'lucide-react';
import './QuickActions.css';

const actions = [
  { icon: BookOpen, label: 'Начать урок', path: '/dashboard/lessons', color: 'var(--blue)' },
  { icon: Map, label: 'Посмотреть роадмапу', path: '/dashboard/roadmap', color: 'var(--purple)' },
  { icon: BarChart3, label: 'Статистика', path: '/dashboard/stats', color: 'var(--green)' },
  { icon: Plus, label: 'Новый курс', path: '/dashboard/courses', color: 'var(--orange)' },
];

export const QuickActions = () => {
  return (
    <div className="quick-actions">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.div
            key={action.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={action.path} className="action-card" style={{ '--action-color': action.color } as React.CSSProperties}>
              <div className="action-icon">
                <Icon size={24} />
              </div>
              <div className="action-label">{action.label}</div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};
