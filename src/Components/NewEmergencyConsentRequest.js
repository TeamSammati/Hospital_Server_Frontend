import React, { useState } from 'react'
import './Stylesheets/NewConsentRequest.css'
import ConsentRequestService from '../Services/ConsentRequestService'
import {BiRightArrow} from 'react-icons/bi';
import swal from 'sweetalert';
const NewEmergencyConsentRequest = ({user, setNewEmergencyConsentRequest}) => {
    const [patient_id, setPatient_id] = useState('')
    const [purpose, setPurpose] = useState('')
    const [duration, setDuration] = useState(1)
    const newConsentRequestHandler = async (requestParams) => {
        try {
          const response = await ConsentRequestService.emergencyConsentRequest(requestParams)
          if (response) {
            console.log("Response",response);
            swal({
                title: "Operation Successfull",
                text: "Request Sent Successfully! Request Id. "+response.emergencyConsentRequestId,
                icon: "success",
                button: "Okay",
            });
            setNewEmergencyConsentRequest(false);
          }
          window.location.reload(true)

        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Request Unable to Send, Please try later...",
                icon: "error",
                button: "Okay",
            });
         window.location.reload(true)
        }
      }
    const requestHandler = (event) => {
        event.preventDefault(true)
        const requestParams = {
            doctorId: user.doctorId,
            doctorName: user.firstName+" "+user.lastName,
            hospitalId: 2, 
            patientId:parseInt(patient_id),
            duration: duration, 
            purpose: purpose
        }
        console.log(requestParams)
        newConsentRequestHandler(requestParams)
        setPatient_id('')
        setPurpose('')
    }
    return (
        <div className='NewConsentRequestPage'>
            <div className='NewConsentRequestContainer'>
                <div className='NewConsentRequestTitle'>Generate Emergency Consent Request</div>
                <form className='NewConsentRequestForm' onSubmit={requestHandler}>
                    <div className='NewConsentRequestRow row'>
                        <div className='NewConsentRequestCol col1'>
                            <label className='InputLabel'>Patient Id. (*)&nbsp;</label>
                            <input
                                type='text'
                                autoFocus
                                className='InputText'
                                value={patient_id}
                                onChange={event => setPatient_id(event.target.value)}
                                required
                            />
                        </div>
                        <div className='NewConsentRequestCol col2'>
                            <label className='InputLabel'>Duration (*)&nbsp;</label>
                            <input
                                type='number'
                                min={1}
                                max={10}
                                className='InputText'
                                value={duration}
                                onChange={event => setDuration(event.target.value)}
                                required
                            />
                        </div>
                        <div className='NewConsentRequestCol col3'>
                            <label className='InputLabel'>Purpose (*)&nbsp;</label>
                            <input
                                type='text'
                                className='InputText'
                                value={purpose}
                                onChange={event => setPurpose(event.target.value)}
                                required
                            />
                        </div>
                        <div className='NewConsentRequestCol col4' style={{marginTop:"-2px"}}>
                            <button type="submit" className='InputButton'>Confirm <BiRightArrow size={10}/></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewEmergencyConsentRequest