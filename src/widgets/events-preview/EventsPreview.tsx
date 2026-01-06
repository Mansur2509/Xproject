import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const EventsPreview = () => {
  return (
    <section id="events">
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
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Link to="/events" className="btn primary">
            Посмотреть все ивенты
          </Link>
        </div>
      </div>
    </section>
  );
};
