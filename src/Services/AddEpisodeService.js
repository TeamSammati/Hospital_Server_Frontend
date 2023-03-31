import axios from "axios";
import configURL from "../Configurations/configURL"
const {addEpisodeURL} = configURL

const addEpisode = async (requestParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(requestParams)
    const response = await axios.post(`${addEpisodeURL}?patientId=${requestParams.patientId}&episodetype=${requestParams.episodetype}`, null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { addEpisode }
export default exportObject