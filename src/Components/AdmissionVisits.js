import React, { useState } from 'react'
import './Stylesheets/AdmissionVisits.css'
const AdmissionVisits = ({ EpisodeData, index }) => {
    const [addVisit, setAddVisit] = useState(false);
    console.log("EpisodeData (", index, ") :", EpisodeData.visits)
    return (
        <div className='AdmissionVisitsContainer'>
            <div className='AddVisitSection'>
                <h4 className='AddVisitDivision'>Patient Visits</h4>
                <div className='AddVisitDivision AddButton'>
                    {
                        (!addVisit) && <button onClick={() => { setAddVisit(true) }} className="InputButtonLink">&nbsp;+&nbsp;</button>
                    }
                </div>
                <div className='AddVisitDivision AddButton'>
                    {
                        (addVisit) && <button onClick={() => { setAddVisit(false) }} className="InputButtonLink">&nbsp;-&nbsp;</button>
                    }
                </div>
                <div className='AddVisitDivision AddVisitForm'>
                    {
                        (addVisit) &&
                        <form>
                            <label className='InputLabel'>Enter Doctor Id.</label>
                            <input type="text" className='InputText' required />
                            <button type='submit' className='InputButton'>Add Visit</button>
                        </form>
                    }
                </div>
                <br />

            </div>
            <div className='VisitRecordsContainer'>
                <table className="VisitRecordsTable">
                    <thead>
                        <tr>
                            <th scope="col">Sl. No.</th>
                            <th scope="col">Visit Id.</th>
                            <th scope="col">Visit Date</th>
                            <th scope="col">Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EpisodeData.visits.sort((a, b) => a.visitId < b.visitId ? 1 : -1).map((visitRecord, ind) => {
                            return (
                                <tr>
                                    <td>{ind + 1}</td>
                                    <td>{visitRecord.visitId} </td>
                                    <td>{visitRecord.visit_date.substring(0, 16)}</td>
                                    <td>{visitRecord.doctor.doctorId} - {visitRecord.doctor.firstName} {visitRecord.doctor.lastName}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdmissionVisits