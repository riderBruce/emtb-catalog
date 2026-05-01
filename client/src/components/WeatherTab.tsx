import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCoordinatesByCity,
  type GeocodingResult,
} from "../services/geocoding-service";
import {
  getCurrentWeather,
  type CurrentWeather,
} from "../services/weather-service";

const DEFAULT_CITY = "New Westminster";

const WeatherTab = () => {
  const [searchText, setSearchText] = useState<string>(DEFAULT_CITY);
  const [location, setLocation] = useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    void loadWeather(DEFAULT_CITY);
  }, []);

  const loadWeather = async (cityName: string) => {
    try {
      setLoading(true);
      setError("");

      const locationResult = await getCoordinatesByCity(cityName);
      const weatherResult = await getCurrentWeather(
        locationResult.latitude,
        locationResult.longitude,
      );

      setLocation(locationResult);
      setWeather(weatherResult);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setLocation(null);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedCity = searchText.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }

    await loadWeather(trimmedCity);
  };

  const handleReset = async () => {
    setSearchText(DEFAULT_CITY);
    await loadWeather(DEFAULT_CITY);
  };

  const getWeatherLabel = (code: number): string => {
    const weatherCodeMap: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Rain showers",
      95: "Thunderstorm",
    };

    return weatherCodeMap[code] ?? "Unknown weather";
  };

  return (
    <div className="container my-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Weather</h2>
        <Link to="/" className="btn btn-outline-secondary btn-sm">
          Back
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-secondary">
          <h3 className="h5 mb-0">City Weather</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-3 align-items-end">
              <div className="col-md-9">
                <label htmlFor="city" className="form-label">
                  Search City
                </label>
                <input
                  id="city"
                  type="text"
                  className={`form-control form-control-sm ${
                    error ? "is-invalid" : ""
                  }`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Enter a city name"
                />
                {error && <p className="text-danger mt-1 mb-0">{error}</p>}
              </div>

              <div className="col-md-3">
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm w-50"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm w-50"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Search"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {location && weather && !loading && (
            <div className="mt-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border rounded p-3 h-100 bg-secondary">
                    <h4 className="h6">Location</h4>
                    <p className="mb-1">
                      <strong>City:</strong> {location.name}
                    </p>
                    <p className="mb-1">
                      <strong>Region:</strong> {location.admin1 ?? "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Country:</strong> {location.country ?? "N/A"}
                    </p>
                    <p className="mb-0">
                      <strong>Coordinates:</strong> {location.latitude},{" "}
                      {location.longitude}
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded p-3 h-100 bg-secondary">
                    <h4 className="h6">Current Weather</h4>
                    <p className="mb-1">
                      <strong>Temperature:</strong> {weather.temperature_2m}°C
                    </p>
                    <p className="mb-1">
                      <strong>Wind Speed:</strong> {weather.wind_speed_10m} km/h
                    </p>
                    <p className="mb-1">
                      <strong>Condition:</strong>{" "}
                      {getWeatherLabel(weather.weather_code)}
                    </p>
                    <p className="mb-0">
                      <strong>Observed At:</strong> {weather.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherTab;
