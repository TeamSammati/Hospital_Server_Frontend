import React, { useState } from 'react'
import NewConsentRequest from './NewConsentRequest';
import './Stylesheets/Dashboard.css'
const Dashboard = ({user}) => {
  const [newConsentRequest, setNewConsentRequest] = useState(false);
  return (
    <div>
      {
        <div className='DashboardPage'>
          <div className='DashboardMain'>
            
          </div>
          <div className='DashboardContent'>
          <div className='HealthDataStatistics'>
          New Consent Request
          <button onClick={()=>{setNewConsentRequest(true)}} className="InputButton">New?</button>
          {
            (newConsentRequest) && <NewConsentRequest user={user} setNewConsentRequest={setNewConsentRequest}/> 
          }
          </div>
          <div className='ConsentsRequests'>
          Consents & Requests
          </div>
          </div>
        </div>
      }
    </div>
    
  )
}

export default Dashboard