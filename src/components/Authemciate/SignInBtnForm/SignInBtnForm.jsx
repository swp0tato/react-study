import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authWithGoogleAndPersistSession } from "../../../utils/authService/authServie";
import "./SignInBtnForm.style.css";
import AuthBtn from "../../../common/Authenticate/AuthBtn/AuthBtn";

const SignInBtnForm = ({ handleAuthWithEmail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthWithGoogle = (e) => {
    // 구글 로그인
    e.preventDefault();

    authWithGoogleAndPersistSession(dispatch, navigate);
  };

  const loginBtn = {
    id: "general",
    type: "submit",
    handle: (e) => handleAuthWithEmail(e),
  };

  const socialLoginBtn = {
    type: "submit",
    handle: (e) => handleAuthWithGoogle(e),
  };

  return (
    <div className="auth_btn_wrapper">
      <AuthBtn {...loginBtn}>로그인</AuthBtn>
      <AuthBtn {...socialLoginBtn}>
        <img
          src="https://avatars.githubusercontent.com/u/1342004?s=48&v=4"
          alt="구글아이콘"
        ></img>
        Log in with Google
      </AuthBtn>
    </div>
  );
};

export default SignInBtnForm;
