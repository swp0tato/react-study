import { useQuery } from "@tanstack/react-query";
import DetailApi from "../utils/detailApi.js";

// let keyword = "스타벅스";

const fetchSearchImage = (keyword) => {
  // console.log("keyword : ", keyword);
  return DetailApi.get(`/image?query=${keyword}&size=1`);
};

export const useSearchImageQuery = (keyword) => {
  return useQuery({
    queryKey: ["search-image", keyword],
    queryFn: () => fetchSearchImage(keyword),
    select: (result) => result.data.documents[0],
  });
};
