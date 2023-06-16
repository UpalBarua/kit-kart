import { AiOutlineUser, AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import { Review } from '@/types/review';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';
import useUser from '@/hooks/useUser';

const ReviewCard = ({ _id, user, comment, rating, createdAt }: Review) => {
  const queryClient = useQueryClient();
  const {
    userData: { email },
  } = useUser();

  const { mutate: handleReviewDelete } = useMutation(
    async () => {
      await axios.delete(`/reviews?productId=${_id}`);
    },
    {
      onSuccess: () => {
        toast.success('Review deleted');
        queryClient.invalidateQueries(['reviews']);
      },
      onError: () => {
        toast.error('Failed to delete review');
      },
    }
  );

  return (
    <li className="grid gap-3 p-4 bg-white rounded-md shadow">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center w-8 h-8 text-2xl bg-gray-200 rounded-full shadow-sm">
            <AiOutlineUser />
          </div>
          <div className="ps-1">
            <p className="font-semibold">{user?.userName}</p>
            <p className="text-sm text-gray-600">
              {format(new Date(createdAt), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex gap-1 items-center font-semibold">
          <AiFillStar className="text-yellow-500" />
          <span>{rating}</span>
        </div>
      </div>
      <p className="p-1 text-gray-800">{comment}</p>
      <footer className="flex justify-between items-center text-gray-500">
        {email === user.email && (
          <button
            className="flex gap-1 items-center text-lg"
            onClick={() => handleReviewDelete()}>
            <AiOutlineDelete />
          </button>
        )}
      </footer>
    </li>
  );
};

export default ReviewCard;
