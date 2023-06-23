import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [username, setUsername] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = useCallback(
    async (token) => {
      try {
        // Decode the token to get the user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Update the URL to include the user ID
        const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
        const response = await axios.get(
          `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${apiKey}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          setUsername(response.data.username);
          if (response.data.admin) {
            navigate('/admin');
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setLoginStatus('Login successful');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);

        await fetchUserData(token);
      }
    };

    checkLoggedInStatus();
  }, [fetchUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      const response = await axios.post(
        `https://api-gamelinkdb.onrender.com/api/auth/login?apiKey=${apiKey}`,
        { email, password, rememberMe },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        // Login successful
        setLoginStatus('Login successful');
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);

        localStorage.setItem('token', response.data.token);

        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }

        await fetchUserData(response.data.token);
      } else {
        // Login failed
        setLoginStatus(response.data.error);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }
    } catch (error) {
      // Login failed
      console.log(error);
      setLoginStatus('An error occurred while logging in');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700/50 p-5 w-full md:w-1/3 m-5 rounded-md"
        data-aos="zoom-in"
      >
        <div data-aos="zoom-out-down" data-aos-duration="500">
          <div className="pb-5 flex flex-row justify-between items-center content-center box-border">
            <h2 className="text-3xl font-semibold py-1">Login</h2>
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
                <div>
                  <p
                    ref={ref}
                    className={`text-center text-white rounded-md py-2 ${
                      loginStatus === 'Login successful'
                        ? 'bg-green-600'
                        : 'bg-red-600'
                    }`}
                  >
                    {loginStatus}
                  </p>
                </div>
              )}
            </Transition>
          </div>
          {username && (
            <p
              className="text-center text-white my-2 p-2 bg-green-600 rounded-md"
              data-aos="zoom-out"
            >
              Logged in as {username}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4">
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
              />
            </div>
            <div className="flex flex-col justify-between pb-2">
              <label htmlFor="password" className="mb-2 font-semibold">
                Password:
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <div className="flex justify-evenly items-center w-full">
              <div className="flex justify-center items-center text-base font-semibold">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="w-auto px-2 whitespace-nowrap"
                >
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                className="bg-slate-500/60 px-5 py-2 mb-2 rounded-md w-full ml-5"
              >
                Login
              </button>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center mt-5">
            <button className="bg-red-600 px-5 py-2 rounded-md mb-4">
              Continue with Google
            </button>
            <button className="bg-blue-400 px-5 py-2 rounded-md mb-4">
              Continue with Twitter
            </button>
            <button className="bg-blue-800 px-5 py-2 rounded-md mb-4">
              Continue with Facebook
            </button>
          </div> */}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
