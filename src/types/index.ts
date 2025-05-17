export interface City {
  name: string;
  country: string;
  continent: string;
  description: string;
  image: string;
  active: boolean;
  coords: {
    lat: number;
    lng: number;
  };
}

export type TemperatureUnit = "metric" | "imperial";
