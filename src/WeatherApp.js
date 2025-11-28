import React from "react";
import Header from "./Header";
import WeatherMain from "./WeatherMain";
import Footer from "./Footer";

export default function WeatherApp() {
  return (
    <div className="Weather-App">
      <Header />
      <WeatherMain />
      <Footer />
    </div>
  );
}
