import React from "react";
import "./Authenticate.style.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Authenticate = () => {
  const provider = new GoogleAuthProvider();

  const handleAuthWithGoogle = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("user", user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        console.log("errorMessage", errorMessage);
        const email = error.customData.email;
        // The AuthCredential type that was used.
        console.log(email);
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(credential);
      });
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
