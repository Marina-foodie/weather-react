import React, { useState, useEffect } from "react";
import Header from "./Header";
import WeatherMain from "./WeatherMain";
import Footer from "./Footer";

// 🔑 HIER deinen echten API-Key eintragen
// z.B. von https://openweathermap.org/ oder SheCodes Weather API
const API_KEY = "8c48afa47a9a9c24f3500c7039d50aaa";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function fetchWeather(cityName) {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric&lang=en`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeather({
          city: data.name,
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          tempMin: Math.round(data.main.temp_min),
          tempMax: Math.round(data.main.temp_max),
          humidity: data.main.humidity,
          wind: data.wind.speed,
          description: data.weather[0].description,
          iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          date: new Date(data.dt * 1000),
        });
      })
      .catch((err) => {
        setError(err.message || "Es ist ein Fehler aufgetreten.");
        setWeather(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSearch(cityName) {
    fetchWeather(cityName);
  }

  // Beim ersten Laden z.B. "St. Gallen" anzeigen
  useEffect(() => {
    fetchWeather("St. Gallen");
  }, []);

  return (
    <div className="Weather-App">
      <Header onSearch={handleSearch} />
      <WeatherMain weather={weather} error={error} loading={loading} />
      <Footer />
    </div>
  );
}
