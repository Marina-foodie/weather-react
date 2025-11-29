import React from "react";

export default function WeatherMain({ weather, error, loading }) {
  if (loading) {
    return (
      <main>
        <div className="weather-date">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="weather-date">Error: {error}</div>
      </main>
    );
  }

  if (!weather) {
    return null;
  }

  const formattedDate = weather.date.toLocaleString("de-CH", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main>
      <div className="weather-date">{formattedDate}</div>

      <div className="weather-data">
        <div>
          <h1>{weather.city}</h1>
          <p className="weather-details">
            Feels like <strong>{weather.feelsLike} °C</strong> <br />
            High <strong>{weather.tempMax} °C</strong> | Low{" "}
            <strong>{weather.tempMin} °C</strong>
            <br />
            Humidity <strong>{weather.humidity} %</strong> <br />
            Wind speed <strong>{weather.wind} km/h</strong>
          </p>
        </div>

        <div className="weather-container">
          <div className="icon-state">
            <div className="weather-icon">
              <img
                src={weather.iconUrl}
                alt={weather.description}
                className="weather-icon"
              />
            </div>
            <div className="weather-state">{weather.description}</div>
          </div>
          <div className="weather-temperature">{weather.temperature}</div>
          <div className="weather-unit">°C</div>
        </div>
      </div>
    </main>
  );
}
