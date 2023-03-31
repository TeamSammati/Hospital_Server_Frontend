import axios from 'axios'
import configURL from "../Configurations/configURL"

const {getEHRDetailsListURL} = configURL

const getEHRDetailsList = async (requestParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(getEHRDetailsListURL, " : ",`${getEHRDetailsListURL}?patientId=${requestParams.patientId}`)
    const response = await axios.get(`${getEHRDetailsListURL}?patientId=${requestParams.patientId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { getEHRDetailsList}

export default exportObject