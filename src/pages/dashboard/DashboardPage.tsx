import { useUserStore } from '@entities/user/model/userStore';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@widgets/dashboard-layout';
import { StatsCards } from '@widgets/stats-cards';
import { ProgressChart } from '@widgets/progress-chart';
import { RecentActivity } from '@widgets/recent-activity';
import { QuickActions } from '@widgets/quick-actions';
import { TrendingUp } from 'lucide-react';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { user } = useUserStore();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="dashboard-page"
      >
        <div className="dashboard-header">
          <div>
            <h1>Добро пожаловать, {user?.name}! 👋</h1>
            <p>Вот обзор вашего прогресса и активности</p>
          </div>
        </div>

        <StatsCards />

        <div className="dashboard-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="dashboard-card chart-card"
          >
            <div className="card-header">
              <h3>Прогресс обучения</h3>
              <TrendingUp size={20} color="var(--blue)" />
            </div>
            <ProgressChart />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="dashboard-card"
          >
            <div className="card-header">
              <h3>Последняя активность</h3>
            </div>
            <RecentActivity />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="dashboard-card"
        >
          <div className="card-header">
            <h3>Быстрые действия</h3>
          </div>
          <QuickActions />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};
