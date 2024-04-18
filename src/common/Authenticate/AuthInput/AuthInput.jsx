import React from "react";
import "./AuthInput.style.css";
const AuthInput = ({ width, type, placeholder, handleSetValue, value }) => {
  console.log(handleSetValue);
  return (
    <label style={{ width: width }}>
      <input
        value={value}
        onChange={handleSetValue}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
};

export default AuthInput;
