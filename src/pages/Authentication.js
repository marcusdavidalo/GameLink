import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import LoginForm from '../components/LoginForm';

function Authentication() {
  return (
    <div className="text-slate-200 ">
      <div className="p-5 flex justify-center">
        <RegistrationForm />
        <LoginForm />
      </div>
    </div>
  );
}

export default Authentication;
