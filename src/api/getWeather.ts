import axios from 'axios';

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

const LIMIT = 7;
export const getWeather = async (): Promise<Response | undefined> => {
  console.error('getWeather');
  console.error(import.meta.env);
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_WEATHER_URL}?id=${import.meta.env.VITE_WEATHER_CITY_ID}&cnt=${LIMIT}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
