import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

const login = () => {
  const { registerUser } = useAuth();
  const [loginError, setRegisterError] = useState(
    'This is a big error message. which will be displayed when there is any error related to user registration.'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { user } = await registerUser(email, password);

      // TODO: Add a toast or something that will notify the user about the success
      // TODO: Add a loading spinner

      if (user?.uid) {
        console.log('User created.');
      }
    } catch (error) {
      // TODO: Add a toast or something that will notify the user about the error
      console.log(error);
      setRegisterError(error?.message);
    }
  };

  // ! p-0 in line 38 might need to be removed
  return (
    <>
      {/* <Navbar /> */}

      <section className="container grid my-10 rounded-lg lg:p-0 lg:shadow lg:bg-gray-100 lg:grid-cols-2">
        <div className="p-2 sm:p-6 md:p-10 lg:p-14">
          <h2 className="pb-1 text-2xl font-bold capitalize lg:pb-2 lg:text-3xl">
            Welcome To Kit Kart
          </h2>
          <p className="pb-4 text-gray-600 lg:pb-6 ms-1">
            Welcome back, login to your account
          </p>
          {!loginError.length > 0 && (
            <p className="p-4 mb-5 text-red-600 bg-red-200 rounded-md border-2 border-red-400">
              {loginError}
            </p>
          )}
          <form className="grid gap-2" onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="email">
                Email Address
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="email"
                type="text"
              />
              <p className="text-sm text-red-500">this is a message</p>
            </fieldset>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="password">
                Password
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="password"
                type="password"
              />
              <p className="text-sm text-red-500">this is a message</p>
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
              className="flex gap-2 justify-center items-center py-4 text-lg font-semibold text-gray-500 capitalize rounded-md border-2 border-gray-400">
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
          <h2 className="text-2xl text-gray-500">Animation goes here!</h2>
        </div>
      </section>
    </>
  );
};

export default login;
