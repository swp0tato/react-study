import { useQuery } from "@tanstack/react-query";
import searchApi from "../utils/searchApi";

const fetchSearchWeatherDessert = ({ newDessert, lon, lat }) => {
  let prevIndex = -1;

  const getNewRandomIndex = (length) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * length);
    } while (newIndex === prevIndex); // 이전 인덱스와 같은 경우 다시 랜덤 인덱스를 뽑음
    prevIndex = newIndex; // 이전 인덱스 업데이트
    return newIndex;
  };

  const randomIndex = getNewRandomIndex(newDessert.length);
  const selectedKeyword = newDessert[randomIndex];

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
