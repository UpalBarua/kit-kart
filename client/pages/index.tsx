import Navbar from '@/components/Navbar/Navbar';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { printHelloWorld } = useAuth();

  return (
    <div>
      <Navbar />
      <h1 className="p-10 text-6xl font-semibold text-red-600">
        Abir ekta bishal bokachoda!
      </h1>
      <button onClick={printHelloWorld}>Print</button>
    </div>
  );
};

export default Home;
