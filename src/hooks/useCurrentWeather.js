import { useQuery } from "@tanstack/react-query";
import weatherApi from "../utils/weatherApi";

const fetchCurrentWeather = ({ lat, lon }) => {
  return weatherApi.get(`?lat=${lat}&lon=${lon}`);
};

export const useCurrentWeatherQuery = ({ lat, lon }) => {
  return useQuery({
    queryKey: ["current-weather", { lat, lon }],
    queryFn: () => fetchCurrentWeather({ lat, lon }),
    select: (result) => result.data.weather[0],
  });
};
