import React, { useState } from 'react';
import './Authenticate.style.css';
import PageWrapper from '../../../components/Authenticate/PageWrapper/PageWrapper';
import SignInBtnForm from '../../../components/Authenticate/SignInBtnForm/SignInBtnForm';
import SignInForm from '../../../components/Authenticate/SignInForm/SignInForm';
import { authWithEmailandPassword } from '../../../utils/authService/authServie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Authenticate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStyle = {
    justifyConetent: 'center',
    alignItem: 'center',
  };

  const handleAuthWithEmail = (e) => {
    //이메일 로그인
    e.preventDefault();

    authWithEmailandPassword(email, password, navigate, dispatch);
  };

  return (
    <PageWrapper {...authStyle}>
      <div className="auth_title">
        <h2>로그인</h2>
        <div>소셜 로그인 및 이메일로 로그인할 수 있습니다.</div>
        <SignInForm
          setEmail={setEmail}
          email={email}
          setPassword={setPassword}
          password={password}
        />
      </div>
      <SignInBtnForm handleAuthWithEmail={handleAuthWithEmail} />
    </PageWrapper>
  );
};

export default Authenticate;
