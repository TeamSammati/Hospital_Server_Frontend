import axios from "axios";
import configURL from "../Configurations/configURL"
const {loginURL, userURL} = configURL
const login = async (loginCredentials) => {
    const response = await axios.post(loginURL, loginCredentials)
    console.log(response)
    window.localStorage.setItem('BearerToken', JSON.stringify(response.data.token))
    return response.data.doctor

    // return {userId:1, userName:'Venkatesh Boppana', doctor:{doctorId:1}, role:"ADMIN"}
}
const getUser = async (doctorId) => {
    let token = window.localStorage.getItem('BearerToken')
    token = token.substring(1, token.length - 1);
    const response = await axios.get(`${userURL}?doctorId=${doctorId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(response)
    return response.data
}
const exportObject = { login, getUser}
export default exportObject