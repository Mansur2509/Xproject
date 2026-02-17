import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { AboutPage } from '@pages/about';
import { EventsPage } from '@pages/events';
import { TeamPage } from '@pages/team';
import { ContactPage } from '@pages/contact';
import { PricingPage } from '@pages/pricing';
import { QrPage } from '@pages/qr';
import { PublicRoadmapPage } from '@pages/roadmap';
import { LoginPage } from '@pages/auth/login';
import { RegisterPage } from '@pages/auth/register';
import { DashboardPage } from '@pages/dashboard';
import { RoadmapPage } from '@pages/dashboard/roadmap';
import { LessonsPage } from '@pages/dashboard/lessons';
import { StatsPage } from '@pages/dashboard/stats';
import { CoursePage } from '@pages/dashboard/course';
import { CoursesPage } from '@pages/dashboard/courses';
import { ProfilePage } from '@pages/dashboard/profile';
import { SettingsPage } from '@pages/dashboard/settings';
import { AchievementsPage } from '@pages/dashboard/achievements';
import { ProtectedRoute } from '@features/auth/ui/ProtectedRoute';
import { Layout } from '@widgets/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'team',
        element: <TeamPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'roadmap',
        element: <PublicRoadmapPage />,
      },
      {
        path: 'qr',
        element: <QrPage />,
      },
      {
        path: 'auth/login',
        element: <LoginPage />,
      },
      {
        path: 'auth/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/roadmap',
    element: (
      <ProtectedRoute>
        <RoadmapPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/lessons',
    element: (
      <ProtectedRoute>
        <LessonsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/stats',
    element: (
      <ProtectedRoute>
        <StatsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/courses',
    element: (
      <ProtectedRoute>
        <CoursesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/achievements',
    element: (
      <ProtectedRoute>
        <AchievementsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/course/:courseId',
    element: (
      <ProtectedRoute>
        <CoursePage />
      </ProtectedRoute>
    ),
  },
]);

export const RouterProvider = () => {
  return <ReactRouterProvider router={router} />;
};
