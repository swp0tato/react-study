import {
  GoogleAuthProvider,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
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

export const authWithCreateUser = (
  email,
  password,
  name,
  navigate,
  dispatch
) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("가입성공", user);
      // user.email
      updateProfile(user, {
        displayName: name,
        // 유저 가입시에 기본이미지 제공
        photoURL:
          "https://cdn.inflearn.com/public/courses/329051/cover/e7e306c8-0947-4240-8b42-0bc537c74d33/%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B5%E1%86%BC%E1%84%8B%E1%85%A1%E1%86%AF%E1%84%85%E1%85%A7%E1%84%8C%E1%85%AE%E1%84%82%E1%85%B3%E1%86%AB%E1%84%82%E1%85%AE%E1%84%82%E1%85%A1%20%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B32.jpg",
      })
        .then(() => {
          dispatch(login(user));
          console.log("result user", user);
          console.log("Name Update Success");
        })
        .catch((error) => {
          console.error("Name Update fail", error.code);
        });
      window.alert(`${user.email} 유저의 회원가입이 완료되었습니다. 🎉`);
      navigate("/");
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
    });
};

//기존 사용자 이메일 비밀번호 로그인
export const authWithEmailandPassword = (
  email,
  password,
  navigate,
  dispatch
) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("로그인 성공", user);
      dispatch(login(user));
      navigate(`/`);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(error.message);
      if (errorCode === "auth/invalid-credential") {
        window.alert("유효하지 않은 자격 증명입니다.");
      }
      if (errorCode === "auth/invalid-email") {
        window.alert("유효하지 않은 아이디 입니다.");
      }
      if (errorCode === "auth/missing-password") {
        window.alert("비밀번호가 틀렸습니다.");
      }
      if (errorCode === "auth/too-many-requests") {
        window.alert(
          "로그인 시도가 많이 실패하여 이 계정에 대한 액세스가 일시적으로 비활성화되었습니다. 비밀번호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다."
        );
      }
    });
};

// 비밀번호 재설정 이메일 보내기

export const authWithSendPasswordResetEmail = (email, navigate) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      window.alert(
        `${email} 으로 성공적으로 이메일을 보냈습니다. 확인해주세요. `
      );
      navigate(`/auth`);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/missing-email") {
        window.alert(
          "이메일 주소를 입력해주세요. 이메일은 필수 입력 사항입니다."
        );
      }
      if (errorCode === "auth/invalid-email") {
        window.alert("유효한 이메일 주소가 아닙니다.");
      }
    });
};
