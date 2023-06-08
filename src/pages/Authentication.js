import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';

function Authentication() {
  return (
    <div className="text-slate-200 ">
      <h2 className="font-bold text-2xl">Authentication Page</h2>
      <div className="p-5 flex justify-center">
        <RegistrationForm />
        <LoginForm />
      </div>
    </div>
  );
}

export default Authentication;
