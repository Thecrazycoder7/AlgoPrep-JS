import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [weatherData, setWeatherData] = useState(null); // Store weather data

  async function getWeather(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=6fc74cf82bc44773a8a171855241407&q=${location}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data); // Save the weather data to state
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value) {
      await getWeather(value);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <header>
        <div className="input">
          <div>
            <h1>Find Weather Forecast</h1>
            <input type="text" value={value} onChange={handleChange} />
            <button onClick={handleSubmit}>Search</button>
          </div>
        </div>

        <div className="container">
          <div className="left">
            {weatherData ? (
              <>
                <p className="time">{new Date().toLocaleTimeString()}</p>
                <p className="date">{new Date().toLocaleDateString()}</p>
                <p className="weather">{weatherData.current.condition.text}</p>
              </>
            ) : (
              <>
                <p className="time">
                  12:30 AM
                </p>
                <p className="date">Monday, 17 September 2024</p>
                <p className="weather">Cloudy</p>
              </>
            )}
          </div>
          <div className="right">
            {weatherData ? (
              <>
                <p className="location">{weatherData.location.name}</p>
                <p className="country">{weatherData.location.country}</p>
                <p className="temp">{weatherData.current.temp_c} °C</p>
              </>
            ) : (
              <>
                <p className="location">Location</p>
                <p className="country">Country</p>
                <p className="temp">30 °C</p>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default App;
