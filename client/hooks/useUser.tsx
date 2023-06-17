import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';

function useUser() {
  const {
    user: { email },
  } = useAuth()!;

  const { data: userData = {}, isLoading: userIsLoading } = useQuery(
    ['userData', email],
    async () => {
      try {
        const { data } = await axios.get(`/user/${email}`);
        return data;
      } catch (error: any) {
        throw new Error('Failed to fetch user data');
      }
    },
    {
      enabled: !!email,
    }
  );

  return { userData, userIsLoading };
}

export default useUser;
