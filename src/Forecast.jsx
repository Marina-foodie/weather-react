import React from "react";

export default function Forecast({ forecast, unit, language, texts }) {
  if (!forecast || forecast.length === 0) {
    return null;
  }

  function formatTemp(tempC) {
    if (unit === "metric") return `${tempC}°`;
    const f = Math.round((tempC * 9) / 5 + 32);
    return `${f}°`;
  }

  const locale = language === "de" ? "de-CH" : "en-GB";

  return (
    <section className="forecast">
      <h2 className="forecast-title">{texts.forecastTitle}</h2>
      <div className="forecast-grid">
        {forecast.map((day, index) => {
          const dateLabel = day.date.toLocaleDateString(locale, {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
          });

          const isDay = day.iconCode.endsWith("d");
          const iconWrapperClass = isDay
            ? "forecast-icon-wrapper day"
            : "forecast-icon-wrapper night";

          return (
            <div className="forecast-card" key={index}>
              <div className="forecast-date">{dateLabel}</div>
              <div className={iconWrapperClass}>
                <img
                  src={day.iconUrl}
                  alt={day.description}
                  className="forecast-icon"
                />
              </div>
              <div className="forecast-temp">{formatTemp(day.temperature)}</div>
              <div className="forecast-minmax">
                {formatTemp(day.tempMin)} / {formatTemp(day.tempMax)}
              </div>
              <div className="forecast-desc">{day.description}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
