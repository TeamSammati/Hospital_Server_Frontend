import axios from "axios";
import configURL from "../Configurations/configURL"
const {consentRequestURL, emergencyConsentRequestURL, emergencyConsentResponseURL} = configURL

const consentRequest = async (requestParams) => {

    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(requestParams);
    const response = await axios.post(consentRequestURL,requestParams, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const emergencyConsentRequest = async (requestParams) => {

    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(requestParams);
    const response = await axios.post(emergencyConsentRequestURL,requestParams, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const emergencyConsentResponse = async (requestParams) => {

    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(requestParams);
    const response = await axios.post(`${emergencyConsentResponseURL}?emergencyConsentRequestId=${requestParams.emergencyConsentRequestId}&consentRequestStatus=${requestParams.consentRequestStatus}&authId=${requestParams.authId}`,null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const exportObject = { consentRequest, emergencyConsentRequest, emergencyConsentResponse}
export default exportObject