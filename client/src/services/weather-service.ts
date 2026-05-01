import axios from "axios";

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

interface OpenMeteoWeatherResponse {
  current: CurrentWeather;
}

export async function getCurrentWeather(
  latitude: number,
  longitude: number
): Promise<CurrentWeather> {
  const url = "https://api.open-meteo.com/v1/forecast";

  const { data } = await axios.get<OpenMeteoWeatherResponse>(url, {
    params: {
      latitude,
      longitude,
      current: "temperature_2m,wind_speed_10m,weather_code",
      timezone: "auto",
    },
  });

  return data.current;
}