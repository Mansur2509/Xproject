import { motion } from 'framer-motion';
import { DashboardLayout } from '@widgets/dashboard-layout';
import { useCourseStore } from '@entities/course/model/courseStore';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Play } from 'lucide-react';
import './RoadmapPage.css';

const courseCategories = [
  {
    id: 'SAT',
    title: 'SAT Preparation',
    description: 'Подготовка к экзамену SAT',
    color: 'var(--blue)',
    courses: ['sat-bluebook-drills', 'sat-math', 'sat-reading', 'sat-writing'],
  },
  {
    id: 'IELTS',
    title: 'IELTS Preparation',
    description: 'Подготовка к экзамену IELTS',
    color: 'var(--blue2)',
    courses: ['ielts-writing', 'ielts-speaking', 'ielts-reading'],
  },
];

export const RoadmapPage = () => {
  const { courses, getCourse, enrollInCourse } = useCourseStore();
  const navigate = useNavigate();

  const handleCourseClick = (courseId: string) => {
    const course = getCourse(courseId);
    if (course) {
      if (!course.enrolled) {
        enrollInCourse(courseId);
      }
      navigate(`/dashboard/course/${courseId}`);
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="roadmap-page"
      >
        <div className="roadmap-header">
          <div>
            <h1>Роадмапа обучения 🗺️</h1>
            <p>Выберите курс и начните обучение</p>
          </div>
        </div>

        <div className="roadmap-categories">
          {courseCategories.map((category, catIndex) => {
            const categoryCourses = courses.filter((c) => category.courses.includes(c.id));

            return (
              <motion.div
                key={category.id}
                className="roadmap-category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <div className="category-header" style={{ '--cat-color': category.color } as React.CSSProperties}>
                  <h2>{category.title}</h2>
                  <p>{category.description}</p>
                </div>

                <div className="courses-grid">
                  {categoryCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      className={`course-card ${course.enrolled ? 'enrolled' : ''}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      onClick={() => handleCourseClick(course.id)}
                    >
                      <div className="course-icon" style={{ background: `${category.color}15`, color: category.color }}>
                        <BookOpen size={24} />
                      </div>

                      <h3>{course.title}</h3>
                      <p className="course-description">{course.description}</p>

                      <div className="course-meta">
                        <div className="meta-item">
                          <Clock size={14} />
                          <span>{course.duration} часов</span>
                        </div>
                        <div className="meta-item">
                          <BookOpen size={14} />
                          <span>{course.lessons.length} уроков</span>
                        </div>
                      </div>

                      {course.enrolled && (
                        <div className="course-progress">
                          <div className="progress-bar">
                            <motion.div
                              className="progress-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              style={{ background: category.color }}
                            />
                          </div>
                          <span className="progress-text">{course.progress}%</span>
                        </div>
                      )}

                      <div className="course-footer">
                        {course.enrolled ? (
                          <button className="course-btn continue" style={{ '--btn-color': category.color } as React.CSSProperties}>
                            <Play size={16} />
                            Продолжить
                          </button>
                        ) : (
                          <button className="course-btn start" style={{ '--btn-color': category.color } as React.CSSProperties}>
                            Начать курс
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};
