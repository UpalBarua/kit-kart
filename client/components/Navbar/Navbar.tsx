import Link from 'next/link';
import Image from 'next/image';
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineNotification,
  AiOutlineHeart,
} from 'react-icons/ai';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '../Logo/Logo';

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 py-3 bg-green-50">
      <nav className="flex justify-between items-center">
        <Logo />
        <ul className="flex gap-2 items-center text-gray-800 lg:gap-4">
          <li>
            <Link
              className="hidden gap-1 items-center px-3 py-2 rounded-md md:flex hover:bg-green-100"
              href="/">
              <AiOutlineHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              className="hidden gap-1 items-center px-3 py-2 rounded-md md:flex hover:bg-green-100"
              href="/products">
              <AiOutlineFire className="text-xl" />
              <span>Hot Deals</span>
            </Link>
          </li>
          <li>
            <Link
              className="hidden gap-1 items-center px-3 py-2 rounded-md md:flex hover:bg-green-100"
              href="/">
              <AiOutlineNotification className="text-xl" />
              <span>New Products</span>
            </Link>
          </li>
          {user?.uid ? (
            <>
              <li>
                <Link
                  className="flex justify-center items-center w-10 h-10 text-pink-600 rounded-full bg-pink-400/20"
                  href="/wishlist">
                  <AiOutlineHeart className="text-2xl" />
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-center items-center w-10 h-10 text-green-800 rounded-full bg-green-500/20"
                  href="/cart">
                  <AiOutlineShoppingCart className="text-2xl" />
                </Link>
              </li>
              <li className="flex gap-1 items-center">
                <Link href={'/profile'} className="flex gap-2 items-center">
                  <Image
                    className="object-cover object-center w-10 h-10 rounded-full border-2 border-green-500"
                    src="https://i.ibb.co/RhdnmJG/dp.jpg"
                    alt="user image"
                    height={20}
                    width={20}
                  />{' '}
                  <div className="hidden lg:block">
                    <p className="font-semibold">Upal Barua</p>
                    <p className="text-sm text-gray-600">upal@mail.com</p>
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="login"
                className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md shadow">
                Log In
              </Link>
            </li>
          )}
          <li>
            <button className="grid place-content-center p-2 text-gray-600 rounded sm:hidden hover:text-gray-800 hover:bg-green-100">
              <AiOutlineMenu className="text-3xl" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
