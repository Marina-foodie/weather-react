import React from "react";

export default function Header() {
  return (
    <header>
      <form className="search-form" id="search-form">
        <input type="text" placeholder="City..." required id="searchbar" />
        <input type="submit" value="Search" id="submit" />
      </form>
    </header>
  );
}
