import axios from "axios";
import configURL from "../Configurations/configURL"
const token = 'your_jwt_token';
const {consentRequestURL} = configURL

const consentRequest = async (cr_response) => {
    // const response = await axios.post(`${consentRequestURL}?patientId=${cr_response.patientId}&doctorId=${cr_response.doctorId}&hospitalId=${cr_response.hospitalId}`)
    const response = await axios.post(consentRequestURL,cr_response, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { consentRequest }
export default exportObject