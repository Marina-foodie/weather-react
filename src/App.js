import React from "react";
import "./style.css";

export default function App() {
  return (
    <div className="Weather-App">
      <header>
        <form className="search-form" id="search-form">
          <input type="text" placeholder="City..." required id="searchbar" />
          <input type="submit" value="Search" id="submit" />
        </form>
      </header>

      <main>
        <div className="weather-date" id="weather-date"></div>
        <div className="weather-data">
          <div>
            <h1 id="city"></h1>

            <p className="weather-details">
              Feels like <strong id="feels-like"></strong> <br />
              High <strong id="high"></strong> <strong>|</strong> Low{" "}
              <strong id="low"></strong>
              <br />
              Humidity <strong id="humidity"></strong> <br />
              Wind speed <strong id="wind"></strong>
            </p>
          </div>

          <div className="weather-container">
            <div className="icon-state">
              <div className="weather-icon" id="icon"></div>
              <div className="weather-state" id="weather-state"></div>
            </div>
            <div className="weather-temperature" id="weather-temperature">
              20
            </div>
            <div className="weather-unit">°C</div>
          </div>
        </div>
      </main>

      <footer>
        This project was coded by{" "}
        <a
          href="https://www.linkedin.com/in/marina-ortner-9b2816236/"
          target="_blank"
          rel="noreferrer"
        >
          Marina Ortner
        </a>{" "}
        is open-sourced on{" "}
        <a
          href="https://github.com/Marina-foodie"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{" "}
        and hosted on{" "}
        <a
          href="https://app.netlify.com/teams/marina-foodie/sites"
          target="_blank"
          rel="noreferrer"
        >
          Netlify
        </a>
      </footer>
    </div>
  );
}
