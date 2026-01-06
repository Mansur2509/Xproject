import { motion } from 'framer-motion';
import { useRegistrationsStore } from '@entities/user/model/registrationsStore';
import { Users, Calendar, MapPin } from 'lucide-react';
import './EventBadges.css';

export type EventType = 'MUN' | 'DEBATE' | 'WORKSHOP' | 'COURSE' | 'OTHER';

interface EventBadgeProps {
  type: EventType;
  name: string;
  date: string;
  location: string;
  participants: number;
  description: string;
  onRegister: () => void;
}

const eventConfig = {
  MUN: { color: 'var(--purple)', label: 'MUN', icon: '🌍' },
  DEBATE: { color: 'var(--blue)', label: 'DEBATE', icon: '💬' },
  WORKSHOP: { color: 'var(--green)', label: 'WORKSHOP', icon: '🎓' },
  COURSE: { color: 'var(--orange)', label: 'COURSE', icon: '📚' },
  OTHER: { color: 'var(--pink)', label: 'OTHER', icon: '⭐' },
};

export const EventBadge = ({
  type,
  name,
  date,
  location,
  participants,
  description,
  onRegister,
}: EventBadgeProps) => {
  const config = eventConfig[type];
  const { getRegistrationsByType } = useRegistrationsStore();
  const registrations = getRegistrationsByType(type);

  return (
    <motion.div
      className="event-badge"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      style={{ '--event-color': config.color } as React.CSSProperties}
    >
      <div className="badge-header">
        <div className="badge-type" style={{ background: `${config.color}15`, color: config.color }}>
          <span className="badge-icon">{config.icon}</span>
          <span className="badge-label">{config.label}</span>
        </div>
        <div className="badge-count">{registrations.length} зарегистрировано</div>
      </div>

      <h3>{name}</h3>
      <p className="badge-description">{description}</p>

      <div className="badge-info">
        <div className="info-item">
          <Calendar size={16} color="var(--muted)" />
          <span>{date}</span>
        </div>
        <div className="info-item">
          <MapPin size={16} color="var(--muted)" />
          <span>{location}</span>
        </div>
        <div className="info-item">
          <Users size={16} color="var(--muted)" />
          <span>{participants} участников</span>
        </div>
      </div>

      <button className="badge-button" onClick={onRegister}>
        Зарегистрироваться
      </button>
    </motion.div>
  );
};
