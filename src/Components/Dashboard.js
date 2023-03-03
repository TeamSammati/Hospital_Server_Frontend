import React from 'react'
import ConsentRequests from './ConsentRequests'
import NewConsentRequest from './NewConsentRequest'
import './Stylesheets/Dashboard.css'
const Dashboard = ({user, consentRequests, currPage, setCurrPage}) => {
    //const [page, setPage] = useState(1)
  return (
    <div>
      {
        (currPage === 1) && 
        <div className='DashboardPage'>
          <div className='DashboardMain'>
            
          </div>
          <div className='DashboardContent'>
          <div className='HealthDataStatistics'>
          New Consent Request
          <button onClick={()=>{setCurrPage(2); window.localStorage.setItem('currPage', JSON.stringify(2)) }} className='btnPage2Go'>Goto Generate Request Page &gt;&gt;</button>
          </div>
          <div className='ConsentsRequests'>
          Consents & Requests
          <button onClick={()=>{setCurrPage(3); window.localStorage.setItem('currPage', JSON.stringify(3)) }} className='btnPage2Go'>Goto Requests &gt;&gt;</button>
          </div>
          </div>
        </div>
      }
      {
        (currPage === 2) &&
        <div className='RequestsPage'>
          <NewConsentRequest consentRequests={consentRequests} page={currPage} setPage={setCurrPage} user={user}/>
          <button onClick={()=>{setCurrPage(1); window.localStorage.setItem('currPage', JSON.stringify(1)) }} className='btnPage2Back'>Goto Dashboard &gt;&gt;</button>
        </div>
      }
      {
        (currPage === 3) &&
        <div className='RequestsPage'>
          <ConsentRequests consentRequests={consentRequests} page={currPage} setPage={setCurrPage}/>
          <button onClick={()=>{setCurrPage(1); window.localStorage.setItem('currPage', JSON.stringify(1)) }} className='btnPage2Back'>Goto Dashboard &gt;&gt;</button>
        </div>
      }
    </div>
    
  )
}

export default Dashboard