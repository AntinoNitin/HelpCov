import React, {useEffect, useState} from 'react'

const PhoneCard = (props) => {
    const [isDisable, setIsDisable] = useState(true)
    useEffect(()=>{

      if(props.label === 'Verify OTP') {
        setInterval(() => {
          setIsDisable(false)
        }, 15000);
      }

    },[props.label])
    return (
        <div className="help-card">
          <div className="w-100"> 
            <label 
              htmlFor="phone_number" 
              className="help-heading"
            >
              {props.label}
            </label>
          </div>
          {props.phoneNumber && <div>
            <span> We send an OTP in +91 {props.phoneNumber} </span>
            </div>}
          <div className="w-100">
            <input 
              id="phone_number" 
              type="number" 
              className="help-input"
              value={props.value}
              onChange={(e)=> props.setValue(e.target.value)}
            />
          </div>
          <div className="w-100">
            <button 
              className="help-button w-100"
              onClick={props.handleOperation}
            >
              {props.buttonName}
            </button>
          </div>
          {props.label ==='Verify OTP' && 
            <div className="w-100" style={{marginTop:'1rem'}}>
            <button 
              className="help-button w-100"
              disabled={isDisable}
              onClick={props.handleSendOTP}
            >
              Resend OTP
            </button>            
          </div>}
        </div>
    )
}

export default PhoneCard