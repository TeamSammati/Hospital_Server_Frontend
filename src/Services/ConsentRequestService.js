import axios from "axios";
import configURL from "../Configurations/configURL"
const {consentRequestURL} = configURL

const consentRequest = async (requestParams) => {

    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(consentRequestURL,requestParams, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { consentRequest }
export default exportObject