import axios from 'axios'
import configURL from "../Configurations/configURL"

const {delegateURL, getAllHospitalDoctorURL} = configURL

const getHospitalDoctors = async () => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.get(getAllHospitalDoctorURL, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const delegate = async (reqParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(delegateURL, reqParams,{
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = {delegate, getHospitalDoctors}

export default exportObject