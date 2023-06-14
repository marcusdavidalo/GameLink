import React from 'react';
import LoginForm from '../components/LoginForm';
import usePageTitle from '../hooks/useTitle';

function Login() {
  usePageTitle(`GameLink | Login`);
  return (
    <div className="text-slate-200 ">
      <div className="p-5 flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
