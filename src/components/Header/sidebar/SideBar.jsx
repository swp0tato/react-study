import React from "react";
import "./SideBar.style.css";
import MenuBar from "../menubar/MenuBar";

const SideBar = () => {
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
            <img src="#" alt="이미지" className="user_icon" />
            <div className="user_info">
              <div>Helloworld</div>
              <div>abcd@naver.com</div>
            </div>
          </div>
        </div>
        <div className="">
          <MenuBar menuBarStyle={menuBarStyle} menuItemStyle={menuItemStyle} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
