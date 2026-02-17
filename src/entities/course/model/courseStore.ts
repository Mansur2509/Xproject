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

const mergeCourses = (saved: Course[], nextInitial: Course[]) => {
  const savedMap = new Map(saved.map((c) => [c.id, c]));
  const merged = [...saved];

  for (const course of nextInitial) {
    if (!savedMap.has(course.id)) {
      merged.push(course);
    }
  }

  return merged;
};

// Начальные данные курсов
const initialCourses: Course[] = [
  {
    id: 'sat-bluebook-drills',
    title: 'SAT (Bluebook-style) — Practice Drills',
    description: '5 коротких уроков с заданиями в формате “как в Bluebook”: варианты + проверка + решения',
    category: 'SAT',
    level: 'intermediate',
    duration: 5,
    progress: 0,
    enrolled: false,
    lessons: [
      {
        id: 'sat-bb-1',
        title: 'Урок 1: Линейные уравнения и системы',
        description: '3 задания + 2 способа решения там, где это уместно',
        duration: 25,
        order: 1,
        completed: false,
        content:
          '<h2>Цель урока</h2><p>Отработать базовые “быстрые” темы SAT: линейные уравнения и простые системы. Делай упор на скорость и аккуратность.</p><h3>Правило</h3><p>Перед тем как считать, упростите выражение и проверьте знаки/скобки.</p>',
        exercises: [
          {
            id: 'sat-bb-1-q1',
            type: 'multiple-choice',
            question: 'Решите уравнение: 3(x − 2) = 15. Чему равно x?',
            options: ['3', '5', '7', '9'],
            correctAnswer: '7',
            explanation:
              '<p><b>Способ 1 (раскрыть скобки):</b> 3x − 6 = 15 ⇒ 3x = 21 ⇒ x = 7.</p><p><b>Способ 2 (сначала разделить):</b> x − 2 = 5 ⇒ x = 7.</p><p><b>Проверка:</b> 3(7 − 2) = 3·5 = 15.</p>',
          },
          {
            id: 'sat-bb-1-q2',
            type: 'multiple-choice',
            question: 'Если f(x) = 2x + 3, то чему равно f(4)?',
            options: ['8', '10', '11', '14'],
            correctAnswer: '11',
            explanation:
              '<p>Подставляем x = 4: f(4) = 2·4 + 3 = 8 + 3 = 11.</p><p><b>Лайфхак:</b> сначала удвоить 4, затем прибавить 3.</p>',
          },
          {
            id: 'sat-bb-1-q3',
            type: 'multiple-choice',
            question: 'Решите систему: x + y = 10 и x − y = 2. Чему равно x?',
            options: ['4', '5', '6', '8'],
            correctAnswer: '6',
            explanation:
              '<p><b>Способ 1 (сложить уравнения):</b> (x+y)+(x−y)=10+2 ⇒ 2x=12 ⇒ x=6.</p><p><b>Способ 2 (выразить y):</b> y = 10 − x, подставить: x − (10 − x) = 2 ⇒ 2x = 12 ⇒ x = 6.</p>',
          },
        ],
      },
      {
        id: 'sat-bb-2',
        title: 'Урок 2: Проценты и отношения',
        description: '3 задания на проценты, скидки и пропорции',
        duration: 25,
        order: 2,
        completed: false,
        content:
          '<h2>Цель урока</h2><p>На SAT проценты часто “маскируются” под реальную ситуацию. Держи в голове: процент = доля от 100.</p><h3>Шаблоны</h3><ul><li><b>p% от числа N</b> = (p/100)·N</li><li><b>Увеличить на p%</b> = N·(1 + p/100)</li><li><b>Уменьшить на p%</b> = N·(1 − p/100)</li></ul>',
        exercises: [
          {
            id: 'sat-bb-2-q1',
            type: 'multiple-choice',
            question: 'Цена была 80, затем сделали скидку 25%. Какова новая цена?',
            options: ['55', '60', '65', '70'],
            correctAnswer: '60',
            explanation:
              '<p>Скидка 25% означает, что остаётся 75%: 80·0.75 = 60.</p><p><b>Альтернатива:</b> 25% от 80 — это 20, значит 80−20=60.</p>',
          },
          {
            id: 'sat-bb-2-q2',
            type: 'multiple-choice',
            question: 'Если 30% числа равно 18, то чему равно число?',
            options: ['50', '54', '60', '72'],
            correctAnswer: '60',
            explanation:
              '<p>0.30·N = 18 ⇒ N = 18 / 0.30 = 60.</p><p><b>Быстро:</b> 30% — это 3/10, значит N = 18·(10/3)=60.</p>',
          },
          {
            id: 'sat-bb-2-q3',
            type: 'multiple-choice',
            question: 'Отношение A:B = 3:5. Если A = 24, то чему равно B?',
            options: ['32', '36', '40', '48'],
            correctAnswer: '40',
            explanation:
              '<p>3 части соответствуют 24 ⇒ 1 часть = 8 ⇒ 5 частей = 40.</p>',
          },
        ],
      },
      {
        id: 'sat-bb-3',
        title: 'Урок 3: Writing — грамматика и связки',
        description: '3 задания: пунктуация, согласование, логика связок',
        duration: 25,
        order: 3,
        completed: false,
        content:
          '<h2>Цель урока</h2><p>Отработать типичные “быстрые” вопросы SAT Writing: согласование подлежащего и сказуемого, логичные связки, пунктуация.</p><h3>Подсказка</h3><p>Сначала найди основу предложения (подлежащее + сказуемое), потом проверяй лишние слова.</p>',
        exercises: [
          {
            id: 'sat-bb-3-q1',
            type: 'multiple-choice',
            question:
              'Выберите вариант, который лучше всего завершает предложение:\n\n“The list of items ___ on the table.”',
            options: ['are', 'is', 'were', 'be'],
            correctAnswer: 'is',
            explanation:
              '<p>Подлежащее — <b>list</b> (ед. число), поэтому глагол тоже в ед. числе: <b>is</b>.</p><p><b>Ловушка:</b> “of items” не меняет число подлежащего.</p>',
          },
          {
            id: 'sat-bb-3-q2',
            type: 'multiple-choice',
            question:
              'Выберите самую логичную связку:\n\n“I wanted to study earlier; ___, my internet was down.”',
            options: ['therefore', 'however', 'for example', 'in addition'],
            correctAnswer: 'however',
            explanation:
              '<p>Здесь контраст: хотел учиться, <b>однако</b> интернет не работал. Поэтому подходит <b>however</b>.</p>',
          },
          {
            id: 'sat-bb-3-q3',
            type: 'multiple-choice',
            question:
              'Выберите правильный вариант пунктуации:\n\n“My brother loves cooking ___ he often experiments with new recipes.”',
            options: [', and', '; therefore', ': which', ', however'],
            correctAnswer: ', and',
            explanation:
              '<p>Две независимые части можно соединить “, and” (запятая + союз). Остальные варианты либо меняют смысл, либо грамматически не подходят.</p>',
          },
        ],
      },
      {
        id: 'ielts-bb-4',
        title: 'Урок 4: IELTS Writing Task 2 — тезис и аргументы',
        description: '2 задания + шаблон структуры + мини-пример',
        duration: 25,
        order: 4,
        completed: false,
        content:
          '<h2>Цель урока</h2><p>Собрать сильное введение: перефраз + тезис + план. Дальше — topic sentences в body.</p><h3>Шаблон введения (2–3 предложения)</h3><ol><li>Перефразируй тему</li><li>Чётко обозначь позицию</li><li>Дай план: 2 причины / 2 аспекта</li></ol>',
        exercises: [
          {
            id: 'ielts-bb-4-q1',
            type: 'multiple-choice',
            question:
              'Какой тезис (thesis statement) самый сильный и понятный для IELTS Task 2?\n\nТема: “Some people think online education will replace traditional classrooms.”',
            options: [
              'Online education is good.',
              'Although online education is growing, I believe traditional classrooms will remain essential because they provide real-time interaction and structured support.',
              'Many people have different opinions about online education.',
              'Online education will definitely replace classrooms in the future.',
            ],
            correctAnswer:
              'Although online education is growing, I believe traditional classrooms will remain essential because they provide real-time interaction and structured support.',
            explanation:
              '<p>Сильный тезис: <b>позиция + 2 причины</b>. Здесь есть контраст (“Although…”), чёткая позиция и два аргумента.</p>',
          },
          {
            id: 'ielts-bb-4-q2',
            type: 'multiple-choice',
            question:
              'Выберите лучший topic sentence для первого body paragraph (поддерживает тезис про “real-time interaction”):',
            options: [
              'First, interaction is important in many situations.',
              'One major advantage of traditional classrooms is that students can ask questions immediately and receive instant feedback.',
              'Traditional classrooms have teachers and students.',
              'In conclusion, classrooms are useful.',
            ],
            correctAnswer:
              'One major advantage of traditional classrooms is that students can ask questions immediately and receive instant feedback.',
            explanation:
              '<p>Хороший topic sentence: конкретный, по теме абзаца, и сразу даёт направление аргумента.</p>',
          },
        ],
      },
      {
        id: 'ielts-bb-5',
        title: 'Урок 5: IELTS Reading — True/False/Not Given',
        description: '3 задания + стратегия “ищем точный факт”',
        duration: 25,
        order: 5,
        completed: false,
        content:
          '<h2>Цель урока</h2><p>Отличать <b>False</b> от <b>Not Given</b>. Если в тексте нет информации — это Not Given, даже если “кажется логичным”.</p><h3>Стратегия</h3><ul><li>Найди ключевые слова в утверждении</li><li>Найди место в тексте</li><li>Сравни смысл: совпадает / противоречит / отсутствует</li></ul><h3>Мини-текст</h3><p><i>“The city library expanded its opening hours last year. It now stays open until 9 p.m. on weekdays. According to the director, the change was made to support working adults.”</i></p>',
        exercises: [
          {
            id: 'ielts-bb-5-q1',
            type: 'multiple-choice',
            question: 'Утверждение: “The library closes at 9 p.m. on Saturdays.”',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'Not Given',
            explanation:
              '<p>В тексте сказано только про <b>weekdays</b> (будни). Про субботу информации нет ⇒ <b>Not Given</b>.</p>',
          },
          {
            id: 'ielts-bb-5-q2',
            type: 'multiple-choice',
            question: 'Утверждение: “The library changed its schedule to help working adults.”',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'True',
            explanation:
              '<p>Прямо сказано: “the change was made to support working adults” ⇒ <b>True</b>.</p>',
          },
          {
            id: 'ielts-bb-5-q3',
            type: 'multiple-choice',
            question: 'Утверждение: “The director personally requested the opening hours expansion.”',
            options: ['True', 'False', 'Not Given'],
            correctAnswer: 'Not Given',
            explanation:
              '<p>Директор упомянут как источник (“According to the director”), но нет информации, что это была его личная просьба ⇒ <b>Not Given</b>.</p>',
          },
        ],
      },
    ],
  },
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
  const courses = savedCourses ? mergeCourses(savedCourses, initialCourses) : initialCourses;
  if (savedCourses) {
    storage.set(COURSES_KEY, courses);
  }

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
