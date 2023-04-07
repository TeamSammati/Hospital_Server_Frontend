// All the Service URL's are to be included here...
let ipAddress = "172.16.144.47"
let portNumber = 6969;
const configURL = {
    loginURL : `http://${ipAddress}:${portNumber}/api/auth/authenticate`,
    registerURL : `http://${ipAddress}:${portNumber}/save`,
    consentRequestURL : `http://${ipAddress}:${portNumber}/add-consent-request`,
    consentStatusURL : `http://${ipAddress}:${portNumber}/get-status-all`,
    addEHRURL : `http://${ipAddress}:${portNumber}/add-record`,
    getEHRDetailsListURL : `http://${ipAddress}:${portNumber}/get-episodes`,
    addEpisodeURL : `http://${ipAddress}:${portNumber}/add-episode`,
    addVisitURL : `http://${ipAddress}:${portNumber}/add-visit`,
    sendOtpPatientURL : `http://${ipAddress}:${portNumber}/send-otp-patient`,
    getPatientDataURL : `http://${ipAddress}:${portNumber}/get-patient-data`,
    registerNewPatientURL : `http://${ipAddress}:${portNumber}/register-new-patient`

};
export default configURL;