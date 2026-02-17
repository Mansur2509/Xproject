import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const TeamPreview = () => {
  return (
    <section id="team" style={{ background: 'linear-gradient(180deg,#fbfdff,#ffffff)' }}>
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2>Команда</h2>
            <p>
              Founder-ы, консультанты и менторы Admisstion triper. Коротко о главном — и место под фото
              каждого.
            </p>
          </div>
        </motion.div>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Link to="/team" className="btn primary">
            Посмотреть команду
          </Link>
        </div>
      </div>
    </section>
  );
};
