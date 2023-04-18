import React, { useState } from 'react'
import './Stylesheets/ConsentRequests.css'
import ConsentRequest from './ConsentRequest'
import NewConsentRequest from './NewConsentRequest';
import NewEmergencyConsentRequest from './NewEmergencyConsentRequest';
const ConsentRequests = ({ consentRequests, user }) => {
  const [newConsentRequest, setNewConsentRequest] = useState(false);
  const [newEmergencyConsentRequest, setNewEmergencyConsentRequest] = useState(false);
  //console.log(consentRequests);
  return (
    <div className='ConsentRequestsPage'>
      <div className='ConsentRequestTitle'>
        Consent Requests at Sammati
      </div>
      <div className='HealthDataStatistics'>
        New Consent Request
        {
          (!newConsentRequest) && <button onClick={() => { setNewConsentRequest(true) }} className="InputButtonLink">&nbsp;+&nbsp;</button>
        }
        {
          (newConsentRequest) && <button onClick={() => { setNewConsentRequest(false) }} className="InputButtonLink">&nbsp;-&nbsp;</button>
        }
        {
          (newConsentRequest) && <NewConsentRequest user={user} setNewConsentRequest={setNewConsentRequest} />
        }
      </div>
      <div className='HealthDataStatistics'>
        New Emergency Consent Request
        {
          (!newEmergencyConsentRequest) && <button onClick={() => { setNewEmergencyConsentRequest(true) }} className="InputButtonLink">&nbsp;+&nbsp;</button>
        }
        {
          (newEmergencyConsentRequest) && <button onClick={() => { setNewEmergencyConsentRequest(false) }} className="InputButtonLink">&nbsp;-&nbsp;</button>
        }
        {
          (newEmergencyConsentRequest) && <NewEmergencyConsentRequest user={user} setNewEmergencyConsentRequest={setNewEmergencyConsentRequest}/>
        }
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
                  <th scope="col">Purpose</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {consentRequests.sort((a, b) => a.consentRequestId < b.consentRequestId ? 1 : -1).map((consentRequest, index) => (
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