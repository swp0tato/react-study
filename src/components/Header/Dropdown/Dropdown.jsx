import {
  faArrowDown,
  faArrowUp,
  faRightFromBracket,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import "./Dropdown.style.css";

const Dropdown = ({
  handleLogout,
  naviagetToInformation,
  isDropdown,
  setIsDropdown,
  navigateToAuth,
}) => {
  const user = useSelector((state) => state.auth.user);

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  return (
    <>
      <div className="dropdown_container">
        <div className="drop_title" onClick={toggleDropdown}>
          <span>
            {user?.displayName ? `${user?.displayName}님` : "방문자님"}
          </span>
          {isDropdown ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}
        </div>
        {isDropdown && (
          <div className="dropdown_items">
            <div className="user_information" onClick={naviagetToInformation}>
              내 정보 보기
            </div>
            {user !== null ? (
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
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
