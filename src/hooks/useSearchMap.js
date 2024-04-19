import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import searchMapApi from "../utils/searchMapApi";
import { currentLocation } from "../redux/reducer/search/searchMapSlice";
import { useDispatch } from "react-redux";

const fetchSearchMap = ({ location, searchQuery }) => {
  const { latitude, longitude } = location;
  let url = "";

  if (searchQuery) {
    url = `/keyword.json?page=1&size=15&sort=accuracy&query=${searchQuery}&category_group_code=CE7`;
  } else {
    url = `/category.json?category_group_code=CE7&page=1&size=15&sort=accuracy&x=${longitude}&y=${latitude}`;
  }

  return searchMapApi.get(url);
};

export const useSearchMapQuery = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });

    dispatch(
      currentLocation({
        latitude,
        longitude,
      })
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleSuccess);
  }, []);

  return useQuery({
    queryKey: ["search-map", { location, searchQuery }],
    queryFn: () => fetchSearchMap({ location, searchQuery }),
    select: (result) => result.data.documents,
  });
};
