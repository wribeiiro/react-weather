import React, { useState, FormEvent } from 'react';
import api from '../services/Api/index'

import SearchInput from '../components/SearchInput'
import LocationBox from '../components/LocationBox'
import WeatherBox from '../components/WeatherBox'

import './style.css';

function Home() {

    const [weather, setWeather] = useState({})
    const [query, setQuery] = useState('')

    const search = async evt => {
        if (evt.key === "Enter") {
            const response = await api.get(``, { 
                params: { 
                    q: query 
                }
            })
            
            setWeather(response.data)
        }
    }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app-default dynamic' : 'app-default') : 'app-default'}>
            <main>
                <div className="container">
                    <SearchInput
                        type="text"
                        name="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search}
                        placeholder="Type a city for search"
                    />
                </div>

                {(typeof weather.main != "undefined") ? (
                <div className="container">
                    <LocationBox
                        name={weather.name}
                        country={weather.sys.country}
                        date={new Date()}
                    />

                    <WeatherBox
                        temperature={weather.main.temp}
                        weather={weather.weather[0].main}
                    />
                </div>
                ) : ('')}
            </main>
        </div>
    );
}

export default Home;