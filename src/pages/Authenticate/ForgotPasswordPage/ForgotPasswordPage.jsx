import React, { useState } from "react";
import "./ForgotPasswordPage.style.css";
import PageWrapper from "../../../components/Authenticate/PageWrapper/PageWrapper";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "../../../common/Authenticate/AuthBtn/AuthBtn";
import { authWithSendPasswordResetEmail } from "../../../utils/authService/authServie";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendResetPasswordEmailProps = {
    placeholder: "이메일 주소",
    handleSetValue: (e) => setEmail(e.target.value),
    isValue: email,
    type: "email",
  };

  const handleSubmitSendPasswordEmail = (e) => {
    e.preventDefault();
    authWithSendPasswordResetEmail(email, navigate);
  };

  const sendResetPasswordEmailBtnProps = {
    type: "submit",
    handle: (e) => handleSubmitSendPasswordEmail(e),
  };

  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="top">
        <div className="password_wrapper">
          <h1>비밀번호 찾기</h1>
          <p>이메일</p>
          <AuthInput {...sendResetPasswordEmailProps} />
        </div>
        <div className="password_send_btn">
          <AuthBtn {...sendResetPasswordEmailBtnProps}>비밀번호 전송</AuthBtn>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ForgotPasswordPage;
