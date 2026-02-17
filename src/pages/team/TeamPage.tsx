import { motion } from 'framer-motion';
import { Mail, Linkedin, Award } from 'lucide-react';
import './TeamPage.css';

const teamMembers = [
  {
    id: 1,
    name: 'Мансур',
    role: 'Founder',
    achievements: [
      'Многократный победитель олимпиад по математике; топ-10 на национальных этапах',
      '3 года робототехники + финалист международных соревнований',
      'Web-разработка, ивенты и маркетинг: помогает собрать сильное портфолио',
    ],
    email: 'mansur@xproject.uz',
    linkedin: '#',
  },
  {
    id: 2,
    name: 'Муниса',
    role: 'IELTS mentor',
    achievements: ['IELTS 8.0', 'SAT ERBW 740/800 (в 17 лет)', 'Помогает выстраивать стратегию подготовки'],
    email: 'munisa@xproject.uz',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'Жасур',
    role: 'SAT mentor',
    achievements: ['SAT 1540 overall (в 17 лет)', 'Получил accept в американские университеты', 'Фокус: математика/стратегия'],
    email: 'jasur@xproject.uz',
    linkedin: '#',
  },
  {
    id: 4,
    name: 'Бехруз',
    role: 'IELTS mentor',
    achievements: ['IELTS 7.0 (еще в школе) + HarvardX CS50', 'Победы в олимпиадах', 'Консультировал школьников по поступлению'],
    email: 'behruz@xproject.uz',
    linkedin: '#',
  },
  {
    id: 5,
    name: 'Диана',
    role: 'Admission Consultant • IELTS Support',
    achievements: ['Учеба в Великобритании: Hillcrest Royal School', 'IELTS 7.0', 'Помогает с поступлением в Европу'],
    email: 'diana@xproject.uz',
    linkedin: '#',
  },
];

export const TeamPage = () => {
  return (
    <section id="team" className="team-page">
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

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="member-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <div className="member-header">
                <div className="member-avatar">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="member-name">{member.name}</div>
                  <div className="member-role">{member.role}</div>
                </div>
              </div>

              <div className="member-achievements">
                <div className="achievements-header">
                  <Award size={16} color="var(--blue)" />
                  <b>Портфолио</b>
                </div>
                <ul>
                  {member.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>

              <div className="member-contacts">
                <a href={`mailto:${member.email}`} className="contact-btn">
                  <Mail size={16} />
                  Email
                </a>
                <a href={member.linkedin} className="contact-btn">
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="team-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="cta-banner">
            <span className="pill">
              <span className="dot"></span> Хочешь стать частью команды?
            </span>
            <p>Мы открыты к менторам, волонтерам и организаторам. Напиши в Telegram.</p>
            <a href="https://t.me/xprojectinfo" target="_blank" rel="noopener" className="btn primary">
              Написать / Присоединиться
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
