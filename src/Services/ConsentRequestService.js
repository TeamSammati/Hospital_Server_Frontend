import axios from "axios";

const consentRequestURL = `http://172.16.144.47:6969/response`

const consentRequest = async (cr_response) => {
    const response = await axios.post(`${consentRequestURL}?crid=${cr_response.crid}&status=${cr_response.status}`)
    return response.data
}
const exportObject = { consentRequest }
export default exportObject