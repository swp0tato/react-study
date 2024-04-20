import React, { useEffect } from "react";
import "./Myinformation.style.css";
import PageWrapper from "../../../components/Authenticate/PageWrapper/PageWrapper";
import { useSelector } from "react-redux";
import AuthInput from "./../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "./../../../common/Authenticate/AuthBtn/AuthBtn";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const MyInformation = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navigateToUpdate = (e) => {
    e.preventDefault();
    navigate(`/auth/myinfo/update`);
  };

  const auth = getAuth();

  useEffect(() => {
    const userNullRedirect = () => {
      onAuthStateChanged(auth, (user) => {
        if (user === null) {
          navigate("/auth");
        }
      });
    };
    userNullRedirect();
  }, [user, auth, navigate]);

  console.log("현재유저", user);
  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="profile_top "></div>
      <div className="profile_bottom">
        <img src={`${user?.photoURL}`} alt="이미지" className="profile_img" />
        <div className="profile_informatin_wrapper">
          <div className="input_wrapper">
            <p className="title">이름</p>
            <AuthInput
              readOnly
              width="80%"
              defaultValue={user ? user.displayName : ""}
            />
          </div>
          <div className="input_wrapper">
            <p className="title">이메일</p>
            <AuthInput
              width="80%"
              readOnly
              defaultValue={user ? user.email : ""}
            />
          </div>
        </div>
        <AuthBtn handle={navigateToUpdate} width="100%">
          수정하기
        </AuthBtn>
      </div>
    </PageWrapper>
  );
};

export default MyInformation;
