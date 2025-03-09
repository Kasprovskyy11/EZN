import React, { useState, useEffect } from "react";

const Weather: React.FC = () => {
  const [location, setLocation] = useState(""); // Przechowuje miasto
  const [weather, setWeather] = useState<any>(null); // Przechowuje dane pogodowe
  const [loading, setLoading] = useState(false); // Przechowuje stan ładowania
  const [error, setError] = useState(""); // Przechowuje ewentualny błąd
  const [isVisible, setIsVisible] = useState(false); // Stan dla widoczności komponentu

  // Funkcja do sprawdzenia, czy element jest w widocznej części ekranu
  const checkVisibility = () => {
    const element = document.getElementById("weather");
    if (element) {
      const rect = element.getBoundingClientRect();
      // Sprawdzamy, czy element jest w obrębie widocznej części ekranu
      setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Sprawdzamy widoczność przy załadowaniu strony

    return () => {
      window.removeEventListener("scroll", checkVisibility); // Usuwamy nasłuchiwanie przy odmontowaniu komponentu
    };
  }, []);

  // Funkcja do pobrania pogody
  const fetchWeather = async () => {
    if (!location) return;

    setLoading(true);
    setError(""); // Resetujemy błędy przed nowym zapytaniem

    try {
      const geocodeResponse = await fetch(
        `https://geocode.maps.co/search?q=${location}&limit=1`
      );
      const geocodeData = await geocodeResponse.json();
      const { lat, lon } = geocodeData[0] || {};

      if (!lat || !lon) {
        throw new Error("Nie znaleziono lokalizacji");
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m`
      );

      if (!response.ok) {
        throw new Error("Błąd podczas pobierania danych pogodowych.");
      }

      const data = await response.json();
      setWeather(data.hourly); // Ustawiamy dane o pogodzie
    } catch (err) {
      setError("Błąd podczas pobierania danych pogodowych.");
    }
    setLoading(false); // Zakończ ładowanie
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  useEffect(() => {
    if (location) {
      fetchWeather(); // Pobieramy pogodę po zmianie lokalizacji
    }
  }, [location]);

  return (
    <div
      id="weather"
      className={`mx-auto flex flex-col items-center text-sm  sm:p-10 mt-40 mb-40 transition-transform duration-700 ease-out text-[#d4d4dc] p-10 bg-[#393f4d] w-full sm:w-xl h-auto sm:h-72 rounded-xl ${
        isVisible ? "transform translate-y-0" : "transform translate-y-full"
      }`}
    >
      <h1 className="text-3xl sm:text-4xl uppercase font-bold text-center">
        Weather App
      </h1>

      <div className="pt-5 pb-5 flex flex-col items-center w-full sm:w-auto">
        <input
          className="text-center p-2 rounded mb-4 w-3/4 sm:w-72"
          type="text"
          placeholder="Wpisz nazwę miasta"
          value={location}
          onChange={handleLocationChange}
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Pobierz pogodę
        </button>
      </div>

      {loading && <p>Ładowanie...</p>}
      {error && <p className="text-center">{error}</p>}
      {weather && weather.temperature_2m && weather.wind_speed_10m && (
        <div className="text-center">
          <h2>Aktualna pogoda:</h2>
          <p>Temperatura: {weather.temperature_2m[0]}°C</p>
          <p>Wiatr: {weather.wind_speed_10m[0]} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
