import React from 'react'
import './Stylesheets/ConsentRequest.css'

const ConsentRequest = ({ consentRequest, index }) => {
    // console.log("consentRequest : ",consentRequest)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{consentRequest.patientId} </td>
            <td>{consentRequest.consentRequestId}</td>
            <td>{consentRequest.purpose}</td>
            <td>{consentRequest.consentRequestStatus}</td>
        </tr>
    )
}

export default ConsentRequest