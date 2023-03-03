import React from 'react'
import './Stylesheets/ConsentRequests.css'
import ConsentRequest from './ConsentRequest'
const ConsentRequests = ({ consentRequests }) => {
  return (
    <div className='ConsentRequestsPage'>
      <div className='ConsentRequestTitle'>
        Consent Requests at Sammati
      </div>
      <div className='ConsentRequestContainer'>
        {
          (consentRequests.length === 0) &&
          <div className='ConsentRequestMessage'>
            No Requests Made
          </div>
        }
        {
          (consentRequests.length !== 0) &&
          <div>
            <table className="ConsentRequestTable">
              <thead>
                <tr>
                  <th scope="col">Sl. No.</th>
                  <th scope="col">Patient Id.</th>
                  <th scope="col">Consent Request Id.</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {consentRequests.map((consentRequest, index) => (
                  <ConsentRequest
                    consentRequest={consentRequest}
                    index={index}
                    key={index}
                  />
                ))
                }
              </tbody>
            </table>
          </div>
        }

      </div>
    </div>
  )
}

export default ConsentRequests