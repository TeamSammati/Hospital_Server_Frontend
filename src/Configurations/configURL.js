// All the Service URL's are to be included here...
let ipAddress = "172.16.137.28"
let portNumber = 6999;
const configURL = {
    loginURL : `http://${ipAddress}:${portNumber}/api/auth/authenticate`,
    userURL : `http://${ipAddress}:${portNumber}/doctor-details`,
    registerURL : `http://${ipAddress}:${portNumber}/save`,
    consentRequestURL : `http://${ipAddress}:${portNumber}/add-consent-request`,
    consentStatusURL : `http://${ipAddress}:${portNumber}/get-status-all`,
    addEHRURL : `http://${ipAddress}:${portNumber}/add-record`,
    getEHRDetailsListURL : `http://${ipAddress}:${portNumber}/get-episodes`,
    addEpisodeURL : `http://${ipAddress}:${portNumber}/add-episode`,
    addVisitURL : `http://${ipAddress}:${portNumber}/add-visit`,
    sendOtpPatientURL : `http://${ipAddress}:${portNumber}/send-otp-patient`,
    getPatientDataURL : `http://${ipAddress}:${portNumber}/get-patient-data`,
    registerNewPatientURL : `http://${ipAddress}:${portNumber}/register-new-patient`,
    activeConsentsDoctorURL : `http://${ipAddress}:${portNumber}/active-consents-doctor`,
    delegateURL : `http://${ipAddress}:${portNumber}/delegate`,
    fetchRecordsURL : `http://${ipAddress}:${portNumber}/fetch-data`,
    getHospitalDoctorURL : `http://${ipAddress}:${portNumber}/hospital-doctor`,
    getAllHospitalDoctorURL : `http://${ipAddress}:${portNumber}/get-all-hospital-with-doctors`,
    emergencyConsentRequestURL : `http://${ipAddress}:${portNumber}/add-emergency-consent-request`,
    getEmergencyConsentRequestsURL : `http://${ipAddress}:${portNumber}/get-pending-emergency-cr`,
    emergencyConsentResponseURL : `http://${ipAddress}:${portNumber}/accept-emergency-consent`,
    fetchPatientRecordsURL : `http://${ipAddress}:${portNumber}/get-patient-records`,
    hospitalId: 2
};
export default configURL;