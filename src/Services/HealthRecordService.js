import axios from "axios";
import configURL from "../Configurations/configURL"
const {addEHRURL} = configURL

const addRecord = async (healthRecord) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(addEHRURL, healthRecord, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { addRecord }
export default exportObject