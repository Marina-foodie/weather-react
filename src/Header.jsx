import React, { useState } from "react";

export default function Header({
  onSearch,
  unit,
  onUnitChange,
  language,
  onLanguageChange,
  texts,
}) {
  const [cityInput, setCityInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!cityInput) return;
    onSearch(cityInput);
  }

  return (
    <header className="header">
      <form className="search-form" id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={texts.searchPlaceholder}
          required
          id="searchbar"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
        />
        <input type="submit" value={texts.searchButton} id="submit" />
      </form>

      <div className="header-controls">
        <div className="unit-toggle">
          <button
            type="button"
            className={unit === "metric" ? "active" : ""}
            onClick={() => onUnitChange("metric")}
          >
            °C
          </button>
          <span className="unit-separator">|</span>
          <button
            type="button"
            className={unit === "imperial" ? "active" : ""}
            onClick={() => onUnitChange("imperial")}
          >
            °F
          </button>
        </div>

        <div className="language-toggle">
          <button
            type="button"
            className={language === "de" ? "active" : ""}
            onClick={() => onLanguageChange("de")}
          >
            DE
          </button>
          <span className="unit-separator">|</span>
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => onLanguageChange("en")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
