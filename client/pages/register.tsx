import Navbar from '@/components/Navbar/Navbar';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';

const register = () => {
  // * Testing the functionality of firebase auth.

  const { register, handleSubmit } = useForm();
  const { registerUser } = useAuth();

  const handleRegister = async ({ email, password }) => {
    const res = await registerUser(email, password);
    console.log(res);
  };

  return (
    <section>
      <Navbar />
      <form onSubmit={handleSubmit(handleRegister)}>
        <input type="text" {...register('email')} />
        <input type="text" {...register('password')} />
        <button type="submit">register</button>
      </form>
    </section>
  );
};

export default register;
