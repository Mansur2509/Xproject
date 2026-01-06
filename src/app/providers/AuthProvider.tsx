import { useEffect, type ReactNode } from 'react';
import { useUserStore } from '@entities/user/model/userStore';
import { authApi } from '@shared/api/auth';
import { storage, AUTH_TOKEN_KEY, USER_KEY } from '@shared/lib/storage';
import type { User } from '@entities/user/types';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setUser, setToken, logout } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = storage.get<string>(AUTH_TOKEN_KEY);
      
      if (storedToken) {
        const isValid = await authApi.verifyToken(storedToken);
        
        if (isValid) {
          setToken(storedToken);
          const user = storage.get<User>(USER_KEY);
          if (user) {
            setUser(user);
          }
        } else {
          logout();
          storage.remove(AUTH_TOKEN_KEY);
        }
      }
    };

    checkAuth();
  }, [setUser, setToken, logout]);

  return <>{children}</>;
};
