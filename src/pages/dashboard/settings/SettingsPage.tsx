import { DashboardLayout } from '@widgets/dashboard-layout';
import { motion } from 'framer-motion';

export const SettingsPage = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Настройки</h1>
        <p>Страница в разработке...</p>
      </motion.div>
    </DashboardLayout>
  );
};
