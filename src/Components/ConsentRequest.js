import React from 'react'
import './Stylesheets/ConsentRequest.css'

const ConsentRequest = ({ consentRequestId, index, status}) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{consentRequestId} </td>
            <td>{status}</td>
        </tr>
    )
}

export default ConsentRequest