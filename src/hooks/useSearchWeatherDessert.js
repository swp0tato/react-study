import { useQuery } from "@tanstack/react-query";
import searchApi from "../utils/searchApi";

let prevKeyword = null;

const fetchSearchWeatherDessert = ({ newDessert, lon, lat }) => {
  const filteredDesserts = newDessert.filter(
    (keyword) => keyword !== prevKeyword
  );
  const randomIndex = Math.floor(Math.random() * filteredDesserts.length);
  const selectedKeyword = filteredDesserts[randomIndex];

  prevKeyword = selectedKeyword;

  return searchApi.get(
    `/keyword.json?query=${selectedKeyword}&category_group_code=CE7&x=${lon}&y=${lat}&sort=distance&size=5}`
  );
};

export const useSearchWeatherDessertQuery = ({ newDessert, lon, lat }) => {
  return useQuery({
    queryKey: ["weather-dessert-search", { newDessert, lon, lat }],
    queryFn: () => fetchSearchWeatherDessert({ newDessert, lon, lat }),
    select: (result) => result.data.documents,
  });
};
