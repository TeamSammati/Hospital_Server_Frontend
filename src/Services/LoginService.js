import axios from "axios";
import configURL from "../Configurations/configURL"
const {loginURL} = configURL
const login = async (loginCredentials) => {
    const response = await axios.post(loginURL, loginCredentials)
    console.log(response)
    window.localStorage.setItem('BearerToken', JSON.stringify(response.data.token))
    return response.data.doctor

    // return {userId:1, userName:'venky', doctor:{doctorId:1}}
}
const exportObject = { login }
export default exportObject