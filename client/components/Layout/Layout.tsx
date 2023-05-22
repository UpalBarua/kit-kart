import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <main className={`container ${className}`}>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
