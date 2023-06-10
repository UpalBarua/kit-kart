import Image from 'next/image';

interface CategoryCardProps {
  title: string;
  icon: string;
  bgColor: string;
}

function CategoryCard({ title, icon, bgColor }: CategoryCardProps) {
  return (
    <li
      className={`grid justify-items-center items-center p-4 text-center rounded-md shadow-sm md:p-6 bg-${bgColor}-100`}>
      <Image
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        src={icon}
        alt={title}
        height={100}
        width={100}
      />
      <p className="pt-3 text-sm font-semibold text-black sm:text-base md:text-lg">
        {decodeURIComponent(title).split(' ')[0]}
      </p>
    </li>
  );
}

export default CategoryCard;
