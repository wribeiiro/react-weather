import React, { InputHTMLAttributes } from 'react'

import './style.css';

function Input ({name, label, ...rest}) {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input name={name} {...rest} />
        </div>

    );
}

export default Input