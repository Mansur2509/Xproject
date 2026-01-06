import { create } from 'zustand';
import { storage } from '@shared/lib/storage';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // в минутах
  content: string; // HTML контент урока
  videoUrl?: string;
  exercises?: Exercise[];
  completed: boolean;
  order: number;
}

export interface Exercise {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'code';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'SAT' | 'IELTS' | 'ESSAY' | 'MUN' | 'DEBATE';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // общая длительность в часах
  lessons: Lesson[];
  progress: number; // процент завершения
  enrolled: boolean;
  image?: string;
}

const COURSES_KEY = 'courses_data';

// Начальные данные курсов
const initialCourses: Course[] = [
  {
    id: 'sat-math',
    title: 'SAT Math Preparation',
    description: 'Полный курс подготовки к математической части SAT',
    category: 'SAT',
    level: 'intermediate',
    duration: 40,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'sat-math-1',
        title: 'Введение в SAT Math',
        description: 'Основы математики для SAT',
        duration: 45,
        content: '<h2>Введение в SAT Math</h2><p>SAT Math состоит из двух секций: Calculator и No Calculator. В этом уроке мы изучим структуру экзамена и основные стратегии.</p><h3>Структура экзамена</h3><ul><li>No Calculator: 20 вопросов, 25 минут</li><li>Calculator: 38 вопросов, 55 минут</li></ul><p>Общий балл: 200-800</p>',
        order: 1,
        completed: false,
        exercises: [
          {
            id: 'ex1',
            question: 'Сколько секций в SAT Math?',
            type: 'multiple-choice',
            options: ['1', '2', '3', '4'],
            correctAnswer: '2',
            explanation: 'SAT Math состоит из двух секций: No Calculator и Calculator',
          },
        ],
      },
      {
        id: 'sat-math-2',
        title: 'Алгебра: Основы',
        description: 'Линейные уравнения и неравенства',
        duration: 60,
        content: '<h2>Алгебра: Основы</h2><p>Алгебра - это основа математики для SAT. В этом уроке мы изучим линейные уравнения и неравенства.</p><h3>Линейные уравнения</h3><p>Линейное уравнение - это уравнение первой степени вида: <code>ax + b = 0</code></p><h3>Пример 1: Простое уравнение</h3><p>Решите: <code>2x + 5 = 13</code></p><p><strong>Решение:</strong></p><ul><li>Вычитаем 5 из обеих частей: <code>2x = 8</code></li><li>Делим на 2: <code>x = 4</code></li></ul><h3>Пример 2: Уравнение с дробями</h3><p>Решите: <code>(x + 3)/2 = 5</code></p><p><strong>Решение:</strong></p><ul><li>Умножаем обе части на 2: <code>x + 3 = 10</code></li><li>Вычитаем 3: <code>x = 7</code></li></ul><h3>Практика</h3><p>Попробуйте решить самостоятельно:</p><ul><li><code>3x - 7 = 14</code></li><li><code>5(x + 2) = 25</code></li><li><code>2x/3 = 8</code></li></ul>',
        order: 2,
        completed: false,
      },
      {
        id: 'sat-math-3',
        title: 'Геометрия',
        description: 'Площади, объемы, теоремы',
        duration: 55,
        content: '<h2>Геометрия</h2><p>Геометрия составляет значительную часть SAT Math. В этом уроке мы изучим основные фигуры, формулы и теоремы.</p><h3>Площади фигур</h3><ul><li><strong>Прямоугольник:</strong> A = l × w</li><li><strong>Треугольник:</strong> A = (1/2) × b × h</li><li><strong>Круг:</strong> A = πr²</li><li><strong>Трапеция:</strong> A = (1/2) × (a + b) × h</li></ul><h3>Объемы</h3><ul><li><strong>Прямоугольный параллелепипед:</strong> V = l × w × h</li><li><strong>Цилиндр:</strong> V = πr²h</li><li><strong>Сфера:</strong> V = (4/3)πr³</li></ul><h3>Теорема Пифагора</h3><p>Для прямоугольного треугольника: <code>a² + b² = c²</code></p><p>где c - гипотенуза, a и b - катеты.</p>',
        order: 3,
        completed: false,
      },
    ],
  },
  {
    id: 'sat-reading',
    title: 'SAT Reading',
    description: 'Подготовка к секции Reading',
    category: 'SAT',
    level: 'intermediate',
    duration: 35,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'sat-r-1',
        title: 'Стратегии чтения',
        description: 'Как эффективно читать тексты',
        duration: 50,
        content: '<h2>Стратегии чтения</h2><p>Учимся быстро находить ключевую информацию в текстах.</p>',
        order: 1,
        completed: false,
      },
    ],
  },
  {
    id: 'sat-writing',
    title: 'SAT Writing',
    description: 'Грамматика и стиль для SAT',
    category: 'SAT',
    level: 'intermediate',
    duration: 30,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'sat-w-1',
        title: 'Грамматика SAT',
        description: 'Основные правила грамматики',
        duration: 45,
        content: '<h2>Грамматика SAT</h2><p>Изучаем основные грамматические правила для SAT Writing.</p>',
        order: 1,
        completed: false,
      },
    ],
  },
  {
    id: 'ielts-writing',
    title: 'IELTS Writing Task 1 & 2',
    description: 'Мастер-класс по написанию эссе для IELTS',
    category: 'IELTS',
    level: 'intermediate',
    duration: 30,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'ielts-w-1',
        title: 'Структура IELTS Writing',
        description: 'Как правильно структурировать эссе',
        duration: 50,
        content: '<h2>Структура IELTS Writing</h2><p>Правильная структура эссе - ключ к высокому баллу в IELTS Writing. В этом уроке мы разберем каждый элемент структуры.</p><h3>Общая структура эссе</h3><p>Эссе должно состоять из:</p><ol><li><strong>Введение (Introduction)</strong> - 2-3 предложения</li><li><strong>Основная часть (Body)</strong> - 2-3 параграфа</li><li><strong>Заключение (Conclusion)</strong> - 1-2 предложения</li></ol><h3>Введение (Introduction)</h3><p>Введение должно включать:</p><ul><li><strong>Перефразировку вопроса:</strong> Перепишите вопрос своими словами</li><li><strong>Ваше мнение:</strong> Четко выразите свою позицию</li><li><strong>План эссе:</strong> Кратко укажите, что будет рассмотрено</li></ul><h3>Пример введения</h3><blockquote>В современном мире образование играет ключевую роль в жизни каждого человека. Хотя некоторые считают, что университетское образование не обязательно, я убежден, что высшее образование открывает множество возможностей. В этом эссе я рассмотрю преимущества университетского образования и его влияние на карьеру.</blockquote><h3>Основная часть (Body Paragraphs)</h3><p>Каждый параграф должен содержать:</p><ul><li><strong>Topic sentence:</strong> Главная идея параграфа</li><li><strong>Explanation:</strong> Объяснение идеи</li><li><strong>Example:</strong> Конкретный пример</li><li><strong>Link:</strong> Связь с основной темой</li></ul>',
        order: 1,
        completed: false,
      },
      {
        id: 'ielts-w-2',
        title: 'Task 1: Описание графиков',
        description: 'Учимся описывать данные',
        duration: 45,
        content: '<h2>Task 1: Описание графиков</h2><p>При описании графиков важно выделить основные тренды и сравнить данные.</p>',
        order: 2,
        completed: false,
      },
      {
        id: 'ielts-w-3',
        title: 'Task 2: Аргументация',
        description: 'Как строить аргументы',
        duration: 60,
        content: '<h2>Task 2: Аргументация</h2><p>Учимся строить убедительные аргументы и подкреплять их примерами.</p>',
        order: 3,
        completed: false,
      },
    ],
  },
  {
    id: 'ielts-speaking',
    title: 'IELTS Speaking',
    description: 'Подготовка к устной части',
    category: 'IELTS',
    level: 'intermediate',
    duration: 25,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'ielts-s-1',
        title: 'Part 1: Знакомство',
        description: 'Ответы на общие вопросы',
        duration: 40,
        content: '<h2>Part 1: Знакомство</h2><p>В первой части экзаменатор задает общие вопросы о вас.</p>',
        order: 1,
        completed: false,
      },
    ],
  },
  {
    id: 'ielts-reading',
    title: 'IELTS Reading',
    description: 'Стратегии чтения для IELTS',
    category: 'IELTS',
    level: 'intermediate',
    duration: 28,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'ielts-r-1',
        title: 'Типы вопросов',
        description: 'Различные типы вопросов в Reading',
        duration: 50,
        content: '<h2>Типы вопросов</h2><p>В IELTS Reading есть несколько типов вопросов: multiple choice, matching, true/false/not given.</p>',
        order: 1,
        completed: false,
      },
    ],
  },
  {
    id: 'essay-writing',
    title: 'Academic Essay Writing',
    description: 'Написание академических эссе для поступления',
    category: 'ESSAY',
    level: 'advanced',
    duration: 25,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'essay-1',
        title: 'Типы академических эссе',
        description: 'Argumentative, Expository, Narrative',
        duration: 40,
        content: '<h2>Типы академических эссе</h2><p>Существует несколько типов эссе: argumentative (аргументативное), expository (описательное), narrative (повествовательное).</p>',
        order: 1,
        completed: false,
      },
      {
        id: 'essay-2',
        title: 'Структура эссе',
        description: 'Введение, основная часть, заключение',
        duration: 50,
        content: '<h2>Структура эссе</h2><p>Каждое эссе должно иметь четкую структуру: введение с тезисом, основную часть с аргументами и заключение.</p>',
        order: 2,
        completed: false,
      },
      {
        id: 'essay-3',
        title: 'Стиль и тон',
        description: 'Академический стиль письма',
        duration: 45,
        content: '<h2>Стиль и тон</h2><p>Академическое письмо требует формального стиля и объективного тона.</p>',
        order: 3,
        completed: false,
      },
    ],
  },
  {
    id: 'motivation-letter',
    title: 'Motivation Letter',
    description: 'Написание мотивационного письма',
    category: 'ESSAY',
    level: 'advanced',
    duration: 20,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'ml-1',
        title: 'Структура мотивационного письма',
        description: 'Как правильно структурировать письмо',
        duration: 35,
        content: '<h2>Структура мотивационного письма</h2><p>Мотивационное письмо должно включать: введение, основную часть с вашими достижениями и заключение.</p>',
        order: 1,
        completed: false,
      },
    ],
  },
];

