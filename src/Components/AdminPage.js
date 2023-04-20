import React, {useState, useEffect} from 'react'
import './Stylesheets/ActiveConsents.css'
// import pendingRequests from '../pendingEmergencyRequests.json';
import PendingEmergencyRequest from './PendingEmergencyRequest';
import ConsentStatusService from '../Services/ConsentStatusService'
const AdminPage = ({ user }) => { // { pendingRequests}
  const [pendingRequests, setPendingRequests] = useState([])
  async function fetchData() {
    if (user) {
      const data = await ConsentStatusService.getEmergencyList()
      setPendingRequests(data);
      // console.log("Emergency Consents: ", data)
    }
  }
  //fetchData();
  useEffect(() => {
    // const interval = setInterval(() => {
    //   fetchData()
    // }, 2000);
    // return () => clearInterval(interval);
    fetchData();
    
  }, []);
  return (
    <div className='ActiveConsentsPage'>
      <div className='ActiveConsentsTitle'>
        Emergency Consent Requests
      </div>
      <div className='ActiveConsentsContainer'>
        {
          (pendingRequests.length === 0) &&
          <div className='ActiveConsentsMessage'>
            No Emergency Requests
          </div>
        }
        {
          (pendingRequests.length !== 0) &&
          <div>
            <table className="ActiveConsentsTable">
              <thead>
                <tr>
                  <th scope="col">Sl. No.</th>
                  <th scope="col">Request Id.</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Patient Id.</th>
                  <th scope="col">Duration (in Days)</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Approve</th>
                  <th scope="col">Reject</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((pendingRequest, index) => (
                  <PendingEmergencyRequest
                    {...pendingRequest}
                    index={index}
                    key={index}
                    user={user}
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

export default AdminPage