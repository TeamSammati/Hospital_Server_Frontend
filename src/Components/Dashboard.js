import React, {useState} from 'react'
import HealthRecordForm from './HealthRecordForm'
import './Stylesheets/Dashboard.css'
const Dashboard = (user) => {
  const [newHealthRecord, setNewHealthRecord] = useState(false);
  return (
    <div>
      {
        <div className='DashboardPage'>
          <div className='DashboardMain'>

          </div>
          <div className='DashboardContent'>
            {/* <div className='HealthDataStatistics'>
              Health Data & Statistics
            </div>
            <div className='ConsentsRequests'>
              Consents & Requests
            </div> */}
            <div className='HealthDataStatistics'>
              <b>New Health Record</b>
              {
                (!newHealthRecord) && <button onClick={() => { setNewHealthRecord(true) }} className="InputButtonLink">&nbsp;+&nbsp;</button>
              }
              {
                (newHealthRecord) && <button onClick={() => { setNewHealthRecord(false) }} className="InputButtonLink">&nbsp;-&nbsp;</button>
              }
              {
                (newHealthRecord) && <HealthRecordForm user={user}/>
              }
            </div>
          </div>
        </div>
      }
    </div>

  )
}

export default Dashboard