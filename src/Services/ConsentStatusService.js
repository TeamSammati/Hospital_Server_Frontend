import axios from 'axios'
import configURL from "../Configurations/configURL"

const token = 'your_jwt_token';
const {consentStatusURL} = configURL

const getStatusRequests = async (user) => {
    const response = await axios.get(`${consentStatusURL}?dId=${user.doctorId}&hId=${5}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { getStatusRequests}

export default exportObject