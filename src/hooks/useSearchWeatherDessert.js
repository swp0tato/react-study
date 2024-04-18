import { useQuery } from "@tanstack/react-query";
import searchApi from "../utils/searchApi";

let prevKeyword = null;

const fetchSearchWeatherDessert = ({ newDessert, lon, lat }) => {
  const filteredDesserts = newDessert.filter(
    (keyword) => keyword !== prevKeyword
  ); // 이전 키워드와 중복되지 않도록 필터링
  const randomIndex = Math.floor(Math.random() * filteredDesserts.length); // 필터링된 키워드 중에서 랜덤으로 선택
  const selectedKeyword = filteredDesserts[randomIndex];

  prevKeyword = selectedKeyword;

  console.log("selectedKeyword", selectedKeyword);

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
