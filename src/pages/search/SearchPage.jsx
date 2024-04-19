import React, { useEffect, useState } from "react";
import { useSearchMapQuery } from "../../hooks/useSearchMap";
import { useSelector } from "react-redux";
import SearchBar from "../../common/SearchBar/SearchBar";
import "./SearchPage.style.css";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

const selectList = [
  { value: "accuracy", name: "정확도 순" },
  { value: "distance", name: "가까운 순" },
];

const SearchPage = () => {
  const { kakao } = window;
  const { latitude, longitude } = useSelector(
    (state) => state.search?.location
  );
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const searchQuery = query.get("q") || "";
  const [keyword, setKeyword] = useState("");
  const [btnActive, setBtnActive] = useState(false);
  const [sortValue, setSortValue] = useState("accuracy");
  const [searchPage, setSearchPage] = useState(1);
  const { data, isLoading, isError, error } = useSearchMapQuery({
    searchQuery,
    sortValue,
    searchPage,
  });
  // console.log("data!!", data);
  // console.log("searchQuery", searchQuery);
  // console.log("searchpage", searchPage);

  const searchBarProps = {
    width: "90%",
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

  const handleChangeSelect = (event) => {
    setSortValue(event.target.value);
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

    if (data.length > 0) {
      displayPlaces(data);
    }

    function displayPlaces(places) {
      let listEl = document.getElementById("placesList"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds();

      removeMarker();
      removeList(listEl);

      let overlay;
      let clickedOverlay;

      for (let i = 0; i < places.length; i++) {
        let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]);

        bounds.extend(placePosition);

        (function (marker, position, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            if (clickedOverlay) {
              clickedOverlay.setMap(null);
            }
            clickedOverlay = displayInfowindow(marker, place, position);
          });

          itemEl.onmouseover = function () {
            overlay = displayInfowindow(marker, place, position);
          };

          itemEl.onmouseout = function () {
            overlay.setMap(null);
          };

          itemEl.onclick = function () {
            navigate(`/search/${place.place_name}`, {
              state: { address: place.road_address_name },
            });
          };
        })(marker, placePosition, places[i]);

        fragment.appendChild(itemEl);
      }

      listEl.appendChild(fragment);

      map.setBounds(bounds);
    }

    function getListItem(index, cafe) {
      let el = document.createElement("div"),
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
        </div>
        <div class="search_card_distance">
          ${cafe.distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} m
        </div>
        `;

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
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function removeList(listEl) {
      while (listEl.hasChildNodes()) {
        listEl.removeChild(listEl.firstChild);
      }
    }

    function displayInfowindow(marker, place, position) {
      const overlay = new kakao.maps.CustomOverlay({
        position: marker.getPosition(),
        clickable: true,
      });

      const infowindowWrap = document.createElement("div");
      infowindowWrap.className = "infowindow_wrap";

      const infowindowInfo = document.createElement("div");
      infowindowInfo.className = "infowindow_info";

      const infowindowTitle = document.createElement("div");
      infowindowTitle.className = "infowindow_title";
      infowindowTitle.innerHTML = place.place_name;
      const infowindowClose = document.createElement("div");
      infowindowClose.className = "infowindow_close";

      const infowindowBody = document.createElement("div");
      infowindowBody.className = "infowindow_body";

      const infowindowDesc = document.createElement("div");
      infowindowDesc.className = "infowindow_desc";

      const infowindowRoadAddress = document.createElement("div");
      infowindowRoadAddress.innerHTML = "(도로명) " + place.road_address_name;
      const infowindowAddress = document.createElement("div");
      infowindowAddress.innerHTML = "(지번) " + place.address_name;
      const infowindowPhone = document.createElement("div");
      infowindowPhone.innerHTML = place.phone;

      const infowindowLinkDiv = document.createElement("div");
      const infowindowLink = document.createElement("a");
      infowindowLink.className = "infowindow_link";
      infowindowLink.href = place.place_url;
      infowindowLink.innerHTML = "홈페이지";
      infowindowLink.target = "_blank";

      infowindowWrap.append(infowindowInfo);
      infowindowInfo.append(infowindowTitle, infowindowBody);
      infowindowTitle.append(infowindowClose);
      infowindowBody.append(infowindowDesc);
      infowindowDesc.append(
        infowindowRoadAddress,
        infowindowAddress,
        infowindowPhone,
        infowindowLinkDiv
      );
      infowindowLinkDiv.append(infowindowLink);

      overlay.setContent(infowindowWrap);

      overlay.setMap(map);

      infowindowClose.addEventListener("click", () => {
        overlay.setMap(null);
      });

      kakao.maps.event.addListener(map, "click", function () {
        overlay.setMap(null);
      });

      if (position) map.panTo(position);

      return overlay;
    }
  };

  const handlePageClick = ({ selected }) => {
    setSearchPage(selected + 1);
  };

  useEffect(() => {
    if (data) {
      kakao.maps.load(() => displayMarker(data));
    }
  }, [data, sortValue]);

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
      <section className="search_map_section">
        <div id="map" className="search_map"></div>
        <button
          className={`search_toggle_button ${btnActive ? "active" : ""}`}
          onClick={() => setBtnActive(!btnActive)}
        >
          {btnActive ? (
            <FontAwesomeIcon icon={faChevronLeft} />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </button>
      </section>
      <section className={`search_box_section ${btnActive ? "active" : ""}`}>
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
            <div className="search_info_group">
              <Link to="/search" className="search_link_button">
                현재위치
              </Link>
              <select
                className="search_sort_box"
                onChange={handleChangeSelect}
                value={sortValue}
              >
                {selectList.map((item) => {
                  return (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="search_results_area">
            <div id="placesList" className="search_box_results">
              {data.length === 0 && (
                <div className="search_results_empty">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
            <ReactPaginate
              previousLabel={"이전"}
              nextLabel={"다음"}
              pageCount={3}
              onPageChange={handlePageClick}
              containerClassName="search_pagination"
              pageLinkClassName="search_pagination_link"
              activeLinkClassName="search_pagination_link_active"
              forcePage={searchPage - 1}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
