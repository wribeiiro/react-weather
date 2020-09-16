import React from 'react'
import {dateBuilder} from '../../services/Util/index'

import './style.css';

function LocationBox ({name, country, date}) {
    return (
        <div className="location-box">
            <div className="location-location">{name}, {country}</div>
            <div className="location-date">{dateBuilder(date)}</div>
        </div>
    );
}

export default LocationBox