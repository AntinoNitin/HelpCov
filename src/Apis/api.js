import axios from "axios"

const baseUrl = 'http://helpcov.in/api/v1/'


export async function getOTP (phoneNumber) {
    const res = await axios.post(baseUrl+'auth/otp', phoneNumber)
    return res.data
}

export async function verifyOTP (otp, token) {
    const res = await axios.post(baseUrl+'auth/verify', otp,{
    headers: {
        'Authorization': `bearer ${token}` 
      }
    })
    console.log('res', res.data)
    return res.data
}

export async function registerUser (userData, token) {
    const res = await axios.post(baseUrl + 'profile', userData,{
    headers: {
        'Authorization': `bearer ${token}` 
      }
    })
    return res.data
}

export async function getState() {
    const res = await axios.get(baseUrl+ 'state')
    return res.data
}

export async function getCity(state) {
    const res = await axios.get(`${baseUrl}city/state/${state}`)
    return res.data
}