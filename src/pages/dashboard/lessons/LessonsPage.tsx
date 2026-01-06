import { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@widgets/dashboard-layout';
import { Play, CheckCircle2, Clock, BookOpen, Search } from 'lucide-react';
import './LessonsPage.css';

const lessons = [
  {
    id: 1,
    title: 'IELTS Writing Task 1: Описание графиков',
    description: 'Учимся описывать графики, диаграммы и таблицы',
    duration: '45 мин',
    status: 'completed',
    category: 'IELTS',
    level: 'Intermediate',
    progress: 100,
  },
  {
    id: 2,
    title: 'IELTS Writing Task 2: Эссе',
    description: 'Структура эссе и аргументация',
    duration: '60 мин',
    status: 'in-progress',
    category: 'IELTS',
    level: 'Intermediate',
    progress: 65,
  },
  {
    id: 3,
    title: 'SAT Math: Алгебра',
    description: 'Основы алгебры для SAT',
    duration: '50 мин',
    status: 'available',
    category: 'SAT',
    level: 'Beginner',
    progress: 0,
  },
  {
    id: 4,
    title: 'SAT Math: Геометрия',
    description: 'Геометрические задачи',
    duration: '55 мин',
    status: 'available',
    category: 'SAT',
    level: 'Intermediate',
    progress: 0,
  },
  {
    id: 5,
    title: 'SAT Reading: Понимание текста',
    description: 'Стратегии чтения и анализа',
    duration: '40 мин',
    status: 'available',
    category: 'SAT',
    level: 'Advanced',
    progress: 0,
  },
  {
    id: 6,
    title: 'Motivation Letter: Структура',
    description: 'Как правильно структурировать мотивационное письмо',
    duration: '30 мин',
    status: 'available',
    category: 'Admissions',
    level: 'Beginner',
    progress: 0,
  },
];

export const LessonsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'IELTS', 'SAT', 'Admissions'];
  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'all' || lesson.category === selectedCategory)
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lessons-page"
      >
        <div className="lessons-header">
          <div>
            <h1>Уроки 📚</h1>
            <p>Изучайте материалы и улучшайте свои навыки</p>
          </div>
        </div>

        <div className="lessons-filters">
          <div className="search-box">
            <Search size={20} color="var(--muted)" />
            <input
              type="text"
              placeholder="Поиск уроков..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'Все' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="lessons-grid">
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className={`lesson-card ${lesson.status}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="lesson-header">
                <div className="lesson-category">{lesson.category}</div>
                {lesson.status === 'completed' && (
                  <CheckCircle2 size={20} color="var(--green)" />
                )}
                {lesson.status === 'in-progress' && (
                  <div className="progress-badge">{lesson.progress}%</div>
                )}
              </div>

              <h3>{lesson.title}</h3>
              <p className="lesson-description">{lesson.description}</p>

              <div className="lesson-meta">
                <div className="lesson-info">
                  <Clock size={16} color="var(--muted)" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="lesson-level">{lesson.level}</div>
              </div>

              {lesson.status === 'in-progress' && (
                <div className="lesson-progress">
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${lesson.progress}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ background: 'var(--blue)' }}
                    />
                  </div>
                </div>
              )}

              <div className="lesson-actions">
                {lesson.status === 'completed' && (
                  <button className="btn-review">
                    <BookOpen size={16} />
                    Повторить
                  </button>
                )}
                {lesson.status === 'in-progress' && (
                  <button className="btn-continue">
                    <Play size={16} />
                    Продолжить
                  </button>
                )}
                {lesson.status === 'available' && (
                  <button className="btn-start">
                    <Play size={16} />
                    Начать
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};
