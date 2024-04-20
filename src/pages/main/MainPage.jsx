import React, { useEffect, useState } from "react";
import CloseDessertSlide from "./components/CloseDessertSlide/CloseDessertSlide";
import WeatherDessertSlide from "./components/WeatherDessertSlide/WeatherDessertSlide";
import DessertHashtags from "./components/DessertHashtags/DessertHashtags";
import MainSearch from "./components/MainSearch/MainSearch";
// import { db } from "../../../src/firebase";
// import { useSelector } from "react-redux";
// import { doc, getDoc, setDoc } from "firebase/firestore";

const MainPage = () => {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    const getCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ lat, lon });
      });
    };

    getCurrentLocation();
  }, []);

  /**
   * 메인페이지에서 로그인한 유저의 Data를 DB로 저장
   *
   */

  // const storeUser = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   if (storeUser) {
  //     const { displayName, email, emailVerified, photoURL, uid } = storeUser;

  //     const storeUserSubmitDB = async () => {
  //       try {
  //         const userDocRef = doc(db, "users", uid);
  //         const userDocSnap = await getDoc(userDocRef);

  //         if (!userDocSnap.exists()) {
  //           const docRef = await setDoc(userDocRef, {
  //             displayName,
  //             email,
  //             emailVerified,
  //             photoURL,
  //             uid,
  //           });
  //           console.log("Document written with ID: ", docRef);
  //         } else {
  //           console.log("Document with UID already exists");
  //         }
  //       } catch (error) {
  //         console.error("Error adding document: ", error);
  //       }
  //     };

  //     storeUserSubmitDB();
  //   }
  // }, [storeUser]);

  return (
    <div>
      <MainSearch />
      {location.lat !== null && location.lon !== null && (
        <CloseDessertSlide lat={location.lat} lon={location.lon} />
      )}
      <DessertHashtags />
      {location.lat !== null && location.lon !== null && (
        <WeatherDessertSlide lat={location.lat} lon={location.lon} />
      )}
    </div>
  );
};

export default MainPage;
