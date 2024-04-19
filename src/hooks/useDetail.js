import { useQuery } from '@tanstack/react-query';
import DetailApi from '../utils/detailApi.js';

const fetchDetails = (item, number) => {
  return DetailApi.get(`/blog?query=${item}&size=10&page=${number}`);
};

export const useDetail = (id, number) => {
  return useQuery({
    queryKey: ['details', id, number],
    queryFn: () => fetchDetails(id, number),
    select: (result) => result.data,
  });
};
