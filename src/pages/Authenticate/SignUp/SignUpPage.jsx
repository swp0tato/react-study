import React, { useState } from "react";
import PageWrapper from "../../../components/Authemciate/PageWrapper/PageWrapper";
import "./SignUpPage.style.css";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import AuthTextBtn from "../../../common/Authenticate/AuthTextBtn/AuthTextBtn";
import AuthBtn from "./../../../common/Authenticate/AuthBtn/AuthBtn";
import { authWithCreateUser } from "../../../utils/authService/authServie";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const signUpEmailProps = {
    width: "80%",
    placeholder: "이메일 주소",
    handleSetValue: (e) => setEmail(e.target.value),
    value: email,
    type: "email",
  };

  const signUpPasswordProps = {
    placeholder: "비밀번호",
    handleSetValue: (e) => setPassword(e.target.value),
    value: password,
    type: "password",
  };

  const signUpPasswordConfirmProps = {
    placeholder: "비밀번호 확인",
    handleSetValue: (e) => setPasswordConfirm(e.target.value),
    value: passwordConfirm,
    type: "password",
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else {
      authWithCreateUser(email, password, navigate);
    }
  };

  const signUpProps = {
    type: "submit",
    handle: (e) => handleCreateUser(e),
  };

  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="top">
        <div>
          <h1>회원가입</h1>
        </div>
        <p>이메일</p>
        <div className="email_check">
          <AuthInput {...signUpEmailProps} />
          <AuthTextBtn>이메일 인증</AuthTextBtn>
        </div>
        <p>비밀번호</p>
        <AuthInput {...signUpPasswordProps} />
        <p>비밀번호 확인</p>
        <AuthInput {...signUpPasswordConfirmProps} />
        <div className="sign_up_btn">
          <AuthBtn {...signUpProps}>가입하기</AuthBtn>
        </div>
      </div>
      <div className="bottom"></div>
    </PageWrapper>
  );
};

export default SignUpPage;
