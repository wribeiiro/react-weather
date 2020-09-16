import React, { useState, useEffect, FormEvent } from 'react'
import {useForm} from 'react-hook-form'

import api from '../services/Api/index'
import {checkBackground} from '../services/Util/index'

import SearchInput from '../components/SearchInput'
import LocationBox from '../components/LocationBox'
import WeatherBox from '../components/WeatherBox'

import './style.css';

function Home() {

    const [weather, setWeather] = useState({})
    const [query, setQuery] = useState('')

    const { register, handleSubmit, errors } = useForm() // initialize the hook

    const onSubmit = (data) => {
        console.log(data);
    }

    const getCurrentLocation = async () => {
        if (navigator.geolocation)
            await navigator.geolocation.getCurrentPosition(setCurrentPosition)
    }

    const setCurrentPosition = (position) => {
        search(null, position.coords)
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const search = async (evt, coords) => {

        if (coords) {
            const parameters =  { 
                params: { 
                    lat: coords.latitude,
                    lon: coords.longitude
                }
            }

            const response = await api.get(``, parameters)
            setWeather(response.data)
        } else {

            if (evt.key === "Enter") {
                const parameters =  { 
                    params: { 
                        q: query 
                    }
                }
    
                const response = await api.get(``, parameters)
                setWeather(response.data)
                setQuery('')
            }
        }
    }

    return (
        <div style={checkBackground(weather)} className="app">
            <main>
                <div className="container">
                    <form className="form-search" onSubmit={handleSubmit(onSubmit)}>
                        <SearchInput
                            refs={register({ required: true })}
                            type="text"
                            name="search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyPress={search}
                            placeholder="Type a city for search"
                        />
                        {errors.search && 'Search is required.'}
                    </form>
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