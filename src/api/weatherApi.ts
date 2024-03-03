import { axiosClient } from './axiosClient';

type City = {
  id: number;
  name: string;
};
type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export type WeatherItem = {
  dt: number;
  dt_txt: string;
  weather: Array<Weather>;
};
type Response = {
  city: City;
  cnt: number;
  cod: string;
  list: Array<WeatherItem>;
};

const LIMIT = 14;
export const getWeather = async (): Promise<Response | undefined> => {
  try {
    const result = await axiosClient.get(
      `/data/2.5/forecast?id=${import.meta.env.VITE_WEATHER_CITY_ID}&cnt=${LIMIT}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
