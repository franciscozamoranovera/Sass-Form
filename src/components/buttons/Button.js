import React from 'react'
import './styles.scss'


const Button = ({ type = 'button', color, text }) => {

    return (
        <div className="btn__container">
            <button
                type={type}
                className={`btn__${color}`}
            >
                {text}
            </button>
        </div>
    )
}

export default Button
