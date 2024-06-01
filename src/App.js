import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'fed427ba943b4e8a8d230937240106'; // Replace with your actual API key

  const fetchWeatherData = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <div>
        <input
          type="text"
          value={city}
          style={{borderRadius:'4px'}}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button style={{borderRadius:'4px',}} onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card" style={{background:'white'}}>
            <h2 style={{textAlign:'center'}}>Temperature</h2>
            <p style={{textAlign:'center'}}>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card" style={{background:'white'}}>
            <h2 style={{textAlign:'center'}}>Humidity</h2>
            <p style={{textAlign:'center'}}>{weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card" style={{background:'white'}}>
            <h2 style={{textAlign:'center'}}>Condition</h2>
            <p style={{textAlign:'center'}}>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card" style={{background:'white'}}>
            <h2 style={{textAlign:'center'}}>Wind Speed</h2>
            <p style={{textAlign:'center'}}>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
