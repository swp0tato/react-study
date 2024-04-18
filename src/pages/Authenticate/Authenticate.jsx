import React from "react";
import "./Authenticate.style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authGoogleLoginPopup } from "../../utils/authService/authServie";

const Authenticate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAuthWithGoogle = (e) => {
    // 구글 로그인
    e.preventDefault();

    authGoogleLoginPopup(dispatch, navigate);
  };

  return (
    <div className="auth_page_wrapper">
      <div className="auth">
        <div className="auth_title">
          <h1>회원가입하기</h1>
          <div>소셜 로그인 및 이메일로 가입할 수 있습니다</div>
        </div>
        <div className="auth_btn">
          <form onSubmit={(e) => handleAuthWithGoogle(e)}>
            <button type="submit">
              <img
                src="https://avatars.githubusercontent.com/u/1342004?s=48&v=4"
                alt="구글아이콘"
              ></img>
              Log in with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
