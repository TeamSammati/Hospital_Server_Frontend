import React, {useState, useEffect} from 'react'
import './Stylesheets/ActiveConsents.css'
import ActiveConsent from './ActiveConsent';
import ConsentStatusService from '../Services/ConsentStatusService';
// import activeConsents from '../activeConsentsData.json';
const ActiveConsents = ({ user }) => { // { activeConsents}
  const [activeConsents, setActiveConsents] = useState([])
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const data = await ConsentStatusService.getActiveConsents(user)
        setActiveConsents(data);
        console.log("Data Records: ", data)
      }
    }
    fetchData()
  }, [])
  return (
    <div className='ActiveConsentsPage'>
      <div className='ActiveConsentsTitle'>
        Consents with Sammati
      </div>
      <div className='ActiveConsentsContainer'>
        {
          (activeConsents.length === 0) &&
          <div className='ActiveConsentsMessage'>
            No Active Consents
          </div>
        }
        {
          (activeConsents.length !== 0) &&
          <div>
            <table className="ActiveConsentsTable">
              <thead>
                <tr>
                  <th scope="col">Sl. No.</th>
                  <th scope="col">Consent Id.</th>
                  <th scope="col">Consent Request Id.</th>
                  <th scope="col">Patient Id.</th>
                  <th scope="col">Fetch Health Records</th>
                  <th scope="col">Delegate</th>
                </tr>
              </thead>
              <tbody>
                {activeConsents.map((activeConsent, index) => (
                  <ActiveConsent
                    {...activeConsent}
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

export default ActiveConsents