import { useSelector } from 'react-redux';
import React from 'react';

import RegisterPartTwo from './RegisterPartTwo';
import RegisterPartOne from './RegisterPartOne';

const RegisterForm = (props) => {
  const auth = useSelector((state) => state.auth);
  const { updatedRegisterView, isAuthenticated } = auth;
  if (isAuthenticated) {
    props.history.push('/home');
  }
  return (
    <div className="container">
      {
        updatedRegisterView
          ? <RegisterPartTwo />
          : <RegisterPartOne auth={auth} />
      }
    </div>
  );
};

export default RegisterForm;
