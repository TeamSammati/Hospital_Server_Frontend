import React from 'react'
import './Stylesheets/ConsentRequest.css'

const ConsentRequest = ({ consentRequest, index }) => {
    console.log("consentRequest : ",consentRequest)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{consentRequest[0]} </td>
            <td>{consentRequest[1]}</td>
            <td>{consentRequest[2]}</td>
        </tr>
    )
}

export default ConsentRequest