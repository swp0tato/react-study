import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import searchMapApi from "../utils/searchMapApi";
import { currentLocation } from "../redux/reducer/searchMapSlice";
import { useDispatch } from "react-redux";

const fetchSearchMap = ({ location }) => {
  const { latitude, longitude } = location;
  let url = `/category.json?category_group_code=CE7&page=1&size=15&sort=accuracy&x=${longitude}&y=${latitude}`;

  return searchMapApi.get(url);
};

export const useSearchMapQuery = () => {
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
    queryKey: ["search-map", { location }],
    queryFn: () => fetchSearchMap({ location }),
    select: (result) => result.data.documents,
  });
};
