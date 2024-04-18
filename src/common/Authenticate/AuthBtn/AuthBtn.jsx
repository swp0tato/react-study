import React from "react";
import "./AuthBtn.style.css";
const AuthBtn = ({ id, type, handle, children }) => {
  return (
    <form className="login_form" onSubmit={handle}>
      <button type={type} id={id} className="login_form_btn">
        {children}
      </button>
    </form>
  );
};

export default AuthBtn;
