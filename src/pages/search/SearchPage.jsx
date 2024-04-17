import React, { useEffect } from "react";
import "./SearchPage.style.css";
import { useSearchMapQuery } from "../../hooks/useSearchMap";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const { kakao } = window;
  const { latitude, longitude } = useSelector(
    (state) => state.search?.location
  );
  const { data, isLoading, isError, error } = useSearchMapQuery();
  console.log("data!!", data);

  const displayMarker = (data) => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 1,
    };
    const map = new kakao.maps.Map(container, options);

    // 현재 위치 마커 표시
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const imageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png`;
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const currentMarker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 지도 범위 재설정
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(markerPosition);

    // 여러개의 마커 표시
    for (let i = 0; i < data.length; i++) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(data[i].y, data[i].x),
        title: data[i].place_name,
      });
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    map.setBounds(bounds);
    currentMarker.setMap(map);
  };

  useEffect(() => {
    if (data) {
      kakao.maps.load(() => displayMarker(data));
    }
  }, [data]);

  if (isLoading) {
    return <div className="search_map_spinner"></div>;
  }
  if (isError) {
    return (
      <div class="search_map_error_box">
        <div class="search_map_error_text">{error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="search_map_wrapper">
        <section className="search_box">
          <div className="search_input_area">{/* <SearchBar/> */}</div>
          <div>
            <div className="search_result_title">
              <h3>경기도 양주시 주변</h3>
              <h1>'스타벅스' 검색 결과</h1>
            </div>
            <div className="search_filter_box">
              <button className="search_filter_button">거리 순</button>
              <button className="search_filter_button">이름 순</button>
            </div>
            <div>{/* <Card/> */}</div>
          </div>
        </section>
        <section id="map" className="search_map"></section>
      </div>
    </div>
  );
};

export default SearchPage;
