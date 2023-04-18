import axios from 'axios'
import configURL from "../Configurations/configURL"

const {consentStatusURL, activeConsentsDoctorURL, fetchRecordsURL, getEmergencyConsentRequestsURL, hospitalId} = configURL

const getStatusRequests = async (user) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.get(`${consentStatusURL}?dId=${user.doctorId}&hId=${hospitalId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}


const getActiveConsents = async (reqParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(reqParams)
    const response = await axios.get(`${activeConsentsDoctorURL}?doctorId=${reqParams.doctorId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const getEmergencyList = async () => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.get(getEmergencyConsentRequestsURL, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const getPatientRecords = async (reqParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(fetchRecordsURL, reqParams,{
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { getStatusRequests, getActiveConsents, getPatientRecords, getEmergencyList}

export default exportObject