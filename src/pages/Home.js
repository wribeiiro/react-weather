import React, { useState, FormEvent } from 'react';
import api from '../services/Api/index';

import Input from '../components/Input'
import './style.css';

function Home() {

    const [weather, setWeather] = useState([])
    const [search, setSearch] = useState('')

    async function getWeather() {
        const response = await api.get('', { params: {
            search
        }})

        setWeather(response.data)
    }

    return (
        <div id="page-home" className="container">
            <form id="search-weather">
                <Input
                    type="text"
                    name="search"
                    label="Search"
                    onKeyUp={e => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
}

export default Home;