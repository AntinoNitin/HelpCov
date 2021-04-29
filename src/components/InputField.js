import React from 'react'

const InputField = (props) => {
    return (
        <div className="w-100 hc-card">
            <div className="w-100 label-text"> 
                <label 
                    htmlFor={props.label} 
                >
                    {props.label}
                </label>
            </div>
            <div className="w-100">
                <input 
                    id={props.label} 
                    type={props.type} 
                    className="form-input"
                    value={props.value}
                    onChange={(e)=> props.setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default InputField 