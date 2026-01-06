import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Map,
  BarChart3,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Calendar,
  Award,
} from 'lucide-react';
import { useUserStore } from '@entities/user/model/userStore';
import { ThemeToggle } from '@widgets/theme-toggle';
import { LanguageSelector } from '@widgets/language-selector';
import './Sidebar.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Дашборд', path: '/dashboard' },
  { icon: BookOpen, label: 'Уроки', path: '/dashboard/lessons' },
  { icon: Map, label: 'Роадмапа', path: '/dashboard/roadmap' },
  { icon: BarChart3, label: 'Статистика', path: '/dashboard/stats' },
  { icon: GraduationCap, label: 'Курсы', path: '/dashboard/courses' },
  { icon: Calendar, label: 'События', path: '/dashboard/events' },
  { icon: Award, label: 'Достижения', path: '/dashboard/achievements' },
  { icon: User, label: 'Профиль', path: '/dashboard/profile' },
  { icon: Settings, label: 'Настройки', path: '/dashboard/settings' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useUserStore();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <motion.aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={false}
      animate={{ width: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="sidebar-header">
        {!collapsed && (
          <motion.div
            className="sidebar-brand"
            initial={{ opacity: 0 }}
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="logo-badge">
              <svg viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="29" fill="none" stroke="url(#grad)" strokeWidth="4" />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <b>XProjectUZ</b>
              <span>Образование</span>
            </div>
          </motion.div>
        )}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              title={collapsed ? item.label : ''}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="sidebar-icon"
              >
                <Icon size={20} />
              </motion.div>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: collapsed ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
              {isActive(item.path) && (
                <motion.div
                  className="active-indicator"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="sidebar-controls">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        )}
        {!collapsed && user && (
          <motion.div
            className="sidebar-user"
            initial={{ opacity: 0 }}
            animate={{ opacity: collapsed ? 0 : 1 }}
          >
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <b>{user.name}</b>
              <span>{user.email}</span>
            </div>
          </motion.div>
        )}
        <button className="sidebar-item logout-btn" onClick={logout} title={collapsed ? 'Выйти' : ''}>
          <LogOut size={20} />
          {!collapsed && <span>Выйти</span>}
        </button>
      </div>
    </motion.aside>
  );
};
