import React, { useState } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const showWarningMessage = (message) => {
    setRegistrationStatus(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showWarningMessage('Password and Confirm Password do not match');
      return;
    }

    try {
      setIsLoading(true); // Set loading state to true

      // Make a POST request to the backend API to register the user
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/auth/register?apiKey=marcusjaredmahdiskipperpalomaadasbelvisalo`,
        {
          username,
          email,
          password,
          birthdate,
        }
      );

      // Registration successful
      showWarningMessage('User registered successfully');
      setIsLoading(false); // Set loading state to false
      setTimeout(() => {
        showWarningMessage('Redirecting to login page');
      }, 3000);
      // Delay the navigation by 1 second
      setTimeout(() => {
        navigate('/login'); // Redirect to /login page
      }, 4000);
    } catch (error) {
      // Registration failed
      showWarningMessage('Fill up all the fields');
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700/50 p-5 w-1/3 m-5 rounded-md"
      >
        <div className="pb-5 flex flex-row justify-between items-center content-center box-border">
          <h2 className="text-3xl font-semibold py-1">Register</h2>
          <Transition
            show={showMessage}
            enter="transition duration-500 ease-out"
            enterFrom="opacity-0 transform translate-y-[-100%]"
            enterTo="opacity-100 transform translate-y-50"
            leave="transition duration-500 ease-in"
            leaveFrom="opacity-100 transform translate-y-50"
            leaveTo="opacity-0 transform translate-y-[-100%]"
            className="w-full px-5"
          >
            {(ref) => (
              <p
                ref={ref}
                className={`text-center text-white rounded-md py-2 ${
                  registrationStatus === 'User registered successfully' ||
                  registrationStatus === 'Redirecting to login page'
                    ? 'bg-green-600'
                    : registrationStatus === 'Email already exists' ||
                      registrationStatus ===
                        'Password and Confirm Password do not match'
                    ? 'bg-yellow-500'
                    : 'bg-red-600'
                }`}
              >
                {registrationStatus}
              </p>
            )}
          </Transition>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col justify-between pb-2">
            <label htmlFor="username" className="mb-2 font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between pb-2">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between pb-2">
            <label htmlFor="password" className="mb-2 font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col justify-between pb-2">
            <label htmlFor="confirmPassword" className="mb-2 font-semibold">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col justify-between pb-2">
            <label htmlFor="birthdate" className="mb-2 font-semibold">
              Birthdate:
            </label>
            <input
              type="date"
              id="birthdate"
              className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="py-4"></div>
            <button
              type="submit"
              className={`bg-slate-500/60 px-5 py-2 mb-2 h-full rounded-md ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading} // Disable the button when loading
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </div>
        <div className="flex justify-center py-5 font-semibold text-base">
          Already Have an Account?{' '}
          <Link to="/login" className="text-cyan-500 px-2">
            {' '}
            Sign In Here!
          </Link>
        </div>
        <div className="flex flex-col justify-center mt-5">
          <button className="bg-red-600 px-5 py-2 rounded-md mb-4">
            Continue with Google
          </button>
          <button className="bg-blue-400 px-5 py-2 rounded-md mb-4">
            Continue with Twitter
          </button>
          <button className="bg-blue-800 px-5 py-2 rounded-md mb-4">
            Continue with Facebook
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
