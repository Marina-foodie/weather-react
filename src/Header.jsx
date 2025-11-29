import React, { useState } from "react";

export default function Header({ onSearch }) {
  const [cityInput, setCityInput] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!cityInput) return;
    onSearch(cityInput);
  }

  return (
    <header>
      <form className="search-form" id="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City..."
          required
          id="searchbar"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
        />
        <input type="submit" value="Search" id="submit" />
      </form>
    </header>
  );
}
