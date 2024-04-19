import React, { useState } from "react";
import PageWrapper from "../../../components/Authemciate/PageWrapper/PageWrapper";
import "./SignUpPage.style.css";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "./../../../common/Authenticate/AuthBtn/AuthBtn";
import { authWithCreateUser } from "../../../utils/authService/authServie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpNameProps = {
    placeholder: "이름",
    handleSetValue: (e) => setName(e.target.value),
    isValue: name,
    type: "text",
  };

  const signUpEmailProps = {
    placeholder: "이메일 주소",
    handleSetValue: (e) => setEmail(e.target.value),
    isValue: email,
    type: "email",
  };

  const signUpPasswordProps = {
    placeholder: "비밀번호",
    handleSetValue: (e) => setPassword(e.target.value),
    isValue: password,
    type: "password",
  };

  const signUpPasswordConfirmProps = {
    placeholder: "비밀번호 확인",
    handleSetValue: (e) => setPasswordConfirm(e.target.value),
    isValue: passwordConfirm,
    type: "password",
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const isValidName = (name) => {
      return /^[a-zA-Z가-힣]{3,5}$/.test(name);
    };

    if (!isValidName(name)) {
      window.alert(
        "이름은 특수문자와 공백을 포함할 수 없으며, 최소 3글자 이상 5글자 이하로 입력해주세요."
      );
      return;
    }
    if (password !== passwordConfirm) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else {
      authWithCreateUser(email, password, name, navigate, dispatch);
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
        <p>이름</p>
        {/* 이름 유효성 검사 필히 */}
        <AuthInput {...signUpNameProps} />
        <p>이메일</p>
        <div className="email_check">
          <AuthInput {...signUpEmailProps} />
        </div>
        <p>비밀번호</p>
        <AuthInput {...signUpPasswordProps} />
        <p>비밀번호 확인</p>
        <AuthInput {...signUpPasswordConfirmProps} />
        <div className="sign_up_btn">
          <AuthBtn {...signUpProps}>가입하기</AuthBtn>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignUpPage;
