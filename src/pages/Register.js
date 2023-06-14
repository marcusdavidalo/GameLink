import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import usePageTitle from '../hooks/useTitle';

function Register() {
  usePageTitle(`GameLink | Register`);
  return (
    <div className="text-slate-200 ">
      <div className="p-5 flex justify-center">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Register;
