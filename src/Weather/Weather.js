import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [formattedDate, setFormattedDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e711f1d7c1a4fcbcc91b5722b4f65fbd`)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.log("error fetching data", error);
        });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedDate(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="widget">
      <div className="left-panel panel" style={{ display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "column-reverse" }}>
        <div className="date">{formattedDate}</div>
        <div className="city">{weather.name}</div>
        <div className="temp">
          <img src={weatherIconUrl} alt={weather.weather[0].description} width="60" />
          {(weather.main.temp - 273.15).toFixed(2)}&deg;C
        </div>
      </div>
    </div>
  );
};

export default Weather;
