import { useState } from 'react';
import { DashboardLayout } from '@widgets/dashboard-layout';
import { motion } from 'framer-motion';
import { useUserStore } from '@entities/user/model/userStore';
import { useRegistrationsStore } from '@entities/user/model/registrationsStore';
import { User, Mail, Phone, Calendar, CheckCircle2, Clock, X } from 'lucide-react';
import './ProfilePage.css';

export const ProfilePage = () => {
  const { user } = useUserStore();
  const { registrations, deleteRegistration } = useRegistrationsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });

  const handleSave = () => {
    // Здесь можно добавить сохранение в API
    setIsEditing(false);
    alert('Профиль обновлен!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'var(--green)';
      case 'pending':
        return 'var(--orange)';
      case 'cancelled':
        return 'var(--red)';
      default:
        return 'var(--muted)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'cancelled':
        return <X size={16} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="profile-page"
      >
        <div className="profile-header">
          <h1>Личный кабинет 👤</h1>
          <p>Управление профилем и регистрациями</p>
        </div>

        <div className="profile-grid">
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2>{user?.name || 'Пользователь'}</h2>
            <p className="profile-email">{user?.email}</p>

            <div className="profile-info">
              <div className="info-item">
                <User size={18} color="var(--muted)" />
                <div>
                  <span className="info-label">Имя</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="profile-input"
                    />
                  ) : (
                    <span className="info-value">{user?.name || 'Не указано'}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <Mail size={18} color="var(--muted)" />
                <div>
                  <span className="info-label">Email</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="profile-input"
                    />
                  ) : (
                    <span className="info-value">{user?.email || 'Не указано'}</span>
                  )}
                </div>
              </div>

              <div className="info-item">
                <Phone size={18} color="var(--muted)" />
                <div>
                  <span className="info-label">Телефон</span>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="profile-input"
                      placeholder="+998 XX XXX XX XX"
                    />
                  ) : (
                    <span className="info-value">{formData.phone || 'Не указано'}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <>
                  <button className="btn primary" onClick={handleSave}>
                    Сохранить
                  </button>
                  <button className="btn" onClick={() => setIsEditing(false)}>
                    Отмена
                  </button>
                </>
              ) : (
                <button className="btn primary" onClick={() => setIsEditing(true)}>
                  Редактировать профиль
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            className="registrations-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Мои регистрации ({registrations.length})</h3>
            {registrations.length === 0 ? (
              <div className="empty-state">
                <Calendar size={48} color="var(--muted)" />
                <p>У вас пока нет регистраций</p>
              </div>
            ) : (
              <div className="registrations-list">
                {registrations.map((reg) => (
                  <div key={reg.id} className="registration-item">
                    <div className="registration-header">
                      <div>
                        <h4>{reg.eventName}</h4>
                        <span className="registration-type">{reg.eventType}</span>
                      </div>
                      <div
                        className="registration-status"
                        style={{ color: getStatusColor(reg.status) }}
                      >
                        {getStatusIcon(reg.status)}
                        <span>{reg.status}</span>
                      </div>
                    </div>
                    <div className="registration-details">
                      <div>
                        <strong>Участник:</strong> {reg.participantName}
                      </div>
                      <div>
                        <strong>Email:</strong> {reg.email}
                      </div>
                      <div>
                        <strong>Телефон:</strong> {reg.phone}
                      </div>
                      <div>
                        <strong>Дата регистрации:</strong>{' '}
                        {new Date(reg.date).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        if (confirm('Удалить регистрацию?')) {
                          deleteRegistration(reg.id);
                        }
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};