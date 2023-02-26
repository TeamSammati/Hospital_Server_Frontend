import axios from "axios";

const loginURL = `http://172.16.144.47:6969/login`

const login = async (loginCredentials) => {
    const response = await axios.post(loginURL, loginCredentials)
    return response.data
    // return {userId:1, userName:'venky'}
}
const exportObject = { login }
export default exportObject