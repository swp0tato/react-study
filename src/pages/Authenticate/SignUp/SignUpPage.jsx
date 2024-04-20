import React, { useState } from "react";
import PageWrapper from "../../../components/Authenticate/PageWrapper/PageWrapper";
import "./SignUpPage.style.css";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "./../../../common/Authenticate/AuthBtn/AuthBtn";
import { authWithCreateUser } from "../../../utils/authService/authServie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const { name, email, password, passwordCheck } = formValue;

  const nameStaticProps = {
    id: "name",
    placeholder: "이름",
    type: "text",
    width: "80%",
  };

  const emailStaticProps = {
    id: "email",
    placeholder: "이메일 주소",
    type: "text",
    width: "80%",
  };

  const passwordStaticProps = {
    id: "password",
    placeholder: "비밀번호",
    type: "password",
    width: "80%",
  };

  const passwordCheckStaticProps = {
    id: "passwordCheck",
    placeholder: "비밀번호 확인",
    type: "password",
    width: "80%",
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };

  const createInputDynamicProps = (key) => {
    return {
      defaultValue: formValue[key],
      handleSetValue: (e) => handleChange(e),
    };
  };

  const nameDynamicProps = createInputDynamicProps("name");
  const emailDynamicProps = createInputDynamicProps("email");
  const passwordDynamicProps = createInputDynamicProps("password");
  const passwordCheckDynamicProps = createInputDynamicProps("passwordCheck");

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
    if (password !== passwordCheck) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else {
      authWithCreateUser(email, password, name, navigate, dispatch);
    }
  };

  const signUpProps = {
    type: "submit",
    handle: (e) => handleCreateUser(e),
    width: "100%",
  };

  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="top">
        <div className="wrapper_title">
          <h1>회원가입</h1>
        </div>
        <div className="input_wrapper">
          <p className="title">이름</p>
          {/* 이름 유효성 검사 필히 */}

          <AuthInput {...nameStaticProps} {...nameDynamicProps} />
        </div>
        <div className="input_wrapper">
          <p className="title">이메일</p>

          <AuthInput {...emailStaticProps} {...emailDynamicProps} />
        </div>
        <div className="input_wrapper">
          <p className="title">비밀번호</p>

          <AuthInput {...passwordStaticProps} {...passwordDynamicProps} />
        </div>
        <div className="input_wrapper">
          <p className="title">비밀번호 확인</p>

          <AuthInput
            {...passwordCheckStaticProps}
            {...passwordCheckDynamicProps}
          />
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
