import React from "react";
import {
  faHome,
  faMapMarkerAlt,
  faClipboardList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./MenuBar.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const MenuBar = ({ menuBarStyle, menuItemStyle }) => {
  const navigate = useNavigate();

  const navList = [
    { name: "Main", icon: faHome, router: "/" },
    { name: "Map", icon: faMapMarkerAlt, router: "/search" },
    { name: "Board", icon: faClipboardList, router: "/board" },
    { name: "Community", icon: faUsers },
  ];

  const navigateToMenuItem = (router) => {
    navigate(router);
  };

  return (
    <div className="menu_bar" style={menuBarStyle && menuBarStyle}>
      {navList.map((item, index) => (
        <div
          className="menu_item"
          key={index}
          style={menuItemStyle}
          onClick={() => navigateToMenuItem(item.router)}
        >
          <div className="menu_text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
