import axios from "axios";
import configURL from "../Configurations/configURL"
const token = 'your_jwt_token';
const {addEHRURL} = configURL

const addEpisode = async (requestParams) => {
    const response = await axios.post(addEHRURL, requestParams, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { addEpisode }
export default exportObject