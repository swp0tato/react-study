import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authWithGoogleAndPersistSession } from '../../../utils/authService/authServie';
import './SignInBtnForm.style.css';
import AuthBtn from '../../../common/Authenticate/AuthBtn/AuthBtn';

const SignInBtnForm = ({ handleAuthWithEmail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthWithGoogle = (e) => {
    // 구글 로그인
    e.preventDefault();

    authWithGoogleAndPersistSession(dispatch, navigate);
  };

  const loginBtn = {
    id: 'general',
    type: 'submit',
    handle: (e) => handleAuthWithEmail(e),
  };

  const socialLoginBtn = {
    type: 'submit',
    handle: (e) => handleAuthWithGoogle(e),
  };

  return (
    <div className="auth_btn_wrapper">
      <AuthBtn {...loginBtn}>로그인</AuthBtn>
      <AuthBtn {...socialLoginBtn}>
        <img
          className="google-icon"
          src="free-icon-google-5968863.png"
          alt="구글아이콘"
        ></img>
        <span className="google-login-text">로그인</span>
      </AuthBtn>
    </div>
  );
};

export default SignInBtnForm;
