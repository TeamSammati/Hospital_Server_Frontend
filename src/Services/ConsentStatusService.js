import axios from 'axios'
import configURL from "../Configurations/configURL"

const {consentStatusURL} = configURL

const getStatusRequests = async (user) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.get(`${consentStatusURL}?dId=${user.doctorId}&hId=${5}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { getStatusRequests}

export default exportObject