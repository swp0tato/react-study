import React from "react";
import "./PageWrapper.style.css";
const PageWrapper = ({ justifyConetent, alignItem, children }) => {
  return (
    <div className="auth_page_wrapper">
      <div
        className="auth"
        style={{
          justifyContent: justifyConetent,
          alignItems: alignItem,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
