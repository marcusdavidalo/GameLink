// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the backend API to register the user
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      // Registration successful
      console.log('User registered successfully');
    } else {
      // Registration failed
      const data = await response.json();
      console.log(data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700/50 p-5 m-5 rounded-md"
    >
      <h2>Register</h2>
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
        />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="bg-slate-500/60 px-5 py-2 rounded-md">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
