import {
  GoogleAuthProvider,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { login } from "../../redux/reducer/authenciateSlice";

export const authGoogleLoginPopup = (dispatch, navigate) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("이거토큰", token);
      const user = result.user;
      console.log("user", user);
      dispatch(login());
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

// export const authGoogleLoginPopup = (dispatch, navigate) => {
//   const provider = new GoogleAuthProvider();
//   const auth = getAuth();

//   setPersistence(auth, browserSessionPersistence)
//     .then(() => {
//       return signInWithPopup(auth, provider);
//     })
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       console.log("이거토큰", token);
//       const user = result.user;
//       console.log("user", user);
//       dispatch(login());
//       navigate(`/`);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       console.log(errorCode);
//       const errorMessage = error.message;

//       console.log("errorMessage", errorMessage);
//       const email = error.customData?.email;

//       console.log(email);
//       const credential = GoogleAuthProvider.credentialFromError(error);

//       console.log(credential);
//     });
// };
