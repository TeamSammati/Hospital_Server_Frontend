import React, { useState } from 'react'
import './Stylesheets/NewConsentRequest.css'
import ConsentRequestService from '../Services/ConsentRequestService'
const NewConsentRequest = () => {
    const [patient_id, setPatient_id] = useState('')
    const [purpose, setPurpose] = useState('')
    const newConsentRequestHandler = async (requsetParams) => {
        try {
          const response = await ConsentRequestService.consentRequest(requsetParams)
          if (response) {
            alert("Request Sent Successfully!", response)
          }
        //   window.location.reload(true)
        }
        catch (exception) {
          alert("Request Unable to Send, Please try later...")
        //   window.location.reload(true)
        }
      }
    const requestHandler = (event) => {
        event.preventDefault(true)
        const requesttParams = {
            patient_id, purpose
        }
        newConsentRequestHandler(requesttParams)
        setPatient_id('')
        setPurpose('')
    }
    return (
        <div className='NewConsentRequestPage'>
            <div className='NewConsentRequestContainer'>
                <div className='NewConsentRequestTitle'>Generate New Consent Request</div>
                <form className='NewConsentRequestForm' onSubmit={requestHandler}>
                    <div className='NewConsentRequestRow'>
                        <div className='NewConsentRequestCol'>
                            <label className='InputLabel'>Patient Id. (*)</label>
                            <input
                                type='text'
                                className='InputText'
                                value={patient_id}
                                onChange={event => setPatient_id(event.target.value)}
                                required
                            />
                        </div>
                        <div className='NewConsentRequestCol'>
                            <label className='InputLabel'>Purpose (*)&emsp;&emsp;&emsp;&nbsp;</label>
                            <input
                                type='text'
                                className='InputText'
                                value={purpose}
                                onChange={event => setPurpose(event.target.value)}
                                required
                            />
                        </div>
                        <div className='NewConsentRequestCol'>
                            <button type="submit" className='InputButton'>Send Request &gt;&gt;</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewConsentRequest