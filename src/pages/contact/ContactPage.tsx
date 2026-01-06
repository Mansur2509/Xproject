import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import './ContactPage.css';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact-page">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2>Контакты</h2>
            <p>Для вступления — Telegram проекта. Для партнерств — Telegram фаундеров.</p>
          </div>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="contact-icon">
              <MessageCircle size={32} color="var(--blue)" />
            </div>
            <h3>Telegram проекта</h3>
            <p>@xprojectinfo — вступление, новости, регистрации и наборы.</p>
            <a href="https://t.me/xprojectinfo" target="_blank" rel="noopener" className="btn primary">
              Присоединиться
            </a>
          </motion.div>

          <motion.div
            className="contact-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="contact-icon">
              <Mail size={32} color="var(--purple)" />
            </div>
            <h3>Коллаборации и партнерства</h3>
            <p>По сотрудничеству, медиа и совместным проектам пишите фаундерам:</p>
            <div className="contact-links">
              <a href="https://t.me/ArtAlAfif" target="_blank" rel="noopener" className="btn">
                @ArtAlAfif
              </a>
              <a href="https://t.me/Otvet_mne_uje_nakonec" target="_blank" rel="noopener" className="btn">
                @Otvet_mne_uje_nakonec
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact-card contact-form-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="contact-icon">
              <Send size={32} color="var(--green)" />
            </div>
            <h3>Написать нам</h3>
            {submitted ? (
              <div className="form-success">
                <CheckCircle2 size={48} color="var(--green)" />
                <p>Сообщение отправлено!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <button type="submit" className="btn primary">
                  Отправить
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
