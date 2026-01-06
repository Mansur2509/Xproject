import { useState } from 'react';
import { motion } from 'framer-motion';
import { EventBadge, type EventType } from '@widgets/event-badges';
import { useRegistrationsStore } from '@entities/user/model/registrationsStore';
import { useUserStore } from '@entities/user/model/userStore';
import './EventsPage.css';

const events = [
  {
    id: 1,
    title: 'XDebates & Interlyceum Debate Cup',
    description: 'Два крупнейших и уникальных дебатных соревнования в Ташкенте: сильная сетка команд, конкуренция и уровень.',
    date: '15-17 Марта 2026',
    location: 'Ташкент',
    participants: 120,
    type: 'DEBATE' as EventType,
    tags: ['Debate', 'Public Speaking', 'Critical Thinking'],
  },
  {
    id: 2,
    title: 'Образовательные выезды и воркшопы',
    description: 'Тренинги в школах: осведомленность о поступлении в местные и зарубежные вузы — от стратегии до дедлайнов.',
    date: '20 Марта 2026',
    location: 'Разные школы',
    participants: 500,
    type: 'WORKSHOP' as EventType,
    tags: ['Admissions', 'Workshops', 'Guidance'],
  },
  {
    id: 3,
    title: 'XMUN — совместно с Central Asian University',
    description: 'Один из топовых MUN в сотрудничестве с Central Asian University: уровень комитетов и подготовка делегатов.',
    date: '25-27 Марта 2026',
    location: 'Central Asian University',
    participants: 200,
    type: 'MUN' as EventType,
    tags: ['MUN', 'Leadership', 'Diplomacy'],
  },
];

export const EventsPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState<number | null>(null);
  const { addRegistration } = useRegistrationsStore();
  const { isAuthenticated, user } = useUserStore();

  const handleRegister = (eventId: number) => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
    setShowRegistrationForm(eventId);
  };

  const handleSubmitRegistration = (e: React.FormEvent<HTMLFormElement>, eventId: number) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const event = events.find((e) => e.id === eventId);

    if (event) {
      addRegistration({
        eventType: event.type,
        eventName: event.title,
        participantName: (formData.get('name') as string) || user?.name || '',
        email: (formData.get('email') as string) || user?.email || '',
        phone: formData.get('phone') as string,
      });

      alert('Регистрация успешно сохранена в localStorage!');
      setShowRegistrationForm(null);
    }
  };

  return (
    <section id="events" className="events-page">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2>Наши ивенты</h2>
            <p>
              Место под фото и краткое описание того, что XProjectUZ уже сделал. Даты и цифры можно
              добавить позже.
            </p>
          </div>
        </motion.div>

        <div className="events-grid">
          {events.map((event) => (
            <EventBadge
              key={event.id}
              type={event.type}
              name={event.title}
              date={event.date}
              location={event.location}
              participants={event.participants}
              description={event.description}
              onRegister={() => handleRegister(event.id)}
            />
          ))}
        </div>

        {showRegistrationForm && (
          <motion.div
            className="registration-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowRegistrationForm(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Регистрация на событие</h3>
              <form onSubmit={(e) => handleSubmitRegistration(e, showRegistrationForm)}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  defaultValue={user?.name || ''}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={user?.email || ''}
                  required
                />
                <input type="tel" name="phone" placeholder="Телефон" required />
                <div className="modal-actions">
                  <button type="submit" className="btn primary">
                    Зарегистрироваться
                  </button>
                  <button type="button" className="btn" onClick={() => setShowRegistrationForm(null)}>
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="events-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="cta-banner">
            <div>
              <b>Хочешь попасть на следующий ивент?</b>
              <div>Следи за анонсами и регистрациями в Telegram.</div>
            </div>
            <a href="https://t.me/xprojectinfo" target="_blank" rel="noopener" className="btn primary">
              Присоединиться
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
