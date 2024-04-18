import React from "react";
import "./SignInForm.style.css";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import { useNavigate } from "react-router-dom";
import AuthTextBtn from "../../../common/Authenticate/AuthTextBtn/AuthTextBtn";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateEmail } from "firebase/auth";
const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialEmail = useSelector((state) => state.email);
  console.log("z,", initialEmail);

  const naviateToSignUP = () => {
    navigate(`/auth/signup`);
  };

  const handleEmailChange = (e) => {
    console.log("z");
    dispatch(updateEmail(e.target.value));
  };

  const emailProps = {
    type: "email",
    placeholder: "이메일",
    // handleSetValue: (e) => handleEmailChange(e),
    // value: initialEmail,
  };

  const passwordProps = {
    type: "password",
    placeholder: "비밀번호",
  };

  return (
    <div className="input_sign_up_wrapper">
      <AuthInput {...emailProps} />
      <AuthInput {...passwordProps} />
      <div
        className="sign_up_wrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <AuthTextBtn onClick={naviateToSignUP}>회원가입</AuthTextBtn>

        <div>|</div>
        <AuthTextBtn>아이디 찾기</AuthTextBtn>
        <div>|</div>
        <AuthTextBtn>비밀번호 재발급</AuthTextBtn>
      </div>
    </div>
  );
};

export default SignInForm;
