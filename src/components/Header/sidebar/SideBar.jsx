import React from "react";
import "./SideBar.style.css";
import MenuBar from "../menubar/MenuBar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faRightFromBracket,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ handleLogout, naviagetToInformation, navigateToAuth }) => {
  const user = useSelector((state) => state.auth.user); // store 에 해당하는 값 가져오는거

  const menuBarStyle = {
    width: "100%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  };

  const menuItemStyle = {
    height: "50px",
  };
  return (
    <>
      <div className="side_bar">
        <div className="user_info_wrapper">
          <div className="user_info_center_box">
            {user && (
              <>
                <img src={user?.photoURL} alt="" className="user_photo" />

                <div className="user_info">
                  <div>{user?.displayName}</div>
                  <div>{user?.email}</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="">
          <MenuBar menuBarStyle={menuBarStyle} menuItemStyle={menuItemStyle} />
        </div>
        <div className="logout_wrapper">
          <div
            className="side_bar_my_information"
            onClick={naviagetToInformation}
          >
            <div>마이 페이지</div>
          </div>
          {user ? (
            <div className="side_bar_user_isAuthticate" onClick={handleLogout}>
              <div>로그아웃</div>
            </div>
          ) : (
            <div
              className="side_bar_user_isAuthticate"
              onClick={navigateToAuth}
            >
              <div>로그인</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
