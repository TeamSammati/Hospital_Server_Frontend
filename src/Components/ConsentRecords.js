import React, {useState, useEffect} from 'react'
// import patientFetchData from '../patientFetchData.json'
import HospitalComponent from './HospitalComponent';
import './Stylesheets/consentRecords.css'
import HealthRecordService from '../Services/HealthRecordService';
import configURL from '../Configurations/configURL';
const {hospitalId} = configURL;
const ConsentRecords = ({consentId, user}) => {
    const [hospitalSearchValue, setHospitalSearchValue] = useState(parseInt(0))
    
    const [patientFetchData, setPatientFetchData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const reqParams = {
                consentId: consentId,
                doctorId: user.doctorId,
                hospitalId: hospitalId
            }
            const data = await HealthRecordService.fetchRecords(reqParams)
            setPatientFetchData(data);
                
        }
        fetchData()
    }, []);

    const hospitalList = patientFetchData.map((hospitalRecords, index) => {
        return {
            "index": index,
            "hospital_id": hospitalRecords.hospitalId,
            "hospital_name": hospitalRecords.hospitalName
        }
    })
    const hospitalOptionList = hospitalList.map((hospitalItem, index) => {
        return {
            id: index,
            value: parseInt(hospitalItem.hospital_id),
            displayName: "[" + hospitalItem.hospital_id + "] - " + hospitalItem.hospital_name
        }
    })
    function Options({ options }) {
        return (
            options.map(option =>
                <option key={option.id} value={option.value}>
                    {option.displayName}
                </option>)
        );
    }
    return (
        <div className='RecordsPage'>
            <div className='RecordsPageContainer'>
                <div className='RecordsFilter'>
                    <label className='InputLabel'>Filter by: Hospital</label>
                    <select
                        name="hospitalSearchValue"
                        className="InputText"
                        value={hospitalSearchValue}
                        onChange={e => setHospitalSearchValue(parseInt(e.target.value))}
                        required>
                        <option value="0">All</option>
                        <Options options={hospitalOptionList} />
                    </select>
                </div>

                {
                    (patientFetchData.length === 0) &&
                    <div className='RecordsPageMessage'>
                        No Health Records Available
                    </div>
                }
                {
                    (patientFetchData.length !== 0) &&
                    <div>
                        {patientFetchData.filter((hospital) => { return (hospitalSearchValue === 0 || hospitalSearchValue === hospital.hospitalId) }).map((hospitalRecords, index) => (
                            <HospitalComponent
                                key={index}
                                index={index}
                                hospitalRecords={hospitalRecords}
                            />
                        ))
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default ConsentRecords