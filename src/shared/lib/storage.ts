export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};

export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_KEY = 'user';
export const REMEMBER_ME_KEY = 'remember_me';

// Re-export для удобства
export const storageKeys = {
  AUTH_TOKEN: AUTH_TOKEN_KEY,
  USER: USER_KEY,
  REMEMBER_ME: REMEMBER_ME_KEY,
};
