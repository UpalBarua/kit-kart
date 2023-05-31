import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';

const useWishlist = () => {
  const queryClient = useQueryClient();

  const email = 'upal@mail.com';

  const { data: wishlist = [] } = useQuery(['wishlist', email], async () => {
    try {
      const { data } = await axios.get(`/wishlist?email=${email}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  const { mutate: addToWishlist } = useMutation(
    async (productId: string) => {
      try {
        const { data } = await axios.put(
          `/wishlist?email=${email}&productId=${productId}`
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['wishlist']),
    }
  );

  return {
    wishlist,
    addToWishlist,
  };
};

export default useWishlist;
