import React from 'react';
import LoginForm from '../components/LoginForm';
import usePageTitle from '../hooks/useTitle';

function Login({ setIsLoggedIn }) {
  usePageTitle(`PlayKoDEX | Login`);
  return (
    <div className="text-slate-200 ">
      <div className="p-5 flex justify-center">
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
}

export default Login;
