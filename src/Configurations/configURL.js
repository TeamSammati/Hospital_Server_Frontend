// All the Service URL's are to be included here...
const configURL = {
    loginURL : `http://172.16.131.147:6969/api/auth/authenticate`,
    registerURL : `http://172.16.131.147:6969/save`,
    consentRequestURL : `http://172.16.131.147:6969/consent_request`,
    consentStatusURL : `http://172.16.131.147:6969/get_status_all`,
    addEHRURL : `http://172.16.131.147:6969/addrecord`,
    getEHRDetailsListURL : `http://172.16.131.147:6969/get-episodes`,
    addEpisodeURL : `http://172.16.131.147:6969/addepisode`,
    addVisitURL : `http://172.16.131.147:6969/addvisit`

};
export default configURL;