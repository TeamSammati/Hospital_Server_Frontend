import React, { useState } from 'react'
import './Stylesheets/NewConsentRequest.css'
import ConsentRequestService from '../Services/ConsentRequestService'
import {BiRightArrow} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
const NewConsentRequest = ({user, setNewConsentRequest}) => {
    const [patient_id, setPatient_id] = useState('')
    const [purpose, setPurpose] = useState('')
    const navigate = useNavigate();
    const newConsentRequestHandler = async (requestParams) => {
        try {
          const response = await ConsentRequestService.consentRequest(requestParams)
          if(response === "PatientNotExist"){
            swal({
                title: "Operation Failed",
                text: "Patient Not Registered. Cannot Request without being registered in Hospital",
                icon: "error",
                button: "Okay",
            }).then(()=>{
                setPatient_id('');
                setPurpose('');
            })
            return;
          }
          if (response) {
            swal({
                title: "Operation Successfull",
                text: "Request Sent Successfully!"+response,
                icon: "success",
                button: "Okay",
            }).then(()=>{
                setNewConsentRequest(false);
                window.location.reload(true);
            })
          }
          else{
            swal({
                title: "Operation Failed",
                text: "Request Unable to Send, Please try later...",
                icon: "error",
                button: "Okay",
            }).then(()=>{
                window.location.reload(true)
            });
          }
          
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Request Unable to Send, Please try later...",
                icon: "error",
                button: "Okay",
            }).then(()=>{
                window.location.reload(true)
            })
         
        }
      }
    const requestHandler = (event) => {
        event.preventDefault(true)
        const requestParams = {
            patientId:parseInt(patient_id), doctorId: user.doctorId, hospitalId: 2, purpose: purpose
        }
        console.log(requestParams)
        newConsentRequestHandler(requestParams)
        setPatient_id('')
        setPurpose('')
    }
    return (
        <div className='NewConsentRequestPage'>
            <div className='NewConsentRequestContainer'>
                <div className='NewConsentRequestTitle'>Generate Consent Request</div>
                <form className='NewConsentRequestForm' onSubmit={requestHandler}>
                    <div className='NewConsentRequestRow row'>
                        <div className='NewConsentRequestCol col1'>
                            <label className='InputLabel'>Patient Id. (*)</label>
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
                            <label className='InputLabel'>Purpose (*)&emsp;&emsp;&emsp;&nbsp;</label>
                            <input
                                type='text'
                                className='InputText'
                                value={purpose}
                                onChange={event => setPurpose(event.target.value)}
                                required
                            />
                        </div>
                        <div className='NewConsentRequestCol col3'>
                            <button type="submit" className='InputButton'>Confirm <BiRightArrow size={10}/></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewConsentRequest