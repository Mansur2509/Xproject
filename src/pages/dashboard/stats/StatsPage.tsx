import { motion } from 'framer-motion';
import { DashboardLayout } from '@widgets/dashboard-layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './StatsPage.css';

const studyData = [
  { name: 'Пн', hours: 3 },
  { name: 'Вт', hours: 5 },
  { name: 'Ср', hours: 4 },
  { name: 'Чт', hours: 6 },
  { name: 'Пт', hours: 4 },
  { name: 'Сб', hours: 2 },
  { name: 'Вс', hours: 3 },
];

const categoryData = [
  { name: 'IELTS', value: 45, color: '#3b82f6' },
  { name: 'SAT', value: 30, color: '#8b5cf6' },
  { name: 'Admissions', value: 25, color: '#10b981' },
];

export const StatsPage = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="stats-page"
      >
        <div className="stats-header">
          <div>
            <h1>Статистика 📊</h1>
            <p>Анализ вашего прогресса и активности</p>
          </div>
        </div>

        <div className="stats-grid">
          <motion.div
            className="stats-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3>Часы обучения по дням</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                <XAxis dataKey="name" stroke="var(--muted)" fontSize={12} />
                <YAxis stroke="var(--muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="stats-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Распределение по категориям</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          className="stats-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="summary-card">
            <div className="summary-value">27</div>
            <div className="summary-label">Всего часов</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">24</div>
            <div className="summary-label">Пройдено уроков</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">8</div>
            <div className="summary-label">Достижений</div>
          </div>
          <div className="summary-card">
            <div className="summary-value">75%</div>
            <div className="summary-label">Средний прогресс</div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};