interface CourseState {
  courses: Course[];
  getCourse: (id: string) => Course | undefined;
  enrollInCourse: (id: string) => void;
  completeLesson: (courseId: string, lessonId: string) => void;
  updateProgress: (courseId: string) => void;
}

export const useCourseStore = create<CourseState>((set, get) => {
  // Загружаем курсы из localStorage или используем начальные
  const savedCourses = storage.get<Course[]>(COURSES_KEY);
  const courses = savedCourses || initialCourses;

  return {
    courses,

    getCourse: (id) => {
      return get().courses.find((c) => c.id === id);
    },

    enrollInCourse: (id) => {
      const updated = get().courses.map((c) =>
        c.id === id ? { ...c, enrolled: true } : c
      );
      storage.set(COURSES_KEY, updated);
      set({ courses: updated });
    },

    completeLesson: (courseId, lessonId) => {
      const updated = get().courses.map((c) => {
        if (c.id === courseId) {
          const updatedLessons = c.lessons.map((l) =>
            l.id === lessonId ? { ...l, completed: true } : l
          );
          return { ...c, lessons: updatedLessons };
        }
        return c;
      });
      storage.set(COURSES_KEY, updated);
      set({ courses: updated });
      get().updateProgress(courseId);
    },

    updateProgress: (courseId) => {
      const course = get().courses.find((c) => c.id === courseId);
      if (course) {
        const completed = course.lessons.filter((l) => l.completed).length;
        const progress = Math.round((completed / course.lessons.length) * 100);
        const updated = get().courses.map((c) =>
          c.id === courseId ? { ...c, progress } : c
        );
        storage.set(COURSES_KEY, updated);
        set({ courses: updated });
      }
    },
  };
});
