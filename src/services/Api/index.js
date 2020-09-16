import axios from 'axios';

const api_key = '574715c7694f4b97b7c84bdf1704353b'

const api = axios.create({
    baseURL: `api.openweathermap.org/data/2.5/weather?appid=${api_key}&q=`
});

export default api;