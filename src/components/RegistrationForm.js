import React, { useState } from 'react';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showWarningMessage = (message) => {
    setRegistrationStatus(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const calculatePasswordStrength = (password) => {
    const length = password.length;
    const hasSpecialSymbols = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(
      password
    );
    const hasNumbers = /\d+/.test(password);
    const hasCapitalLetters = /[A-Z]+/.test(password);

    if (length >= 10 && hasSpecialSymbols && hasNumbers && hasCapitalLetters) {
      return 'strong';
    } else if (
      (length >= 8 && hasNumbers && hasCapitalLetters) ||
      (length >= 8 && hasSpecialSymbols && hasNumbers) ||
      (length >= 8 && hasSpecialSymbols && hasCapitalLetters)
    ) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showWarningMessage('Password and Confirm Password do not match');
      return;
    }

    // Validate username for forbidden characters
    const forbiddenChars = /[@#$%^&*()!{}[\]:";'<>?,.\\/|+=`~]/;
    if (forbiddenChars.test(username)) {
      showWarningMessage('Username contains forbidden characters');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(birthdate);
    const age = Math.floor(
      (currentDate - selectedDate) / (365.25 * 24 * 60 * 60 * 1000)
    );

    if (age < 16) {
      showWarningMessage(
        'You must be at least 16 years old or older to register'
      );
      return;
    }

    try {
      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      setIsLoading(true); // Set loading state to true

      // Make a POST request to the backend API to register the user
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/auth/register?apiKey=${apiKey}`,
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
        className="bg-slate-700/50 p-5 max-w-1/3 m-5 rounded-md"
        data-aos="zoom-in"
      >
        <div data-aos="zoom-out-down" data-aos-duration="500">
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
              className="flex px-5"
            >
              <div>
                <span
                  className={`text-center text-white rounded-md py-2 px-2 ${
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
                </span>
              </div>
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
                className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
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
                className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
                className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordStrength(
                    e.target.value
                      ? calculatePasswordStrength(e.target.value)
                      : ''
                  );
                }}
                autoComplete="new-password"
              />
              {password && (
                <div
                  className="flex items-center mt-2 transition-all"
                  data-aos="zoom-out-left"
                >
                  <div
                    className={`w-full h-2 mr-2 rounded transition-all ${
                      passwordStrength === 'strong'
                        ? 'bg-green-500'
                        : passwordStrength === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  ></div>
                  <span
                    className={`text-xs transition-all ${
                      passwordStrength === 'strong'
                        ? 'text-green-500'
                        : passwordStrength === 'medium'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  >
                    {passwordStrength === 'strong'
                      ? 'Strong'
                      : passwordStrength === 'medium'
                      ? 'Medium'
                      : 'Weak'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between pb-2">
              <label htmlFor="confirmPassword" className="mb-2 font-semibold">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              {password && (
                <div
                  className="flex items-center mt-2 transition-all"
                  data-aos="zoom-out-right"
                >
                  <div className="w-full h-2 mr-2 rounded"></div>
                  <span
                    className={`text-xs transition-all py-2 ${
                      passwordStrength === 'strong'
                        ? 'text-green-500'
                        : passwordStrength === 'medium'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  ></span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between pb-2">
              <label htmlFor="birthdate" className="mb-2 font-semibold">
                Birthdate:
              </label>
              <input
                type="date"
                id="birthdate"
                className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="py-4"></div>
              <button
                type="submit"
                className={`bg-cyan-500/60 px-5 py-2 mb-2 h-full rounded-md ${
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
            <Link
              to="/login"
              className="text-cyan-500 mx-1 px-1 hover:text-gray-900 hover:bg-cyan-500  dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-cyan-500 rounded-md hover:motion-safe:animate-pulse"
            >
              {' '}
              Sign In Here!
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
