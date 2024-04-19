import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Header.style.css";
import MenuBar from "../../components/Header/menubar/MenuBar";
import SideBar from "../../components/Header/sidebar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../components/Header/Dropdown/Dropdown";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducer/authenciate/authenciateSlice";

const HeaderContainer = () => {
  const imgPath = process.env.REACT_APP_IMGPATH;
  const [isMenuBar, setIsMenuBar] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const toggleMenuBar = () => {
    setIsMenuBar(!isMenuBar);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      signOut(auth)
        .then(() => {
          console.log("성공");
          dispatch(logout());
          setIsDropdown(false);
        })
        .catch((error) => {
          console.log("실패", error.message);
        });
    }
  };

  const naviagetToInformation = () => {
    if (user === null) {
      navigate(`/auth`);
      setIsDropdown(false);
    } else {
      navigate("/auth/myinfo");
      setIsDropdown(false);
    }
  };

  const navigateToAuth = () => {
    navigate(`/auth`);
  };

  const navigateToMain = () => {
    navigate(`/`);
  };

  return (
    <div>
      <div className="header_wrapper">
        <div className="header_center_box">
          <div className="hamburger_wrppaer" onClick={toggleMenuBar}>
            <FontAwesomeIcon icon={faBars} className="hamburger_icon" />
          </div>
          <img
            src={`${imgPath}/Logo.png`}
            alt="로고이미지"
            className="logo_img"
            onClick={navigateToMain}
          />
          <div className="menu_wrapper">
            <MenuBar />
          </div>
          <Dropdown
            handleLogout={handleLogout}
            naviagetToInformation={naviagetToInformation}
            isDropdown={isDropdown}
            setIsDropdown={setIsDropdown}
            navigateToAuth={navigateToAuth}
          />
        </div>
      </div>
      {isMenuBar && (
        <SideBar
          handleLogout={handleLogout}
          naviagetToInformation={naviagetToInformation}
          navigateToAuth={navigateToAuth}
        />
      )}
      <Outlet />
    </div>
  );
};

export default HeaderContainer;
