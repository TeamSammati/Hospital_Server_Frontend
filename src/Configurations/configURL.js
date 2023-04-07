// All the Service URL's are to be included here...
let ipAddress = "172.16.144.47"
let portNumber = 6969;
const configURL = {
    loginURL : `http://${ipAddress}:${portNumber}/api/auth/authenticate`,
    registerURL : `http://${ipAddress}:${portNumber}/save`,
    consentRequestURL : `http://${ipAddress}:${portNumber}/consent_request`,
    consentStatusURL : `http://${ipAddress}:${portNumber}/get_status_all`,
    addEHRURL : `http://${ipAddress}:${portNumber}/addrecord`,
    getEHRDetailsListURL : `http://${ipAddress}:${portNumber}/get-episodes`,
    addEpisodeURL : `http://${ipAddress}:${portNumber}/addepisode`,
    addVisitURL : `http://${ipAddress}:${portNumber}/addvisit`,
    sendOtpPatientURL : `http://${ipAddress}:${portNumber}/api/auth/send-otp-patient`,
    getPatientDataURL : `http://${ipAddress}:${portNumber}/api/auth/get-patient-data`,
    registerNewPatientURL : `http://${ipAddress}:${portNumber}/api/auth/register_new_patient`

};
export default configURL;