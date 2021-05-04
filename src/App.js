import React, {useState} from 'react'
import PhoneCard from './components/PhoneCard'
import FileUpload from './components/FileUpload'
import Register from './components/Register'
import {getOTP, verifyOTP, getUser} from './Apis/api'

import './App.css';

function App() {
  const [phone, setPhone] = useState('')
  const [OTP, setOTP] = useState('')
  const [OTPSend, setOTPSend] = useState(false)
  const [otpVerified, setOptVerified] = useState(false)
  const [userId, setUserId] = useState('')
  const [profileId, setProfileId] = useState('')
  const [token, setToken] = useState('')

  const handleSendOTP = async () => {
    if(phone) {
      const { data } = await getOTP({mobileNumber: phone})
      if(data.response.status){
        setToken(data.response.token)
        setOTPSend(true)
      }
      setOTPSend(true)
    }
  }
  const handleVerifyOTP = async () => {
    if(OTP) {
      const { data } = await verifyOTP({'otp': OTP.toString()}, token)
      if(data.response.token) {
        localStorage.setItem('accessToken', data.response.token.accessToken)
        localStorage.setItem('refreshToken', data.response.token.refreshToken)
      }
      if(data.response.isProfileExist) {
        
        const res = await getUser(data.response.token.accessToken)
        if(res.status === "success") {
          const {userId, _id} = res.data.response.profile
          setUserId(userId)
          setProfileId(_id)
        }
      }
      setOptVerified(true)

    }
  }

  const handleRest = () => {
    setUserId('')
    setPhone('')
    setOTP('')
    setOptVerified(false)
    setOTPSend(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p className="header-text"> HelpCov India </p>
        <a href='/Demo.xlsx' style={{color: '#fff',textDecoration: 'none'}} download>Click to download demo file</a>
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
            phoneNumber={phone}
            value={OTP} 
            setValue={setOTP}
            buttonName={'Verify'}
            handleOperation={handleVerifyOTP}
            handleSendOTP={handleSendOTP}
          />
          ):
        (userId ? 
          < FileUpload userId={userId} profileId={profileId} handleRest={handleRest}/> 
          :
          <Register setUserId={setUserId} setProfileId={setProfileId}/>)
        }
      </main>
    </div>
  );
}

export default App;
