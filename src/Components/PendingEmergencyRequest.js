import React from 'react'
// import consentResponseService from '../Services/ConsentResponseService'
import ConsentRequestService from '../Services/ConsentRequestService'
import swal from 'sweetalert';
// import './Stylesheets/ActiveConsent.css';
import {BiRightArrow} from 'react-icons/bi';
const PendingEmergencyRequest = ({ emergencyConsentRequestId, index, duration, patientId, purpose, doctorId, doctorName, user }) => {
    
    const consentRevokeHandler = async (reqParams) => {
        try {
            const response = await ConsentRequestService.emergencyConsentResponse(reqParams)
            console.log("Response Reject",response);
            if (response === -200) {
                swal({
                    title: "Operation Successfull",
                    text: "REJECTED",
                    icon: "success",
                    button: "Okay",
                })
                .then(()=>{
                    window.location.reload(true)
                });

            }
            else{
                swal({
                    title: "Operation Failed",
                    text: "Failed to Reject Request",
                    icon: "error",
                    button: "Okay",
                });
            }
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Failed to Reject Request",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const consentApproveHandler = async (reqParams) => {
        try {
            const response = await ConsentRequestService.emergencyConsentResponse(reqParams);
            console.log("Resonse Approve",response);
            if (response) {
                swal({
                    title: "Operation Successfull",
                    text: "APPROVED! consent Id: "+response,
                    icon: "success",
                    button: "Okay",
                })
                .then(()=>{
                    window.location.reload(true)
                });

            }
            else{
                swal({
                    title: "Operation Failed",
                    text: "Failed to Approve Request",
                    icon: "error",
                    button: "Okay",
                });
            }
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Failed to Approve Request",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const handleRevoke = param => event => {
        event.preventDefault()
        console.log(param);
        swal({
            title: "Are you sure to Reject Request - " + param.emergencyConsentRequestId + " ? ",
            text: "Requested Docotr No Longer able to access the EHR of Patient",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    consentRevokeHandler(param);
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }
    const handleApprove = param => event => {
        event.preventDefault()
        console.log(param);
        swal({
            title: "Are you sure to Approve Request - " + param.emergencyConsentRequestId + " ? ",
            text: "Requested Doctor will be able to access the EHR of Patient directly!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    consentApproveHandler(param);
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }
    
    

    return (
        <tr className='tableRow'>
            <td>{index + 1}</td>
            <td>{emergencyConsentRequestId} </td>
            <td>{doctorId} - {doctorName}</td>
            <td>{patientId}</td>
            <td>{duration}</td>
            <td>{purpose}</td>
            <td>
                <button type="button" className="btnAccept" onClick={handleApprove({emergencyConsentRequestId: emergencyConsentRequestId, consentRequestStatus: "APPROVED", authId: user.doctorId})}>Approve <BiRightArrow size={10}/></button>
                
            </td>
            <td>
                {
                    <button type="button" className="btnReject" onClick={handleRevoke({emergencyConsentRequestId: emergencyConsentRequestId, consentRequestStatus: "REJECTED", authId: user.doctorId})}>Reject <BiRightArrow size={10}/></button> 
                }
                
            </td>
        </tr>
    )
}

export default PendingEmergencyRequest