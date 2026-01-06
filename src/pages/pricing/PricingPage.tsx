import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useRegistrationsStore } from '@entities/user/model/registrationsStore';
import { useUserStore } from '@entities/user/model/userStore';
import './PricingPage.css';

const plans = [
  {
    id: 'basic',
    name: 'Базовый',
    nameEn: 'Basic',
    nameUz: 'Asosiy',
    price: 0,
    priceEn: 'Free',
    priceUz: 'Bepul',
    icon: Zap,
    color: 'var(--blue)',
    features: [
      { ru: 'Доступ к базовым урокам', en: 'Access to basic lessons', uz: 'Asosiy darslarga kirish' },
      { ru: 'Участие в вебинарах', en: 'Webinar participation', uz: 'Vebinarlarda qatnashish' },
      { ru: 'Базовые материалы', en: 'Basic materials', uz: 'Asosiy materiallar' },
    ],
  },
  {
    id: 'premium',
    name: 'Премиум',
    nameEn: 'Premium',
    nameUz: 'Premium',
    price: 99,
    priceEn: '$99',
    priceUz: '99$',
    icon: Star,
    color: 'var(--purple)',
    popular: true,
    features: [
      { ru: 'Все из Базового', en: 'Everything from Basic', uz: 'Asosiydan hammasi' },
      { ru: 'IELTS/SAT подготовка', en: 'IELTS/SAT preparation', uz: 'IELTS/SAT tayyorgarlik' },
      { ru: 'Персональный ментор', en: 'Personal mentor', uz: 'Shaxsiy mentor' },
      { ru: 'Приоритетная поддержка', en: 'Priority support', uz: 'Ustuvor qo\'llab-quvvatlash' },
    ],
  },
  {
    id: 'vip',
    name: 'VIP',
    nameEn: 'VIP',
    nameUz: 'VIP',
    price: 199,
    priceEn: '$199',
    priceUz: '199$',
    icon: Crown,
    color: 'var(--orange)',
    features: [
      { ru: 'Все из Премиум', en: 'Everything from Premium', uz: 'Premiumdan hammasi' },
      { ru: 'Индивидуальная программа', en: 'Individual program', uz: 'Individual dastur' },
      { ru: 'Помощь с поступлением', en: 'Admission assistance', uz: 'Qabul yordami' },
      { ru: '24/7 поддержка', en: '24/7 support', uz: '24/7 qo\'llab-quvvatlash' },
    ],
  },
];

export const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { addRegistration } = useRegistrationsStore();
  const { isAuthenticated, user } = useUserStore();
  const [showForm, setShowForm] = useState(false);

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }
    setSelectedPlan(planId);
    setShowForm(true);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plan = plans.find((p) => p.id === selectedPlan);

    addRegistration({
      eventType: 'COURSE',
      eventName: plan?.name || 'Unknown',
      participantName: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    });

    alert('Регистрация успешно сохранена!');
    setShowForm(false);
    setSelectedPlan(null);
  };

  return (
    <section className="pricing-page">
      <div className="container">
        <motion.div
          className="pricing-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Тарифы 💰</h1>
          <p>Выберите план, который подходит именно вам</p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <Star size={16} />
                    Популярный
                  </div>
                )}
                <div className="plan-icon" style={{ background: `${plan.color}15`, color: plan.color }}>
                  <Icon size={32} />
                </div>
                <h3>{plan.name}</h3>
                <div className="plan-price">
                  <span className="price-amount">{plan.price === 0 ? 'Бесплатно' : `${plan.price}$`}</span>
                  {plan.price > 0 && <span className="price-period">/месяц</span>}
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <Check size={18} color="var(--green)" />
                      <span>{feature.ru}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="plan-button"
                  style={{ '--plan-color': plan.color } as React.CSSProperties}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  Выбрать план
                </button>
              </motion.div>
            );
          })}
        </div>

        {showForm && selectedPlan && (
          <motion.div
            className="registration-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Регистрация на тариф</h3>
              <form onSubmit={handleRegister}>
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
                  <button type="button" className="btn" onClick={() => setShowForm(false)}>
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
