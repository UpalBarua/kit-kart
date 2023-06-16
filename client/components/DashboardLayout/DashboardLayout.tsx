import { ReactNode, useReducer, useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from 'react-icons/ai';
import Link from 'next/link';
import { BsArchive, BsTruck } from 'react-icons/bs';
import { BiCog } from 'react-icons/bi';
import { FiUsers, FiLogOut } from 'react-icons/fi';
import Logo from '@/components/Logo/Logo';
import { useAuth } from '@/contexts/AuthContext';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';

const links = [
  {
    title: 'Dashboard',
    Icon: <AiOutlineHome />,
    link: '/dashboard',
  },
  {
    title: 'Products',
    Icon: <BsArchive />,
    link: '/dashboard/products',
  },
  {
    title: 'Orders',
    Icon: <BsTruck />,
    link: '/dashboard/orders',
  },
  {
    title: 'Users',
    Icon: <FiUsers />,
    link: '/dashboard/users',
  },
  {
    title: 'Logout',
    Icon: <FiLogOut />,
    link: '/dashboard/logout',
  },
];

function DashboardLayout({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const {
    userData: { isAdmin },
  } = useUser();
  const router = useRouter();

  const handleNavToggle = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  if (!isAdmin) {
    return <p>You are not a admin</p>;
  }

  return (
    <main className="container flex flex-col gap-5 items-start py-2 lg:flex-row">
      <div>
        <header className="flex gap-2 items-center lg:hidden">
          <button
            className="z-10 p-2 text-2xl bg-green-100 rounded-md"
            onClick={handleNavToggle}>
            <AiOutlineMenu />
          </button>
          <Logo />
        </header>
        <nav
          className={`fixed top-0 left-0 px-3 pt-16 w-2/3 h-full lg:w-56 lg:p-5 lg:my-5 transition bg-white lg:translate-x-0 lg:static rounded-md shadow-sm ${
            isNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <Logo className="hidden pb-4 lg:flex" />
          <ul>
            {links.map(({ title, Icon, link }, i) => (
              <li key={i}>
                <Link
                  className="flex gap-2 items-center p-2 text-lg"
                  href={link}>
                  {Icon}
                  <span>{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <section className="w-full">{children}</section>
    </main>
  );
}

export default DashboardLayout;
