import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

function Layout({ children, className = '' }: LayoutProps) {
  return (
    <main className="container">
      <Navbar />
      <section className={className}>{children}</section>
      <Footer />
    </main>
  );
}

export default Layout;
