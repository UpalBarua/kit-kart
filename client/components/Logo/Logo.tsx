import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function Logo({ className = '' }: { className?: string }) {
  return (
    <Link className={`flex z-10 gap-2 items-center ${className}`} href="/">
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
  );
}

export default Logo;
