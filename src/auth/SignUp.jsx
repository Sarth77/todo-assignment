import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import ButtonLoader from '../lib/ButtonLoader';
import { signUpFormSchema } from '../lib/validation';



function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset
} = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
  }
});
useEffect(() => {
  const isAuthenticated = !!window.localStorage.getItem('token');
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }
}, [navigate]);
  
const onSubmit = async (data, event) => {
  event.preventDefault();
  clearErrors(["name","email", "password", "error"])
  try {
    const response = await fetch("https://todoapi.1-11.zip/users/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const responseData = await response.json();
    console.log("responseData", responseData);

    if (responseData.status === "Success") {
      window.localStorage.setItem("token", responseData.token);
      window.localStorage.setItem("username", responseData.user.username);
      reset();
      navigate("/");
    } else if (responseData.status === "Failed" || responseData.message === "User already exists") {
      setError("error", { message: responseData.message });
    } else if (Array.isArray(responseData)) {
      setError("error", { message: responseData[0].message });
    }
  } catch (error) {
    setError("error", { message: error });
  }  
};

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <h2 className="text-center text-4xl font-bold leading-tight text-black">
            Todo
          </h2>
          </div>
          <h3 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h3>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="signupname" className="text-base font-medium text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    name='signupname'
                    id='signupname'
                    required
                    {...register('name')}
                  ></input>
                  {errors.name && <span role="alert" className='text-red-400'>{errors.name.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="signupemail" className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    name='signupemail'
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id='signupemail'
                    required
                    {...register('email')}
                  ></input>
                  {errors.email && <span role="alert" className='text-red-400'>{errors.email.message}</span>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="signuppassword" className="text-base font-medium text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    name='signuppassword'
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id='signuppassword'
                    required
                    {...register('password')}
                  ></input>
                  {errors.password && <span role="alert" className='text-red-400'>{errors.password.message}</span>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="signupconfirmpassword" className="text-base font-medium text-gray-900">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    name='signupconfirmpassword'
                    placeholder="Confirm Password"
                    id='signupconfirmpassword'
                    required
                    {...register('confirmPassword')}
                  ></input>
                  {errors.confirmPassword && <span role="alert" className='text-red-400'>{errors.confirmPassword.message}</span>}
                </div>
              </div>
              {errors.error && <span role="alert" className='text-red-400'>{errors.error.message}</span>}
              <div>
                <button
                  disabled={isSubmitting} type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  {isSubmitting ? <ButtonLoader /> : 'Register Now'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp;