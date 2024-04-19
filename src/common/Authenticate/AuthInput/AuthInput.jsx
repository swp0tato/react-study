import React from "react";
import "./AuthInput.style.css";
const AuthInput = ({
  width,
  type,
  placeholder,
  handleSetValue,
  isValue,
  readOnly,
}) => {
  return (
    <label style={{ width: width }}>
      <input
        value={isValue}
        onChange={handleSetValue}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly && "readOnly"}
      />
    </label>
  );
};

export default AuthInput;
