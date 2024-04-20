import { useQueries } from "@tanstack/react-query";
import DetailApi from "../utils/detailApi.js";

const fetchSearchImage = (keywords) => {
  return DetailApi.get(`/image?query=${keywords}&size=1`);
};

export const useSearchImageQueries = (keywords) => {
  return useQueries({
    queries: keywords.map((keywords) => {
      return {
        queryKey: ["search-image", keywords],
        queryFn: () => fetchSearchImage(keywords),
      };
    }),

    combine: (results) => {
      const imageUrlData = results
        .filter(
          (result) =>
            result &&
            result.data &&
            result.data.data &&
            result.data.data.documents[0]
        )
        .map((result) => result.data.data.documents[0].image_url);

      return {
        imageUrlData: imageUrlData,
      };
    },
  });
};
