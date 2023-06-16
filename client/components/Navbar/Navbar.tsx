import Link from 'next/link';
import Logo from '../Logo/Logo';
import useUser from '@/hooks/useUser';
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineNotification,
  AiOutlineHeart,
  AiOutlineUser,
} from 'react-icons/ai';

function Navbar() {
  const {
    userData: { _id, email, userName },
  } = useUser();

  return (
    <header className="sticky top-0 z-30 py-3 bg-green-50">
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
          {_id ? (
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
                  <div className="flex justify-center items-center w-10 h-10 text-green-800 bg-gray-200 rounded-full">
                    <AiOutlineUser className="text-3xl" />
                  </div>
                  <div className="hidden lg:block">
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-gray-600">{email}</p>
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/login"
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
