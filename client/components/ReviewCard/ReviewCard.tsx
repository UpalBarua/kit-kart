import { AiFillLike, AiFillStar } from 'react-icons/ai';
import { Review } from '@/types/review';

const ReviewCard = ({ user, comment, rating, createdAt }: Review) => {
  return (
    <li className="grid gap-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full shadow"></div>
          <p className="font-semibold">{user?.userName}</p>
        </div>
        <div className="flex gap-1 items-center font-semibold">
          <AiFillStar className="text-yellow-500" />
          <span>{rating}</span>
        </div>
      </div>
      <p className="p-1 text-gray-800">{comment}</p>
      <footer className="flex justify-between items-center text-gray-500">
        <div className="flex gap-1 items-center text-lg">
          <AiFillLike />
          <span>{'10'}</span>
        </div>
        <p className="text-sm">{createdAt}</p>
      </footer>
    </li>
  );
};

export default ReviewCard;
