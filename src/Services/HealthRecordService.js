import axios from "axios";
import configURL from "../Configurations/configURL"
const token = 'your_jwt_token';
const {addEHRURL} = configURL

const addRecord = async (healthRecord) => {
    const response = await axios.post(addEHRURL, healthRecord, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { addRecord }
export default exportObject