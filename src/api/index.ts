import type { City } from "../types";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchCities = async (): Promise<City[]> => {
  const res = await fetch("/data.json");
  const data: { cities: City[] } = await res.json();
  const activeCities = data.cities.filter((c: City) => c.active);
  const uniqueCities = Array.from(
    new Map(activeCities.map((c: City) => [c.name, c])).values()
  );
  return uniqueCities as City[];
};

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: Temperature;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed?: number;
  deg?: number;
  gust?: number;
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
}

export const fetchWeatherData = async (
  lng: number,
  lat: number,
  units: string = "metric"
): Promise<any> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lon=${lng}&lat=${lat}&units=${units}&appid=${apiKey}`
  );
  const data: WeatherData = await res.json();
  return data;
};
