import React, { useState } from 'react'
import ConsentRequests from './ConsentRequests'
import NewConsentRequest from './NewConsentRequest'
import './Stylesheets/Dashboard.css'
const Dashboard = ({user, consentRequests}) => {
    const [page, setPage] = useState(1)
  return (
    <div>
      {
        (page === 1) && 
        <div className='DashboardPage'>
          <div className='DashboardMain'>
            
          </div>
          <div className='DashboardContent'>
          <div className='HealthDataStatistics'>
          New Consent Request
          <button onClick={()=>{setPage(2)}} className='btnPage2Go'>Goto Generate Request Page &gt;&gt;</button>
          </div>
          <div className='ConsentsRequests'>
          Consents & Requests
          <button onClick={()=>{setPage(3)}} className='btnPage2Go'>Goto Requests &gt;&gt;</button>
          </div>
          </div>
        </div>
      }
      {
        (page === 2) &&
        <div className='RequestsPage'>
          <NewConsentRequest consentRequests={consentRequests} page={page} setPage={setPage}/>
          <button onClick={()=>{setPage(1)}} className='btnPage2Back'>Goto Dashboard &gt;&gt;</button>
        </div>
      }
      {
        (page === 3) &&
        <div className='RequestsPage'>
          <ConsentRequests consentRequests={consentRequests} page={page} setPage={setPage}/>
          <button onClick={()=>{setPage(1)}} className='btnPage2Back'>Goto Dashboard &gt;&gt;</button>
        </div>
      }
    </div>
    
  )
}

export default Dashboard