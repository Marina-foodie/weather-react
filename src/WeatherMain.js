import React from "react";

export default function WeatherMain() {
  return (
    <main>
      <div className="weather-date" id="weather-date">
        Thursday, 27.11.2025 - 17:52
      </div>

      <div className="weather-data">
        <div>
          <h1 id="city">St. Gallen</h1>

          <p className="weather-details">
            Feels like <strong id="feels-like">-3 °C</strong> <br />
            High <strong id="high">3 °C</strong> <strong>|</strong> Low{" "}
            <strong id="low">-4 °C</strong>
            <br />
            Humidity <strong id="humidity">87 %</strong> <br />
            Wind speed <strong id="wind">2.57 km/h</strong>
          </p>
        </div>

        <div className="weather-container">
          <div className="icon-state">
            <div className="weather-icon" id="icon">
              {/* Beispiel-Icon – URL kannst du durch deine eigene ersetzen */}
              <img
                src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                alt="few clouds"
                className="weather-icon"
              />
            </div>
            <div className="weather-state" id="weather-state">
              few clouds
            </div>
          </div>
          <div className="weather-temperature" id="weather-temperature">
            0
          </div>
          <div className="weather-unit">°C</div>
        </div>
      </div>
    </main>
  );
}