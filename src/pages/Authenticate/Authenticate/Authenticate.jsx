import React from "react";
// import "./Authenticate.style.css";
import PageWrapper from "../../../components/Authemciate/PageWrapper/PageWrapper";
import SignInBtnForm from "../../../components/Authemciate/SignInBtnForm/SignInBtnForm";
import SignInForm from "../../../components/Authemciate/SignInForm/SignInForm";

const Authenticate = () => {
  const authStyle = {
    justifyConetent: "center",
    alignItem: "center",
  };

  return (
    <PageWrapper {...authStyle}>
      <div className="auth_title">
        <h1>로그인</h1>
        <div>소셜 로그인 및 이메일로 로그인할 수 있습니다.</div>
        <SignInForm />
      </div>
      <SignInBtnForm />
    </PageWrapper>
  );
};

export default Authenticate;
