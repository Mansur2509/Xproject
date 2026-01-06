import { create } from 'zustand';
import { storage, AUTH_TOKEN_KEY, USER_KEY } from '@shared/lib/storage';
import type { User } from '../types';

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: storage.get<User>(USER_KEY),
  token: storage.get<string>(AUTH_TOKEN_KEY),
  isAuthenticated: !!storage.get<string>(AUTH_TOKEN_KEY),
  setUser: (user) => {
    if (user) {
      storage.set(USER_KEY, user);
    } else {
      storage.remove(USER_KEY);
    }
    set({ user, isAuthenticated: !!user });
  },
  setToken: (token) => {
    if (token) {
      storage.set(AUTH_TOKEN_KEY, token);
    } else {
      storage.remove(AUTH_TOKEN_KEY);
    }
    set({ token });
  },
  logout: () => {
    storage.remove(AUTH_TOKEN_KEY);
    storage.remove(USER_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
