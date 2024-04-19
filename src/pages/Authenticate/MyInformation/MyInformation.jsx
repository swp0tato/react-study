import React from "react";
import "./Myinformation.style.css";
import PageWrapper from "../../../components/Authenticate/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import AuthInput from "./../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "./../../../common/Authenticate/AuthBtn/AuthBtn";
import { useNavigate } from "react-router-dom";
const MyInformation = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navigateToUpdate = (e) => {
    e.preventDefault();
    navigate(`/auth/myinfo/update`);
  };
  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="profile_top "></div>
      <div className="profile_bottom">
        <img src={`${user?.photoURL}`} alt="이미지" className="profile_img" />
        <div className="profile_informatin_wrapper">
          <p>이름</p>
          <AuthInput readOnly isValue={user?.displayName} />
          <p>이메일</p>
          <AuthInput readOnly isValue={user?.email} />
        </div>
        <AuthBtn handle={navigateToUpdate}>수정하기</AuthBtn>
      </div>
    </PageWrapper>
  );
};

export default MyInformation;
