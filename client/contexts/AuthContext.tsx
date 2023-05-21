import { ReactNode, createContext, useContext } from 'react';
import { app } from '@/firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

interface AuthContextProps {
  registerUser: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app);

  const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const value = {
    registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
