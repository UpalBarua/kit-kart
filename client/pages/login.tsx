import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import Layout from '@/components/Layout/Layout';
import Lottie from 'lottie-react';
import animationData from '@/public/assets/login5.json';
import { useRouter } from 'next/router';
import useUser from '@/hooks/useUser';
import axios from '@/api/axios';

const Login = () => {
  const { logIn, googleLogin } = useAuth()!;
  const [loginError, setRegisterError] = useState('');

  const {
    userData: { _id },
    userIsLoading,
  } = useUser();

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { user } = await logIn(email, password);

      if (user?.uid) {
        push('/');
      }
    } catch (error: any) {
      setRegisterError(error?.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user } = await googleLogin();

      if (Object.keys(user).length > 0) {
        const { data } = await axios.post('/user', {
          userName: user.displayName,
          email: user.email,
        });

        if (data?.createdAt) {
          push('/');
        }
      }
    } catch (error: any) {
      setRegisterError(error.message);
    }
  };

  useEffect(() => {
    if (!userIsLoading && _id) {
      push('/');
    }
  }, [userIsLoading, _id, push]);

  return (
    <Layout>
      <section className="container grid my-10 rounded-lg lg:p-0 lg:shadow lg:bg-gray-100 lg:grid-cols-2">
        <div className="p-2 sm:p-6 md:p-10 lg:p-14">
          <h2 className="pb-1 text-2xl font-bold capitalize lg:pb-2 lg:text-3xl">
            Welcome To Kit Kart
          </h2>
          <p className="pb-4 text-gray-600 lg:pb-6 ms-1">
            Welcome back, login to your account
          </p>
          {loginError.length > 0 && (
            <p className="p-4 mb-5 text-red-600 bg-red-200 rounded-md border-2 border-red-400">
              {loginError}
            </p>
          )}
          <form className="grid gap-2" onSubmit={handleSubmit(handleLogIn)}>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="email">
                Email Address
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="email"
                type="text"
                {...register('email')}
              />
            </fieldset>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="password">
                Password
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="password"
                type="password"
                {...register('password')}
              />
            </fieldset>
            <div className="flex justify-between">
              <fieldset className="flex gap-2 items-center">
                <input
                  className="text-green-500 rounded focus:ring-0"
                  id="remember"
                  type="checkbox"
                />
                <label htmlFor="remember">Remember me</label>
              </fieldset>
              <button className="text-green-500">Forgot password</button>
            </div>
            <button
              type="submit"
              className="py-4 mt-5 mb-2 text-lg font-semibold text-white capitalize bg-green-500 rounded-md lg:mt-7">
              Login
            </button>
            <button
              type="button"
              className="flex gap-2 justify-center items-center py-4 text-lg font-semibold text-gray-500 capitalize rounded-md border-2 border-gray-400"
              onClick={handleGoogleLogin}>
              <FcGoogle className="text-xl" />
              <span>Register with Google</span>
            </button>
          </form>
          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link className="text-green-500" href="/register">
              Register
            </Link>
          </p>
        </div>
        <div className="hidden place-content-center bg-gray-200 lg:grid">
          <Lottie
            className="scale-110"
            animationData={animationData}
            loop={true}></Lottie>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
