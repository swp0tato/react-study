import React from "react";
// import "./AuthTextBtn.style.css";
const AuthTextBtn = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default AuthTextBtn;
