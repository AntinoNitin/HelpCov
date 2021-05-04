import React, {useState, useEffect} from 'react'
import InputField from './InputField'
import { registerUser, getState, getCity } from '../Apis/api'

const PhoneCard = (props) => {
    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [userType, setType] = useState('')
    const [registrationId, setRegistrationId] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const [image, setImage] = useState({})
    const [showImage, setShowImage] = useState('')
    const [pinCode, setPincode] = useState()
    const [stateList, setStateList] = useState([])
    const [stateName, setState] = useState('')
    const [cityList, setCityList] = useState([])
    const [cityName, setCity] = useState('')

    const handleClick = () => setPrivacy(!privacy)
    const handleClickImage = () => document.getElementById('upload_picture').click()

    useEffect(()=>{
        (async function(){
            const res = await getState()
            // console.log('res', res.data.state)
            setStateList(res.data.state)
        })()
    }, [])
    useEffect(()=>{
        if(stateName) {
            (async function(){
                const res = await getCity(stateName)
                setCityList(res.data.city)
            })()
        }
    }, [stateName])
    const imageChange = (event)=>{
        setImage(event.target.files[0])
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();        
            reader.onload = function(e) {
                setShowImage(e.target.result)
            }            
            reader.readAsDataURL(event.target.files[0]); // convert to base64 string
          }
    }
    const handleRegister = async () => {
        const userData = {
            name,
            contactNumber,
            address,
            stateName,
            cityName,
            pinCode,
            userType,
            registrationId,
            image
        }

        if(privacy) {
            const token = localStorage.getItem('accessToken')
            const res = await registerUser(userData, token)
            if(res.status === 'success') {
                props.setUserId(res.data.response.profile.userId)
                props.setProfileId(res.data.response.profile._id)
            }
        }
    }

    return (
        <div className="details-card">
            <h1 className="heading">Add your details</h1>
            <div className="image-container">
                <div className="image">
                    <img src={showImage ? showImage : "/empty.jpg"} id="image-logo" className="image-icon"  alt="logo"/>
                </div>
                <button className="image-text" onClick={handleClickImage}>Add Image</button>
                <div onClick={(e) => e.stopPropagation()}>
                    <input
                        id="upload_picture"
                        onChange={(e) => imageChange(e)}
                        type="file"
                        accept="image/*"
                        style={{display:'none'}}
                    />
                </div>
            </div>

            {/* Name */}
            <InputField label={'Name'} type={'text'} value={name} setValue={setName} />

            {/* Contact Number */}
            <InputField label={'Contact Number'} type={'number'} value={contactNumber} setValue={setContactNumber}/>

            {/* Address */}
            <InputField label={'Address'} type={'text'} value={address} setValue={setAddress}/>

            {/* State & City */}
            <div className='hc-align'>
                <div className="w-46 hc-card">
                    <div className="w-100 label-text"> 
                        <label 
                            htmlFor='state' 
                        >
                            State
                        </label>
                    </div>
                    <div className="w-100">
                        <select 
                            name="state"
                            className="form-input" 
                            value={stateName}
                            onChange={(e)=>setState(e.target.value)}
                        >
                            <option value='-1'>State</option>
                            {stateList.map((item, index) => {
                                return <option value={item} key={index}>{item}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="w-46 hc-card">
                    <div className="w-100 label-text"> 
                        <label 
                            htmlFor='city' 
                        >
                            City
                        </label>
                    </div>
                    <div className="w-100">
                        <select 
                            name="city"
                            className="form-input" 
                            value={cityName}
                            disabled={cityList.length === 0}
                            onChange={(e)=>setCity(e.target.value)}
                        >
                            <option value='-1'>City</option>
                            {cityList.map((item, index) => {
                                return <option value={item.city} key={index}>{item.city}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>

            {/* Pincode */}
            <InputField label={'Pincode'} type={'number'} value={pinCode} setValue={setPincode}/>

            {/* User type */}
            <InputField label={'Type'} type={'text'} value={userType} setValue={setType}/>

            {/* Registration id */}
            <InputField label={'RegistrationId'} type={'text'} value={registrationId} setValue={setRegistrationId}/>
            
            {/* Terms & conditions */}
            <div className="w-100 hc-card" style={{display:"flex", alignItems:'center'}}>
                <div style={{display:'flex'}}>
                    <input 
                        id='privacy'
                        type="checkbox"
                        className="input-checkbox"
                        onChange={handleClick}
                        checked={privacy}
                    />
                </div>
                <div className="" style={{fontSize: '1.2rem'}}> 
                    <label 
                        htmlFor='privacy' 
                    >
                        I agree to the <span className="privacy-text">term & conditions</span> of HelpCov India.
                    </label>
                </div>
            </div>
            
          <div className="w-100" style={{marginTop:'2rem'}}>
            <button 
              className="help-button w-100"
              onClick={handleRegister}
            >
              Continue
            </button>
          </div>
        </div>
    )
}

export default PhoneCard