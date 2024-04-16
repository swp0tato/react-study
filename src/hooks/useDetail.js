import { useQuery } from '@tanstack/react-query';
import DetailApi from '../utils/detailApi.js';

const fetchDetails = (item) => {
  return DetailApi.get(`/blog?query=${item}&size=5`);
};

export const useDetail = (id) => {
  return useQuery({
    queryKey: ['details', id],
    queryFn: () => fetchDetails(id),
    select: (result) => result.data,
  });
};
