import axios from "axios";
import configURL from "../Configurations/configURL"
const {consentRequestURL} = configURL

const consentRequest = async (requestParams) => {

    const token = window.localStorage.getItem('BearerToken')
    console.log(token)
    // const response = await axios.post(`${consentRequestURL}?patientId=${cr_response.patientId}&doctorId=${cr_response.doctorId}&hospitalId=${cr_response.hospitalId}`)
    const response = await axios.post(consentRequestURL,requestParams, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { consentRequest }
export default exportObject