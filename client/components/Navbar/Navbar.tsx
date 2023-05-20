import { useState } from 'react';
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
import { BiLogIn } from 'react-icons/bi';

const Navbar = () => {
  // ! dummy state, needs to be removed.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="py-3">
      <nav className="container flex justify-between items-center">
        <Link className="flex gap-2 items-center" href="/">
          <AiOutlineShoppingCart className="text-4xl text-green-500" />
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-green-500 capitalize">
              Kit Kart
            </span>
            <span className="text-sm leading-none text-gray-500 capitalize">
              groceries
            </span>
          </div>
        </Link>
        <ul className="flex gap-2 items-center text-gray-800 lg:gap-4">
          <li>
            <Link
              className="hidden gap-1 items-center px-3 py-2 rounded md:flex hover:bg-gray-100"
              href="/">
              <AiOutlineHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              className="hidden gap-1 items-center px-3 py-2 rounded md:flex hover:bg-gray-100"
              href="/">
              <AiOutlineFire className="text-xl" />
              <span>Hot Deals</span>
            </Link>
          </li>
          <li>
            <Link
              className="hidden gap-1 items-center px-3 py-2 rounded md:flex hover:bg-gray-100"
              href="/">
              <AiOutlineNotification className="text-xl" />
              <span>New Products</span>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <Link
                className="flex gap-1 items-center px-4 py-2 capitalize bg-green-400 rounded-[100vmax] shadow"
                href="/login">
                <BiLogIn className="text-2xl" />
                <span>Sign In</span>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  className="hidden justify-center items-center w-10 h-10 text-pink-600 rounded-full md:flex bg-pink-400/20"
                  href="/">
                  <AiOutlineHeart className="text-2xl" />
                </Link>
              </li>
              <li>
                <Link
                  className="hidden justify-center items-center w-10 h-10 text-green-800 rounded-full md:flex bg-green-500/20"
                  href="/">
                  <AiOutlineShoppingCart className="text-2xl" />
                </Link>
              </li>
              <li className="flex gap-2 items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-100">
                <Image
                  height={10}
                  width={10}
                  className="object-cover object-center w-10 h-10 rounded-full border-2 border-gray-200"
                  // src="https://i.ibb.co/RhdnmJG/dp.jpg"
                  alt="user image"
                />{' '}
                <div className="hidden lg:block">
                  <p className="font-semibold">Upal Barua</p>
                  <p className="text-sm text-gray-600">upal@mail.com</p>
                </div>
              </li>
            </>
          )}
          <li>
            <button className="grid place-content-center p-2 text-gray-600 rounded sm:hidden hover:text-gray-800 hover:bg-gray-100">
              <AiOutlineMenu className="text-3xl" />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
