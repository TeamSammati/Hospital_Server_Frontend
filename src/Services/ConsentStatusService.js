import axios from 'axios'

const consentStatusURL = `http://172.16.144.47:6969/Request_List`

const getStatusRequests = async (user) => {
    const response = await axios.get(`${consentStatusURL}?patientId=${user.doctorId}`)
    return response.data
}
const exportObject = { getStatusRequests}

export default exportObject