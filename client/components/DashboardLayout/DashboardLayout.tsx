import { ReactNode, useState, useEffect } from 'react';
import { AiOutlineHome, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { BsArchive, BsTruck } from 'react-icons/bs';
import { FiUsers, FiLogOut } from 'react-icons/fi';
import Logo from '@/components/Logo/Logo';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  // {
  //   title: 'Dashboard',
  //   Icon: <AiOutlineHome />,
  //   link: '/dashboard',
  // },
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
];

function DashboardLayout({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { push } = useRouter();
  const { logOut } = useAuth();

  const {
    userData: { isAdmin },
    userIsLoading,
  } = useUser();

  const handleNavToggle = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      push('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userIsLoading && !isAdmin) {
      push('/');
    }
  }, [isAdmin, push, userIsLoading]);

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
            <li>
              <button
                className="flex gap-2 items-center p-2 text-lg"
                onClick={handleLogOut}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <section className="py-2 w-full">{children}</section>
    </main>
  );
}

export default DashboardLayout;
