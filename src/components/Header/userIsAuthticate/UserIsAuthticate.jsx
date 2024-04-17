import {
  faRightFromBracket,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/reducer/authenciateSlice";
import { useNavigate } from "react-router-dom";
import "./UserIsAuthticate.style.css";

const UserIsAuthticate = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      signOut(auth)
        .then(() => {
          console.log("성공");
          dispatch(logout());
        })
        .catch((error) => {
          console.log("실패", error.message);
        });
    }
  };

  const navigateToAuth = () => {
    navigate(`/auth`);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="user_isAuthticate" onClick={handleLogout}>
          <div>로그아웃</div>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className="user_icon faRightFromBracket"
          />
        </div>
      ) : (
        <div className="user_isAuthticate" onClick={navigateToAuth}>
          <div>로그인</div>
          <FontAwesomeIcon
            icon={faUserLarge}
            className="user_icon faUserLarge"
          />
        </div>
      )}
    </>
  );
};

export default UserIsAuthticate;
