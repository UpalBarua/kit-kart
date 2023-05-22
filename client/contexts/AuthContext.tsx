import { ReactNode, createContext, useContext } from 'react';
import { app } from '@/firebase/firebase.config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

interface AuthContextProps {
  registerUser: (email: string, password: string) => void;
  googleLogin: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app);
  const googleAuth = new GoogleAuthProvider();

  const registerUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleAuth);
  };

  const value = {
    registerUser,
    googleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
