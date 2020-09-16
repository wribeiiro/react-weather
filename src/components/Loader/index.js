import React from 'react'

import './style.css';

function Loader ({text}) {
    return (
        <div className="loader">{text}</div>
    );
}

export default Loader