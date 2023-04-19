import axios from "axios";
import configURL from "../Configurations/configURL"
const {sendOtpPatientURL, getPatientDataURL, registerNewPatientURL, hospitalId} = configURL

const sendOtp = async (requestParams) => {

    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(requestParams);
    const response = await axios.get(`${sendOtpPatientURL}?patientId=${requestParams.patientId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const validateOtp = async (requestParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(getPatientDataURL,requestParams,{
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const registerPatient = async (requestParams) => {

    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${registerNewPatientURL}?hospitalId=${hospitalId}`,requestParams, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const exportObject = { sendOtp, validateOtp, registerPatient}
export default exportObject