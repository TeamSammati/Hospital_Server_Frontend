import axios from "axios";

const consentRequestURL = `http://172.16.144.47:6969/consent_request`

const consentRequest = async (cr_response) => {
    // const response = await axios.post(`${consentRequestURL}?patientId=${cr_response.patientId}&doctorId=${cr_response.doctorId}&hospitalId=${cr_response.hospitalId}`)
    const response = await axios.post(consentRequestURL,cr_response)
    return response.data
}
const exportObject = { consentRequest }
export default exportObject