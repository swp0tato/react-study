import React, { useRef, useState } from "react";
import PageWrapper from "../../../components/Authenticate/PageWrapper/PageWrapper";
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
  // const [formProps, setFormProps] = useState({
  //   id: "",
  //   placeholder: "",
  //   handleSetValue: "",
  //   isValue: "",
  //   type: "",
  //   width: "",
  //   inputEl: "",
  // });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refEl = useRef(null);

  // const handleTarget = (e) => {
  //   console.log(e);
  // };

  /**
   * Props를 동적인값과 정적인값으로 나눠서 관리
   */

  const signUpNameProps = {
    id: "name",
    placeholder: "이름",
    handleSetValue: (e) => setName(e.target.value),
    // handleSetValue: (e) => handleTarget(e),
    isValue: name,
    type: "text",
    width: "80%",
    inputEl: refEl,
  };

  const signUpEmailProps = {
    id: "email",
    placeholder: "이메일 주소",
    handleSetValue: (e) => setEmail(e.target.value),
    // handleSetValue: (e) => handleTarget(e),
    isValue: email,
    type: "email",
    width: "80%",
    inputEl: refEl,
  };

  const signUpPasswordProps = {
    id: "password",
    placeholder: "비밀번호",
    handleSetValue: (e) => setPassword(e.target.value),
    isValue: password,
    type: "password",
    width: "80%",
    inputEl: refEl,
  };

  const signUpPasswordConfirmProps = {
    id: "password_check",
    placeholder: "비밀번호 확인",
    handleSetValue: (e) => setPasswordConfirm(e.target.value),
    isValue: passwordConfirm,
    type: "password",
    width: "80%",
    inputEl: refEl,
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log("잇어", refEl.current.focus);
    if (refEl.current.value !== null) {
      refEl.current.focus();
    }

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
        <div className="sign_up_page_title">
          <h1>회원가입</h1>
        </div>
        <div className="sign_up_item_wrapper">
          <p className="title">이름</p>
          {/* 이름 유효성 검사 필히 */}
          <AuthInput {...signUpNameProps} />
        </div>
        <div className="sign_up_item_wrapper">
          <p className="title">이메일</p>
          <AuthInput {...signUpEmailProps} />
        </div>
        <div className="sign_up_item_wrapper">
          <p className="title">비밀번호</p>
          <AuthInput {...signUpPasswordProps} />
        </div>
        <div className="sign_up_item_wrapper">
          <p className="title">비밀번호 확인</p>
          <AuthInput {...signUpPasswordConfirmProps} />
        </div>
        <div className="duplicate_check">
          <div>경고메세지!!</div>
        </div>
        <div className="sign_up_btn">
          <AuthBtn {...signUpProps}>가입하기</AuthBtn>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignUpPage;
