import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import useUser from './useUser';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const useWishlist = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: wishlist = [] } = useQuery(
    ['wishlist', user.email],
    async () => {
      try {
        const { data } = await axios.get(`/wishlist?email=${user.email}`);
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    {
      enabled: !!user.email,
    }
  );

  const { mutate: addToWishlist } = useMutation(
    async (productId: string) => {
      if (!user?.email) {
        return toast.error('Must be logged in');
      }

      try {
        await axios.put(`/wishlist?email=${user.email}&productId=${productId}`);
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
