import axios from "axios";
import configURL from "../Configurations/configURL"
const {addVisitURL} = configURL

const addVisit = async (requestParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${addVisitURL}?patientId=${requestParams.patientId}&episodeId=${requestParams.episodeId}&doctorId=${requestParams.doctorId}`, null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { addVisit }
export default exportObject