import clear from '../../assets/images/weather/clear.jpg'
import snow from '../../assets/images/weather/snow.jpg'

export function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}    

export function checkBackground(weather) {

    let back = {
        backgroundImage: `url("${clear}"`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        transition: '0.4s ease-in'
    }

    if (typeof weather.main != "undefined") {
        
        const status = weather.weather[0].main.toLowerCase()

        if (status == "clouds") 
            //back.backgroundImage = `url("/assets/images/weather/${status}.jpg")`
            back.backgroundImage = `url("${snow}"`
    }

    return back
}    