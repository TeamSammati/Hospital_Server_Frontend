import axios from 'axios'

const consentStatusURL = `http://172.16.144.47:6969/get_status_all`

const getStatusRequests = async (user) => {
    const response = await axios.get(`${consentStatusURL}?dId=${user.doctorId}&hId=${5}`)
    return response.data
}
const exportObject = { getStatusRequests}

export default exportObject