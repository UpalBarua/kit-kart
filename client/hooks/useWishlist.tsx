import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/api/axios';
import useUser from './useUser';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const useWishlist = () => {
  const queryClient = useQueryClient();

  const {
    userData: { email },
  } = useUser();

  const { data: wishlist = [], isLoading: isLoading } = useQuery(
    ['wishlist', email],
    async () => {
      try {
        const { data } = await axios.get(`/wishlist?email=${email}`);
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    {
      enabled: !!email,
    }
  );

  const { mutate: addToWishlist } = useMutation(
    async (productId: string) => {
      if (!email) {
        return toast.error('Must be logged in');
      }

      try {
        await axios.put(`/wishlist?email=${email}&productId=${productId}`);
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
    isLoading,
  };
};

export default useWishlist;
