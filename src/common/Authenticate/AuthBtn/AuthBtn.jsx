import React from "react";
import "./AuthBtn.style.css";
const AuthBtn = ({ id, type, handle, children, width }) => {
  return (
    <form
      className="login_form"
      onSubmit={handle}
      style={{ width: `${width}` }}
    >
      <button type={type} id={id} className="login_form_btn">
        {children}
      </button>
    </form>
  );
};

export default AuthBtn;
