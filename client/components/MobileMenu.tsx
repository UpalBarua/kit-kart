import Link from 'next/link';

function MobileMenu({ _id }) {
  return (
    <ul className="grid fixed right-8 top-16 gap-3 p-6 bg-white rounded-md shadow-lg">
      <li>
        <Link href="/">
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link href="/products">
          <span>Search</span>
        </Link>
      </li>
      {_id ? (
        <>
          <li>
            <Link href="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link href="/cart">Shopping Cart</Link>
          </li>
          <li className="flex gap-1 items-center">
            <Link href={'/profile'} className="flex gap-2 items-center">
              Profile
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
    </ul>
  );
}

export default MobileMenu;
