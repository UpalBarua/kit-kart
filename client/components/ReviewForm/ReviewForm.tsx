import { FormEvent, useState } from 'react';
import axios from '@/api/axios';
import useUser from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AiFillStar } from 'react-icons/ai';

interface ReviewFormProps {
  isReviewEditing: boolean;
  productId: string;
  setIsReviewEditing: (value: boolean) => void;
}

function ReviewForm({
  isReviewEditing,
  setIsReviewEditing,
  productId,
}: ReviewFormProps) {
  const [reviewComment, setReviewComment] = useState('');
  const [rating, setRating] = useState(0);

  const {
    userData: { _id },
  } = useUser();

  const queryClient = useQueryClient();

  const { mutate: handleReviewSubmit } = useMutation(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!reviewComment || reviewComment.length === 0) return;

      const newReview = {
        user: _id,
        product: productId,
        rating: rating,
        comment: reviewComment,
      };

      await axios.post('/reviews', newReview);
    },
    {
      onSuccess: () => {
        toast.success('Review added');
        setReviewComment('');
        setIsReviewEditing(false);
        queryClient.invalidateQueries(['reviews']);
      },
      onError: (error: any) => {
        toast.error('Something went wrong');
        console.log(error);
      },
    }
  );

  return (
    <form
      className={`pb-8 ${isReviewEditing ? 'block' : 'hidden'}`}
      onSubmit={handleReviewSubmit}>
      <textarea
        className="p-3 w-full h-40 bg-white rounded-xl border-gray-400 shadow-sm resize-none"
        value={reviewComment}
        onChange={(event) => setReviewComment(event.target.value)}
      />
      <div className="flex justify-between items-center">
        <div>
          {[...Array(5)].map((_, i) => {
            i += 1;
            return (
              <button
                className="focus:outline-0"
                type="button"
                key={i}
                onClick={() => setRating(i)}>
                <AiFillStar
                  className={`text-2xl ${
                    i <= rating ? 'text-orange-300' : 'text-gray-300'
                  }`}
                  key={i}
                />
              </button>
            );
          })}
        </div>
        <button className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md shadow-sm">
          Add Review
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
