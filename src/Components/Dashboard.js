import React, { useState } from 'react'
import HealthRecordForm from './HealthRecordForm'
import './Stylesheets/Dashboard.css'
import DashboardProfile from './DashboardProfile';
const Dashboard = ({ user }) => {
  const [newHealthRecord, setNewHealthRecord] = useState(false);
  return (
    <div>
      {
        <div className='DashboardPage'>
          <DashboardProfile user={user} />

          <div className='DashboardContent'>
            {
              (user.role === "DOCTOR") &&
              <div>
                <h4 style={{ textAlign: "center", color: "green" }}>Treatment Section</h4>
                <div className='HealthDataStatistics'>

                  <b>New Health Record</b>
                  {
                    (!newHealthRecord) && <button onClick={() => { setNewHealthRecord(true) }} className="InputButtonLink">&nbsp;+&nbsp;</button>
                  }
                  {
                    (newHealthRecord) && <button onClick={() => { setNewHealthRecord(false) }} className="InputButtonLink">&nbsp;-&nbsp;</button>
                  }
                  {
                    (newHealthRecord) && <HealthRecordForm user={user} />
                  }
                </div>
              </div>
            }

            

          </div>
        </div>
      }
    </div>

  )
}

export default Dashboard