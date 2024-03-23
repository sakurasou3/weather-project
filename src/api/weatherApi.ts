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
type WeatherResponse = {
  city: City;
  cnt: number;
  cod: string;
  list: Array<WeatherItem>;
};

const LIMIT = 14;
export const getWeather = async (): Promise<WeatherResponse | undefined> => {
  try {
    const url = `${import.meta.env.VITE_WEATHER_BASEURL}/data/2.5/forecast?id=${import.meta.env.VITE_WEATHER_CITY_ID}&cnt=${LIMIT}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
    const res: Response = await fetch(url);
    const data: WeatherResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
