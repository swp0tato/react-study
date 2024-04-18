import { useQuery } from "@tanstack/react-query";
import searchApi from "../utils/searchApi";

const fetchSearchCloseDessert = ({ lon, lat }) => {
  return searchApi.get(
    //카페 카테고리 코드 : CE7, radius : 5km 반경,
    `/category.json?category\_group\_code=CE7&x=${lon}&y=${lat}&sort=distance&size=5}`
  );
};

export const useSearchCloseDessertQuery = ({ lon, lat }) => {
  return useQuery({
    queryKey: ["close-dessert-search", { lon, lat }],
    queryFn: () => fetchSearchCloseDessert({ lon, lat }),
    select: (result) => result.data.documents,
  });
};
