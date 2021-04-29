import React, {useState} from 'react'
import PhoneCard from './components/PhoneCard'
import FileUpload from './components/FileUpload'
import Register from './components/Register'
import {getOTP, verifyOTP} from './Apis/api'
import './App.css';

function App() {
  const [phone, setPhone] = useState('')
  const [OTP, setOTP] = useState('')
  const [OTPSend, setOTPSend] = useState(false)
  const [otpVerified, setOptVerified] = useState(false)
  const [userId, setUserId] = useState('')
  const [token, setToken] = useState('')

  const handleSendOTP = async () => {
    const { data } = await getOTP({mobileNumber: phone})
    if(data.response.status){
      setToken(data.response.token)
      setOTPSend(true)
    }
    setOTPSend(true)
  }
  const handleVerifyOTP = async () => {
    const { data } = await verifyOTP({'otp': OTP.toString()}, token)
    console.log(data)
    if(data.response.token) {
      console.log('access', data.response.token.accessToken)
      localStorage.setItem('accessToken', data.response.token.accessToken)
      localStorage.setItem('refreshToken', data.response.token.refreshToken)
    }
    if(data.response.userId) {
      setUserId(data.response.userId)
    }
    setOptVerified(true)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p className="header-text"> HelpCov India </p>
      </header>
      <main className="main_content">
        {!otpVerified ? (!OTPSend ?
          <PhoneCard 
            label={'Enter your Mobile number' }
            value={phone} 
            setValue={setPhone}
            buttonName={'Send OTP'}
            handleOperation={handleSendOTP}
          />
        :
        <PhoneCard 
            label='Verify OTP' 
            value={OTP} 
            setValue={setOTP}
            buttonName={'Verify'}
            handleOperation={handleVerifyOTP}
            handleSendOTP={handleSendOTP}
          />
          ):
        (userId ? < FileUpload userId={userId} /> :<Register setUserId={setUserId}/>)
        }
      </main>
    </div>
  );
}

export default App;
