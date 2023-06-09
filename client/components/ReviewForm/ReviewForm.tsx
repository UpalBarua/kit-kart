import { FormEvent, useState } from 'react';
import axios from '@/api/axios';
import useUser from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReviewFormProps {
  isReviewEditing: boolean;
  productId: string;
}

function ReviewForm({ isReviewEditing, productId }: ReviewFormProps) {
  const [reviewComment, setReviewComment] = useState('');
  const { user } = useUser();

  const queryClient = useQueryClient();

  const { mutate: handleReviewSubmit } = useMutation(
    async (event: FormEvent) => {
      event.preventDefault();

      if (!reviewComment || reviewComment.length === 0) return;

      const newReview = {
        user: user?._id,
        product: productId,
        rating: 5,
        comment: reviewComment,
      };

      try {
        const { data } = await axios.post('/reviews', newReview);

        if (data?._id) {
          toast.success('Review added');
          setReviewComment('');
        }
      } catch (error) {
        throw new Error('Failed to submit review');
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['reviews']),
    }
  );

  return (
    <form
      className={`${isReviewEditing ? 'block' : 'hidden'}`}
      onSubmit={handleReviewSubmit}>
      <textarea
        className="p-3 w-full h-40 bg-white rounded-xl border-gray-400 shadow-sm resize-none"
        value={reviewComment}
        onChange={(event) => setReviewComment(event.target.value)}
      />
      <button className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md shadow-sm">
        Add Review
      </button>
    </form>
  );
}

export default ReviewForm;
