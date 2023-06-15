import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';

function useUser() {
  const { user } = useAuth();

  const { data: userData = {} } = useQuery(
    ['userData', user?.email],
    async () => {
      try {
        const { data } = await axios.get(`/user/${user?.email}`);
        return data;
      } catch (error: any) {
        throw new Error('Failed to fetch user data');
      }
    },
    {
      enabled: !!user?.email,
    }
  );

  return userData;
}

export default useUser;
