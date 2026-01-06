import { StrictMode } from 'react';
import '@shared/styles/index.css';
import { AuthProvider, ThemeProvider, LanguageProvider } from './providers';
import { RouterProvider } from './providers';

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <RouterProvider />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );
};
