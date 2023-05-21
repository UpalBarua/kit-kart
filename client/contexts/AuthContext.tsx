import { ReactNode, createContext, useContext } from 'react';
import { app } from '@/firebase/firebase.config';
import { getAuth } from 'firebase/auth';

interface AuthContextProps {
  printHelloWorld: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app);

  const printHelloWorld = () => {
    console.log('Hello world');
  };

  const value = {
    printHelloWorld,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
