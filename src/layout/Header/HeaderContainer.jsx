import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Header.style.css';
import MenuBar from '../../components/Header/menubar/MenuBar';
import SideBar from '../../components/Header/sidebar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserIsAuthticate from '../../components/Header/userIsAuthticate/UserIsAuthticate';

const HeaderContainer = () => {
  const imgPath = process.env.REACT_APP_IMGPATH;

  const navigate = useNavigate();

  const [isMenuBar, setIsMenuBar] = useState(false);

  const toggleMenuBar = () => {
    console.log('클릭');
    setIsMenuBar(!isMenuBar);
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
            src="yum2수정.png"
            alt="로고이미지"
            className="logo_img"
            onClick={navigateToMain}
          />
          <div className="menu_wrapper">
            <MenuBar />
          </div>
          <UserIsAuthticate />
        </div>
      </div>
      {isMenuBar && <SideBar />}
      <Outlet />
    </div>
  );
};

export default HeaderContainer;
