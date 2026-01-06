import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardLayout } from '@widgets/dashboard-layout';
import { useCourseStore } from '@entities/course/model/courseStore';
import { Play, CheckCircle2, Lock, Clock, ChevronRight, ChevronLeft, BookOpen } from 'lucide-react';
import './CoursePage.css';

export const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { getCourse, completeLesson } = useCourseStore();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const course = courseId ? getCourse(courseId) : undefined;

  if (!course) {
    return (
      <DashboardLayout>
        <div className="course-not-found">
          <h2>Курс не найден</h2>
          <button className="btn primary" onClick={() => navigate('/dashboard/roadmap')}>
            Вернуться к роадмапе
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const selectedLesson = selectedLessonId
    ? course.lessons.find((l) => l.id === selectedLessonId)
    : course.lessons[0];

  const currentLessonIndex = course.lessons.findIndex((l) => l.id === selectedLesson?.id);
  const nextLesson = course.lessons[currentLessonIndex + 1];
  const prevLesson = course.lessons[currentLessonIndex - 1];

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      completeLesson(course.id, selectedLesson.id);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setSelectedLessonId(nextLesson.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      setSelectedLessonId(prevLesson.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <DashboardLayout>
      <div className="course-page">
        <div className="course-sidebar">
          <div className="sidebar-header">
            <button className="back-btn" onClick={() => navigate('/dashboard/roadmap')}>
              ← Назад к курсам
            </button>
            <h2>{course.title}</h2>
            <div className="course-progress-info">
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  style={{ background: 'var(--blue)' }}
                />
              </div>
              <span>{course.progress}% завершено</span>
            </div>
          </div>

          <div className="lessons-list">
            {course.lessons.map((lesson, index) => {
              const isCompleted = lesson.completed;
              const isCurrent = lesson.id === selectedLesson?.id;
              const isLocked = index > 0 && !course.lessons[index - 1].completed;

              return (
                <button
                  key={lesson.id}
                  className={`lesson-item ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                  onClick={() => !isLocked && setSelectedLessonId(lesson.id)}
                  disabled={isLocked}
                >
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-info">
                    <div className="lesson-title">{lesson.title}</div>
                    <div className="lesson-meta">
                      <Clock size={12} />
                      <span>{lesson.duration} мин</span>
                    </div>
                  </div>
                  <div className="lesson-status">
                    {isLocked ? (
                      <Lock size={16} />
                    ) : isCompleted ? (
                      <CheckCircle2 size={16} color="var(--green)" />
                    ) : (
                      <Play size={16} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="course-content">
          <AnimatePresence mode="wait">
            {selectedLesson && (
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lesson-content"
              >
                <div className="lesson-header">
                  <div>
                    <h1>{selectedLesson.title}</h1>
                    <p className="lesson-description">{selectedLesson.description}</p>
                  </div>
                  {!selectedLesson.completed && (
                    <button className="complete-btn" onClick={handleCompleteLesson}>
                      <CheckCircle2 size={18} />
                      Завершить урок
                    </button>
                  )}
                </div>

                <div className="lesson-body">
                  {selectedLesson.videoUrl && (
                    <div className="video-container">
                      <div className="video-placeholder">
                        <Play size={48} />
                        <p>Видео урок</p>
                      </div>
                    </div>
                  )}

                  <div className="lesson-text-wrapper">
                    <div
                      className="lesson-text"
                      dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                    />
                  </div>

                  {selectedLesson.exercises && selectedLesson.exercises.length > 0 && (
                    <div className="lesson-exercises">
                      <h3>Упражнения</h3>
                      {selectedLesson.exercises.map((exercise) => (
                        <div key={exercise.id} className="exercise-card">
                          <div className="exercise-question">
                            <BookOpen size={20} color="var(--blue)" />
                            <p>{exercise.question}</p>
                          </div>
                          {exercise.type === 'multiple-choice' && exercise.options && (
                            <div className="exercise-options">
                              {exercise.options.map((option, idx) => (
                                <button key={idx} className="option-btn">
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                          <div className="exercise-explanation">
                            <strong>Объяснение:</strong> {exercise.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lesson-navigation">
                  {prevLesson && (
                    <button className="nav-btn prev" onClick={handlePrevLesson}>
                      <ChevronLeft size={20} />
                      Предыдущий урок
                    </button>
                  )}
                  {nextLesson ? (
                    <button className="nav-btn next" onClick={handleNextLesson}>
                      Следующий урок
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button className="nav-btn complete-course" onClick={() => navigate('/dashboard/roadmap')}>
                      Завершить курс
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};
