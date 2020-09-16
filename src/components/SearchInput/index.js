import React, { InputHTMLAttributes } from 'react'

import './style.css';

function Input ({type, name, value, onChange, onKeyPress, placeholder}) {
    return (
        <div className="search-input-wrapper">
            <input 
                type={type} 
                className="search-input" 
                name={name} 
                value={value} 
                onChange={onChange} 
                onKeyPress={onKeyPress} 
                placeholder={placeholder} 
            />
        </div>
    );
}

export default Input