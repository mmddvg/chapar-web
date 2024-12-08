import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  username: string;
}

interface JwtContextProps {
  jwt: string | null;
  user: User | null;
  setJwt: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

const JwtContext = createContext<JwtContextProps | undefined>(undefined);

export const JwtProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Fetch user info if JWT is available
  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      setJwt(token);
      fetchUserInfo(token);
    } else if (!router.pathname.startsWith('/auth')) {
      router.push('/auth');
    }
  }, [router.pathname]);

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8080/restricted/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
      } else {
        // If token is invalid, clear it and redirect to login
        Cookies.remove('jwt');
        setJwt(null);
        setUser(null);
        router.push('/auth');
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      Cookies.remove('jwt');
      setJwt(null);
      setUser(null);
      router.push('/auth');
    }
  };

  return (
    <JwtContext.Provider value={{ jwt, user, setJwt, setUser }}>
      {children}
    </JwtContext.Provider>
  );
};

export const useJwt = (): JwtContextProps => {
  const context = useContext(JwtContext);
  if (!context) {
    throw new Error('useJwt must be used within a JwtProvider');
  }
  return context;
};
