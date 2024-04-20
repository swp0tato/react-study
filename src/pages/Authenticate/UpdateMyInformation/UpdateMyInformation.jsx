import React, { useEffect, useState } from "react";
import "./UpdateMyInformation.style.css";
import PageWrapper from "../../../components/Authenticate/PageWrapper/PageWrapper";
import AuthInput from "../../../common/Authenticate/AuthInput/AuthInput";
import AuthBtn from "../../../common/Authenticate/AuthBtn/AuthBtn";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import {
  authWithUpdateProfile,
  updateStorageProfileImg,
} from "../../../utils/authService/authServie";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UpdateMyInformation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [preViewImgUrl, setPreViewImgUrl] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const storage = getStorage();

  const storageRef = ref(storage, `profile_images/${preViewImgUrl}`);

  useEffect(() => {
    if (preViewImgUrl !== "" && preViewImgUrl !== undefined) {
      updateStorageProfileImg(storageRef, preViewImgUrl, setProfileImg);
    }
  }, [preViewImgUrl, storageRef]);

  const handleImgUpdate = (e) => {
    setPreViewImgUrl(e.target.files[0]);
  };

  const handleSetNameValue = (e) => {
    setName(e.target.value);
  };

  const onChangeProfile = async (e, name) => {
    e.preventDefault();

    try {
      // 다운로드 이미지 URL 가져오기

      const imgUrl = await getDownloadURL(storageRef);

      if (imgUrl) {
        authWithUpdateProfile(name, imgUrl, navigate, dispatch);
      } else {
        console.error("다운로드된 이미지 URL이 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("이미지 다운로드 중 에러가 발생했습니다:", error.message);
      // 에러 처리 추가
    }
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

  return (
    <PageWrapper justifyConetent="center" alignItem="center">
      <div className="profile_top "></div>
      <div className="profile_bottom">
        <img
          src={`${profileImg || user?.photoURL}`}
          alt="이미지"
          className="profile_img"
        />
        <label htmlFor="profile_img_file">
          <input
            type="file"
            id="profile_img_file"
            onChange={(e) => handleImgUpdate(e)}
          />
          <FontAwesomeIcon
            icon={faCameraRetro}
            className="profile_img_file_icon"
          />
        </label>

        <div className="profile_informatin_wrapper">
          <div className="input_wrapper">
            <p className="title">이름</p>
            <AuthInput
              width="80%"
              defaultValue={name}
              handleSetValue={(e) => handleSetNameValue(e)}
              placeholder={user ? user.displayName : ""}
            />
          </div>
          <div className="input_wrapper">
            <p className="title">이메일</p>
            <AuthInput
              width="80%"
              readOnly
              defaultValue={user ? user.email : ""}
              // placeholder={}
            />
          </div>
        </div>
        <AuthBtn
          type="submit"
          handle={(e) => onChangeProfile(e, name, dispatch)}
          width="100%"
        >
          수정완료
        </AuthBtn>
      </div>
    </PageWrapper>
  );
};

export default UpdateMyInformation;
