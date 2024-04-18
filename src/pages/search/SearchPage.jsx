import React, { useEffect, useState } from "react";
import { useSearchMapQuery } from "../../hooks/useSearchMap";
import { useSelector } from "react-redux";
import SearchBar from "../../common/SearchBar/SearchBar";
import "./SearchPage.style.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const { kakao } = window;
  const { latitude, longitude } = useSelector(
    (state) => state.search?.location
  );
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const searchQuery = query.get("q") || "";
  const [keyword, setKeyword] = useState("");
  const { data, isLoading, isError, error } = useSearchMapQuery({
    searchQuery,
  });
  // console.log("data!!", data);
  // console.log("searchQuery", searchQuery);

  const searchBarProps = {
    width: "500px",
    height: "50px",
    keyword,
    onchange: (event) => setKeyword(event),
    onsubmit: (event) => {
      event.preventDefault();
      moveSearchMap();
    },
    onkeydown: (event) => {
      event.preventDefault();
      moveSearchMap();
    },
  };

  const moveSearchMap = () => {
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  const displayMarker = (data) => {
    let markers = [];

    const mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 1,
      };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 현재 위치 마커 표시
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const imageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png`;
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const currentMarker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    currentMarker.setMap(map);

    // 지도 범위 재설정
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(markerPosition);

    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    if (data.length > 0) {
      displayPlaces(data);
    }

    function displayPlaces(places) {
      let listEl = document.getElementById("placesList"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      removeMarker();

      for (let i = 0; i < places.length; i++) {
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function (marker, title, position) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title, position);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name, placePosition);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);

      map.setBounds(bounds);
    }

    function getListItem(index, cafe) {
      var el = document.createElement("div"),
        itemStr = `
        <h3 class="search_card_title">${cafe.place_name}</h3>
        <div class="search_card_phone">${cafe.phone}</div>
        <div class="search_card_address">
          <span>도로명</span>
          ${cafe.road_address_name}
        </div>
        <div class="search_card_address">
          <span>지번</span>
          ${cafe.address_name}
        </div>`;

      if (cafe.distance !== "") {
        itemStr += `<div class="search_card_distance">
          ${cafe.distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} m
          </div>`;
      }

      el.innerHTML = itemStr;
      el.className = "search_card_box";

      return el;
    }

    function addMarker(position) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        clickable: true,
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayInfowindow(marker, title, position) {
      var content =
        '<div style="width:150px;text-align:center;padding:6px 0;">' +
        title +
        "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);

      if (position) map.panTo(position);
    }
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
      <div className="search_map_error_box">
        <div className="search_map_error_text">{error.message}</div>
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
            <div className="search_info_title">
              {searchQuery
                ? "'" + searchQuery + "' 관련 카페 보기"
                : "내 주변 카페 보기"}
            </div>
            <select className="search_sort_box">
              <option>정확도 순</option>
              <option>가까운 순</option>
              <option>가나다 순</option>
            </select>
          </div>
          <div id="placesList" className="search_box_results">
            {data.length === 0 && (
              <div className="search_results_empty">검색 결과가 없습니다.</div>
            )}
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
