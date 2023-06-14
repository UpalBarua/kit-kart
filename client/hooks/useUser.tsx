import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from '@/api/axios';

function useUser() {
  const { user: currentUser } = useAuth();

  const { data: user = {} } = useQuery(
    ['user', currentUser?.email],
    async () => {
      try {
        const { data } = await axios.get(`/user/${currentUser?.email}`);
        return data;
      } catch (error: any) {
        throw new Error('Failed to fetch user data');
      }
    }
  );

  return {
    user,
  };
}

export default useUser;
