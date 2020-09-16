import React from 'react'

import './style.css';

function WeatherBox ({temperature, weather}) {
    return (
        <div className="weather-box">
            <div className="weather-temperature">{Math.round(temperature)}°c </div>
            <div className="weather-weather">{weather}</div>
        </div>
    );
}

export default WeatherBox