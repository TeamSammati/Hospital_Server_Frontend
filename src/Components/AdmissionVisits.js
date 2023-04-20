import React, { useState } from 'react'
import './Stylesheets/AdmissionVisits.css'
import AddVisitService from '../Services/AddVisitService'
import swal from 'sweetalert'
const AdmissionVisits = ({ EpisodeData, index, patient_id, fetchHandler }) => {
    const [addVisit, setAddVisit] = useState(false);
    const [doctorId, setDoctorId] = useState('');
    //console.log("EpisodeData (", index, ") :", EpisodeData.visits)
    const addHandler = async (requestParams) => {
        try {
            const responseObject = await AddVisitService.addVisit(requestParams)
            if(responseObject === "DoctorNotExist"){
                swal({
                    title: "Operation Failed",
                    text: "Doctor Id. Is Invalid or Not Exist ",
                    icon: "error",
                    button: "Okay",
                }).then(()=>{
                    return;
                })
                return;
            }
            if(responseObject)
                swal({
                    title: "Operation Successfull",
                    text: "Visit Added Successfully! " + responseObject,
                    icon: "success",
                    button: "Okay",
                }).then(()=>{
                    window.location.reload(true);
                });
            else{
                swal({
                    title: "Operation Failed",
                    text: "Unable to Add Details, Try Again Later...",
                    icon: "error",
                    button: "Okay",
                  }); 
            }
            
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Unable to Add Details, Try Again Later...",
                icon: "error",
                button: "Okay",
              });
        }
    }
    const addRequestHandler = (event) => {
        event.preventDefault(true)
        const requestParams = {
            patientId: parseInt(patient_id),
            episodeId: parseInt(EpisodeData.episodeId),
            doctorId: doctorId
        }
        addHandler(requestParams);
        const reqParams = {
            patientId: parseInt(patient_id)
        }
        fetchHandler(reqParams)
        //console.log('sent!...')
        setDoctorId('')
    }
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
                        <form onSubmit={addRequestHandler}>
                            <label className='InputLabel'>Enter Doctor Id.</label>
                            <input type="text" className='InputText' value={doctorId} onChange={(e) => { setDoctorId(e.target.value) }} required />
                            <button type='submit' className='InputButton'>Add Visit</button>
                        </form>
                    }
                </div>
                <br />

            </div>
            {
                (EpisodeData.visits.length === 0) ?
                    <h4>Add Visits To Show here!</h4> :
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
                                            <td>{visitRecord.visit_date.substring(0, 10)}</td>
                                            <td>{visitRecord.doctor.doctorId} - {visitRecord.doctor.firstName} {visitRecord.doctor.lastName}</td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    )
}

export default AdmissionVisits