import React from "react";
import Forecast from "./Forecast";

export default function WeatherMain({
  weather,
  forecast,
  error,
  loading,
  unit,
  language,
  texts,
}) {
  if (loading) {
    return (
      <main>
        <div className="weather-date">{texts.loading}</div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="weather-date">
          {texts.errorPrefix}: {error}
        </div>
      </main>
    );
  }

  if (!weather) {
    return null;
  }

  const locale = language === "de" ? "de-CH" : "en-GB";

  const formattedDate = weather.date.toLocaleString(locale, {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function formatTemp(tempC) {
    if (unit === "metric") return tempC;
    return Math.round((tempC * 9) / 5 + 32);
  }

  const isDay = weather.iconCode.endsWith("d");
  const iconWrapperClass = isDay
    ? "weather-icon-wrapper day"
    : "weather-icon-wrapper night";

  return (
    <main>
      <div className="weather-date">{formattedDate}</div>

      <div className="weather-data">
        <div>
          <h1>{weather.city}</h1>
          <p className="weather-details">
            {texts.feelsLike} <strong>{formatTemp(weather.feelsLike)} °</strong>{" "}
            <br />
            {texts.high} <strong>{formatTemp(weather.tempMax)} °</strong> |{" "}
            {texts.low} <strong>{formatTemp(weather.tempMin)} °</strong>
            <br />
            {texts.humidity} <strong>{weather.humidity} %</strong> <br />
            {texts.windSpeed}{" "}
            <strong>
              {weather.wind.toFixed(2)} {texts.windUnit}
            </strong>
          </p>
        </div>

        <div className="weather-container">
          <div className="icon-state">
            <div className={iconWrapperClass}>
              <img
                src={weather.iconUrl}
                alt={weather.description}
                className="weather-icon"
              />
            </div>
            <div className="weather-state">{weather.description}</div>
          </div>
          <div className="weather-temperature">
            {formatTemp(weather.temperature)}
          </div>
          <div className="weather-unit">{unit === "metric" ? "°C" : "°F"}</div>
        </div>
      </div>

      <Forecast
        forecast={forecast}
        unit={unit}
        language={language}
        texts={texts}
      />
    </main>
  );
}
