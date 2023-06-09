import { AiFillLike, AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import { Review } from '@/types/review';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';
import useUser from '@/hooks/useUser';

const ReviewCard = ({ _id, user, comment, rating, createdAt }: Review) => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useUser();

  const { mutate: handleReviewDelete } = useMutation(
    async () => {
      try {
        const { data } = await axios.delete(`/reviews?productId=${_id}`);
        toast.success('Review deleted!');
      } catch (error: any) {
        console.log(error.message);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['reviews']),
    }
  );

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
        <div className="flex gap-4">
          <button className="flex gap-1 items-center text-lg">
            <AiFillLike />
            <span>{'10'}</span>
          </button>
          {currentUser?.email === user.email && (
            <button
              className="flex gap-1 items-center text-lg"
              onClick={handleReviewDelete}>
              <AiOutlineDelete />
            </button>
          )}
        </div>
        <p className="text-sm">{format(new Date(createdAt), 'MMMM d, yyyy')}</p>
      </footer>
    </li>
  );
};

export default ReviewCard;
