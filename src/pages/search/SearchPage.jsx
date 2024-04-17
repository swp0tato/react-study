import React, { useEffect } from "react";
import { useSearchMapQuery } from "../../hooks/useSearchMap";
import { useSelector } from "react-redux";
import SearchBar from "../../common/SearchBar/SearchBar";
import SearchCard from "./components/SearchCard";
import "./SearchPage.style.css";

const SearchPage = () => {
  const { kakao } = window;
  const { latitude, longitude } = useSelector(
    (state) => state.search?.location
  );
  const { data, isLoading, isError, error } = useSearchMapQuery();
  // console.log("data!!", data);
  const searchBarProps = { width: "500px", height: "50px" };

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
    const currentInfo = new kakao.maps.InfoWindow({
      position: markerPosition,
      content: `<div style="padding:5px;font-size:12px;">현재 위치</div>`,
    });
    currentInfo.open(map, currentMarker);

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

      // 인포윈도우 표시
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${data[i].place_name}</div>`,
      });

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );

      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
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
    <div className="search_page_area">
      <section className="search_box_section">
        <div className="search_box_area">
          <div className="search_box_area_bar">
            <SearchBar searchBarProps={searchBarProps} />
          </div>
          <div className="search_info_area">
            <div className="search_info_title">내 주변 카페 보기</div>
            <select className="search_sort_box">
              <option>정확도 순</option>
              <option>가까운 순</option>
              <option>가나다 순</option>
            </select>
          </div>
          <div className="search_box_results">
            {data?.map((cafe, i) => (
              <SearchCard cafe={cafe} key={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="search_map_section">
        <div id="map" className="search_map"></div>
      </section>
    </div>
  );
};

export default SearchPage;
