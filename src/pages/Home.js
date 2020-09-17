import React, { useState, useEffect } from 'react'

import api from '../services/Api/index'
import {checkBackground} from '../services/Util/index'

import SearchInput from '../components/SearchInput'
import LocationBox from '../components/LocationBox'
import WeatherBox from '../components/WeatherBox'
import Loader from '../components/Loader'

import './style.css';

function Home() {

    const [weather, setWeather] = useState({})
    const [query, setQuery] = useState('')
    const [loader, setLoader] = useState(Boolean)
    const [msgValidation, setMessageValidation] = useState('')
    
    const getCurrentLocation = async () => {
        if (navigator.geolocation)
            await navigator.geolocation.getCurrentPosition(setCurrentPosition)
    }

    const setCurrentPosition = (position) => {
        search(null, position.coords)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (query === null || query === "") {    
            setMessageValidation("Please type a city!")
            setLoader(true)
        }
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const search = async (evt, coords) => {
        
        if (coords) {
            setLoader(true)
            setMessageValidation("Loading content, please wait...")

            const parameters =  { 
                params: { 
                    lat: coords.latitude,
                    lon: coords.longitude
                }
            }
            
            const response = await api.get(``, parameters)
            setWeather(response.data)
            setLoader(false)
        } else {
            
            if (evt.key === "Enter" && query) {
                setLoader(true)
                setMessageValidation("Loading content, please wait...")

                const parameters =  { 
                    params: { 
                        q: query 
                    }
                }
    
                const response = await api.get(``, parameters)

                setWeather(response.data)
                setQuery('')
                setLoader(false)
            }
        }
    }

    return (
        <div style={checkBackground(weather)} className="app">
            <main>
                <div className="container">
                    <form className="form-search" onSubmit={handleSubmit}>
                        <SearchInput
                            type="text"
                            name="search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyPress={search}
                            placeholder="Type a city for search"
                        />
                    </form>
                </div>
                
                { loader ? (
                    <Loader
                        text={msgValidation}
                    />
                ) : ('') }

                { (typeof weather.main != "undefined") ? (
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
                ) : ('') }
            </main>
        </div>
    );
}

export default Home;