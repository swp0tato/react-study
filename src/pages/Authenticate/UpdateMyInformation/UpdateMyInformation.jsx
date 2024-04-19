import React, { useState } from "react";
import "./UpdateMyInformation.style.css";
import PageWrapper from "../../../components/Authemciate/PageWrapper/PageWrapper";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "../../../common/Authenticate/AuthBtn/AuthBtn";
import { useSelector } from "react-redux";
const UpdateMyInformation = () => {
  const [imgstate, setImgState] = useState("");
  const user = useSelector((state) => state.auth.user);

  const render = new FileReader();
  console.log({ render });

  const handleImgUpdate = (e) => {
    const file = e.target.files[0];
    console.log(file);

    render.onload = (e) => {
      setImgState(e.target.result);
    };
    render.readAsDataURL(file);
  };
  console.log(imgstate);

  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="profile_top "></div>
      <div className="profile_bottom">
        <img src={`${user?.photoURL}`} alt="이미지" className="profile_img" />
        <input type="file" onChange={(e) => handleImgUpdate(e)} />
        <div className="profile_informatin_wrapper">
          <p>이름</p>
          <AuthInput readOnly isValue={user?.displayName} />
          <p>이메일</p>
          <AuthInput readOnly isValue={user?.email} />
        </div>
        <AuthBtn>수정하기</AuthBtn>
      </div>
    </PageWrapper>
  );
};

export default UpdateMyInformation;
