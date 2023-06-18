import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Dashboard() {
  const { push } = useRouter();

  useEffect(() => {
    push('/dashboard/products');
  }, [push]);

  return null;
}

export default Dashboard;
