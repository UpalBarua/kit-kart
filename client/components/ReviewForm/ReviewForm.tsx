import { FormEvent, useState } from 'react';
import axios from '@/api/axios';

function ReviewForm({ isReviewEditing }: { isReviewEditing: boolean }) {
  const [reviewComment, setReviewComment] = useState('');

  const handleReviewSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!reviewComment || reviewComment.length === 0) return;

    const newReview = {
      user: '646a98b3ddef6065b84b1809',
      product: '647ae570d16465064a0e6223',
      rating: 5,
      comment: reviewComment,
    };

    try {
      const { data } = await axios.post('/reviews', newReview);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
