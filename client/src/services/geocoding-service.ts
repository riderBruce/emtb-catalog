import axios from "axios";

export interface GeocodingResult {
  name: string;
  country?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

interface OpenMeteoGeocodingResponse {
  results?: GeocodingResult[];
}

export async function getCoordinatesByCity(
  cityName: string
): Promise<GeocodingResult> {
  const url = "https://geocoding-api.open-meteo.com/v1/search";

  const { data } = await axios.get<OpenMeteoGeocodingResponse>(url, {
    params: {
      name: cityName,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found.");
  }

  return data.results[0];
}