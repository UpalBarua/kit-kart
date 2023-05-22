import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import Layout from '@/components/Layout/Layout';
import axios from '@/api/axios';
import { toast } from 'react-hot-toast';

const register = () => {
  // TODO : Need to add password validation

  const { registerUser } = useAuth();
  const [registerError, setRegisterError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { user } = await registerUser(email, password);

      // TODO: Add a loading spinner

      if (!user?.uid) return;

      try {
        const { data } = await axios.post('/user', {
          userName: name,
          email,
        });

        if (data?.createdAt) {
          toast.success('Account created successfully');
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setRegisterError(error?.message);
    }
  };

  // ! p-0 in line 38 might need to be removed
  return (
    <Layout>
      <section className="container grid my-10 rounded-lg lg:p-0 lg:shadow lg:bg-gray-100 lg:grid-cols-2">
        <div className="p-2 sm:p-6 md:p-10 lg:p-16">
          <h2 className="pb-1 text-2xl font-bold capitalize lg:pb-2 lg:text-3xl">
            Welcome To Kit Kart
          </h2>
          <p className="pb-4 text-gray-600 lg:pb-6 ms-1">
            Welcome, create your account
          </p>
          {registerError.length > 0 && (
            <p className="p-4 mb-5 text-red-600 bg-red-200 rounded-md border-2 border-red-400">
              {registerError}
            </p>
          )}
          <form className="grid gap-4" onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="name">
                Full Name
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="name"
                type="text"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please enter your name',
                  },
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Name must not exceed 50 characters',
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      'Name should only contain alphabetic characters and spaces',
                  },
                })}
              />
              {errors.name?.message && (
                <p className="text-sm text-red-500">
                  {errors.name?.message.toString()}
                </p>
              )}
            </fieldset>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="email">
                Email Address
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="email"
                type="text"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Please enter your email address',
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email?.message && (
                <p className="text-sm text-red-500">
                  {errors.email?.message.toString()}
                </p>
              )}
            </fieldset>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="password">
                Password
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="password"
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Please enter a password',
                  },
                })}
              />
              {errors.password?.message && (
                <p className="text-sm text-red-500">
                  {errors.password?.message.toString()}
                </p>
              )}
            </fieldset>
            <fieldset className="grid gap-2">
              <label className="capitalize" htmlFor="password2">
                Repeat Password
              </label>
              <input
                className="py-3 rounded-md focus:ring-green-500 focus:outline-none"
                id="password2"
                type="password"
                {...register('password2', {
                  required: {
                    value: true,
                    message: 'Please renter your password',
                  },
                })}
              />
              {errors.password2?.message && (
                <p className="text-sm text-red-500">
                  {errors.password2?.message.toString()}
                </p>
              )}
            </fieldset>
            <div className="flex justify-between">
              <fieldset className="flex gap-2 items-center">
                <input
                  className="text-green-500 rounded focus:ring-0"
                  id="remember"
                  type="checkbox"
                  {...register('remember')}
                />
                <label htmlFor="remember">Remember me</label>
              </fieldset>
              <button className="text-green-500">Forgot password</button>
            </div>
            <button
              type="submit"
              className="py-4 mt-5 text-lg font-semibold text-white capitalize bg-green-500 rounded-md lg:mt-7">
              Register
            </button>
            <button
              type="button"
              className="flex gap-2 justify-center items-center py-4 text-lg font-semibold text-gray-500 capitalize rounded-md border-2 border-gray-400">
              <FcGoogle className="text-xl" />
              <span>Register with Google</span>
            </button>
          </form>
          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link className="text-green-500" href="/login">
              Login
            </Link>
          </p>
        </div>
        <div className="hidden place-content-center bg-gray-200 lg:grid">
          <h2 className="text-2xl text-gray-500">Animation goes here!</h2>
        </div>
      </section>
    </Layout>
  );
};

export default register;
