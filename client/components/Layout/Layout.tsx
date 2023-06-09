import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className = '' }: LayoutProps) {
  return (
    <main className="container">
      <Navbar />
      <section className={className}>{children}</section>
    </main>
  );
}

export default Layout;
