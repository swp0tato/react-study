import React from "react";
import "./SideBar.style.css";
import MenuBar from "../menubar/MenuBar";
import { useSelector } from "react-redux";

const SideBar = () => {
  const user = useSelector((state) => state.auth.user); // store 에 해당하는 값 가져오는거
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
            {isAuthenticated && user && (
              <>
                <img src={user?.photoURL} alt="" className="user_photo" />

                <div className="user_info">
                  <div>{user?.displayName}</div>
                  <div>{user?.email}</div>
                </div>
              </>
            )}
            {/* <div className="user_info">
              <div>{user?.displayName}</div>
              <div>{user?.email}</div>
            </div> */}
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

// "https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
