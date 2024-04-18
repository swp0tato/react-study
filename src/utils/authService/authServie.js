import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { login } from "../../redux/reducer/authenciate/authenciateSlice";

const authGoogleLoginPopup = (auth, dispatch, navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("이거토큰", token);

      const { displayName, email, emailVerified, photoURL } = result.user;
      dispatch(login({ displayName, email, emailVerified, photoURL }));
      // const user = result.user;
      // dispatch(login(user));
      navigate(`/`);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;

      console.log("errorMessage", errorMessage);
      const email = error.customData?.email;

      console.log(email);
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(credential);
    });
};

//추후 네이밍 다시 => user데이터 일부 세션스토리지로 저장
export const authWithGoogleAndPersistSession = (dispatch, navigate) => {
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      console.log("브라우저 세션 유지 설정 완료");

      return authGoogleLoginPopup(auth, dispatch, navigate);
    })

    .catch((error) => {
      // 에러 처리
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const authWithCreateUser = (email, password, navigate) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("가입성공", user);
      navigate("/auth");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-email") {
        window.alert(
          "유효하지 않은 이메일 형식입니다. 올바른 이메일 주소를 입력하세요"
        );
      }
      if (errorCode === "auth/weak-password") {
        window.alert(
          "비밀번호가 너무 쉽습니다. 안전한 비밀번호를 선택하세요. 비밀번호는 최소 6자 이상이어야 합니다."
        );
      }
      // const errorMessage = error.message;
    });
};

//기존 사용자 이메일 비밀번호 로그인
export const authWithEmailandPassword = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
