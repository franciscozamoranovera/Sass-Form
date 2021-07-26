import React from 'react'
import './styles.scss';

const FormInput = ({ id, label, value, handleChange, name, type, placeholder = "text" }) => {
    return (
        <div className="form__inputs">
            <label htmlFor={id}>
                {label}
            </label>
            {
                type === "textArea" &&
                <textarea
                    value={value}
                    onChange={handleChange}
                    name={name}
                    id={id}
                    placeholder={placeholder}

                />
            }
            {
                type !== "textArea" &&
                <input
                    value={value}
                    onChange={handleChange}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                />
                
            }
        </div>
    )
}

export default FormInput
