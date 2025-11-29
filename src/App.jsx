import React, { useState, useEffect } from "react";
import Header from "./Header";
import WeatherMain from "./WeatherMain";
import Footer from "./Footer";

const API_KEY = "88724523008dc9e1be18f6eb6a959b67";

// zentrale Übersetzungen
const translations = {
  de: {
    searchPlaceholder: "Stadt...",
    searchButton: "Suchen",
    feelsLike: "Gefühlt",
    high: "Hoch",
    low: "Tief",
    humidity: "Luftfeuchtigkeit",
    windSpeed: "Windgeschwindigkeit",
    loading: "Lade Wetterdaten...",
    errorPrefix: "Fehler",
    forecastTitle: "5-Tage-Vorhersage",
    windUnit: "km/h",
    footerTextPrefix: "Dieses Projekt wurde programmiert von",
    footerTextMiddle: "ist Open-Source auf",
    footerTextSuffix: "und gehostet auf",
  },
  en: {
    searchPlaceholder: "City...",
    searchButton: "Search",
    feelsLike: "Feels like",
    high: "High",
    low: "Low",
    humidity: "Humidity",
    windSpeed: "Wind speed",
    loading: "Loading...",
    errorPrefix: "Error",
    forecastTitle: "5-day forecast",
    windUnit: "km/h",
    footerTextPrefix: "This project was coded by",
    footerTextMiddle: "is open-sourced on",
    footerTextSuffix: "and hosted on",
  },
};

export default function App() {
  const [city, setCity] = useState("St. Gallen");
  const [weather, setWeather] = useState(null); // aktuelles Wetter
  const [forecast, setForecast] = useState([]); // 5-Tage-Vorhersage
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("metric"); // "metric" = °C, "imperial" = °F
  const [language, setLanguage] = useState("de"); // "de" oder "en"

  const texts = translations[language];

  function fetchWeather(optionalCity) {
    const cityName = optionalCity || city;
    if (!cityName) return;

    setLoading(true);
    setError(null);

    const langParam = language === "de" ? "de" : "en";

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric&lang=${langParam}`;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      cityName
    )}&appid=${API_KEY}&units=metric&lang=${langParam}`;

    Promise.all([fetch(currentUrl), fetch(forecastUrl)])
      .then(async ([resCurrent, resForecast]) => {
        if (!resCurrent.ok) {
          throw new Error("City not found");
        }
        if (!resForecast.ok) {
          throw new Error("Forecast not available");
        }

        const currentData = await resCurrent.json();
        const forecastData = await resForecast.json();

        // aktuelles Wetter
        setCity(currentData.name);
        setWeather({
          city: currentData.name,
          temperature: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          tempMin: Math.round(currentData.main.temp_min),
          tempMax: Math.round(currentData.main.temp_max),
          humidity: currentData.main.humidity,
          wind: currentData.wind.speed,
          description: currentData.weather[0].description,
          iconCode: currentData.weather[0].icon, // z.B. "01d"
          iconUrl: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
          date: new Date(currentData.dt * 1000),
        });

        // 5-Tage-Vorhersage aus 3-Stunden-Daten bauen
        const byDate = {};

        forecastData.list.forEach((item) => {
          const [dateStr, timeStr] = item.dt_txt.split(" ");
          // wir nehmen bevorzugt 12:00, sonst erstes Vorkommen
          if (!byDate[dateStr] || timeStr === "12:00:00") {
            byDate[dateStr] = item;
          }
        });

        const days = Object.keys(byDate)
          .slice(0, 5)
          .map((dateStr) => {
            const item = byDate[dateStr];
            return {
              date: new Date(item.dt * 1000),
              temperature: Math.round(item.main.temp),
              tempMin: Math.round(item.main.temp_min),
              tempMax: Math.round(item.main.temp_max),
              description: item.weather[0].description,
              iconCode: item.weather[0].icon,
              iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            };
          });

        setForecast(days);
      })
      .catch((err) => {
        setError(err.message || "Es ist ein Fehler aufgetreten.");
        setWeather(null);
        setForecast([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSearch(cityName) {
    if (!cityName) return;
    setCity(cityName);
    fetchWeather(cityName);
  }

  function handleUnitChange(newUnit) {
    setUnit(newUnit);
  }

  function handleLanguageChange(newLang) {
    setLanguage(newLang);
  }

  // Beim ersten Laden & bei Sprach- oder Stadtwechsel neu laden
  useEffect(() => {
    fetchWeather(city);
  }, [language, city]);

  return (
    <div className="Weather-App">
      <Header
        onSearch={handleSearch}
        unit={unit}
        onUnitChange={handleUnitChange}
        language={language}
        onLanguageChange={handleLanguageChange}
        texts={texts}
      />
      <WeatherMain
        weather={weather}
        forecast={forecast}
        error={error}
        loading={loading}
        unit={unit}
        language={language}
        texts={texts}
      />
      <Footer texts={texts} />
    </div>
  );
}
