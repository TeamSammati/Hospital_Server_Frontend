import React, { useEffect, useState } from 'react'
// import consentResponseService from '../Services/ConsentResponseService'
import swal from 'sweetalert';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './Stylesheets/ActiveConsent.css';
// import hospitalDoctorData from '../hospitalDoctorData.json';
import { BiRightArrow } from 'react-icons/bi';
import ConsentRecords from './ConsentRecords'
import DelegationService from '../Services/DelegationService';
const ActiveConsent = ({ consentId, index, consentRequestId, patientId, consentType, user }) => {
    const [open, setOpen] = useState(false);
    const [fetch, setFetch] = useState(false);
    // const [otpValidation, setOtpValidation] = useState(false);
    const [hospitalSearchValue, setHospitalSearchValue] = useState(0);
    const [doctorSearchValue, setDoctorSearchValue] = useState(0);
    const [doctorsList, setDoctorsList] = useState([]);
    const [delegationDuration, setDelegationDuration] = useState(1);

    const [hospitalDoctorData, setHospitalDoctorData] = useState([])
    useEffect(() => {
        async function fetchData() {

            const data = await DelegationService.getHospitalDoctors()
            setHospitalDoctorData(data);

        }
        fetchData()
    }, []);

    const hospitalList = hospitalDoctorData.map((hospitalItem, index) => {
        return {
            id: index,
            value: parseInt(hospitalItem.hospitalId),
            displayName: "[" + hospitalItem.hospitalId + "] - " + hospitalItem.hospitalName
        }
    });
    //console.log(hospitalList);
    //console.log(hospitalDoctorData.filter((item)=> item.hospitalId === 1));
    var doctorList = [];
    useEffect(() => {
        setDoctorsList([]);
        setDoctorSearchValue(0);
        doctorList = (hospitalDoctorData.filter((item) => item.hospitalId === parseInt(hospitalSearchValue))[0]);
        if (doctorList) {
            doctorList = doctorList.doctors;
            setDoctorsList(doctorList.map((item, index) => { return { "id": index, "value": parseInt(item[0]), "displayName": "[ " + parseInt(item[0]) + " ] - " + item[1] } }));

        }
    }, [hospitalSearchValue]);

    useEffect(() => {
        //console.log("Doctors List",doctorsList);
    }, [doctorsList]);
    function Options({ options }) {
        return (
            options.map(option =>
                <option key={option.id} value={option.value}>
                    {option.displayName}
                </option>)
        );
    }
    const delegationHandler = async (reqParams) => {
        try {
            const response = await DelegationService.delegate(reqParams)
            if (response !== -99) {
                swal({
                    title: "Successful! Your Delegation Id: " + response,
                    text: "Delegated to Doctor: " + reqParams.doctorId + " of Hospital Id. " + reqParams.hospitalId,
                    icon: "success",
                    button: "Okay",
                });
            }
            else {
                swal({
                    title: "Operation Failed",
                    text: "Delegation Failed to Doctor: " + reqParams.doctorId + " of Hospital Id. " + reqParams.hospitalId,
                    icon: "error",
                    button: "Okay",
                });
            }
        }
        catch (exception) {
            console.log("Failed to Delegate");
            swal({
                title: "Operation Failed",
                text: "Delegation Failed to Doctor: " + reqParams.doctorId + " of Hospital Id. " + reqParams.hospitalId,
                icon: "error",
                button: "Okay",
            });
        }
    }

    const handleDelegationRequest = param => event => {
        event.preventDefault()
        // console.log(param);
        swal({
            title: "Are you sure to Delegate Consent - Id: " + param + " ? ",
            text: "Patients Health Data is Accessible to the Delegated Doctor.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setOpen(true)
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }
    const handleDelegateSubmit = param => event => {
        event.preventDefault()
        console.log(param);
        if (param.doctor === 0 || param.hospital === 0) {
            swal({
                title: "Select All Fields",
                icon: "warning",
                button: "Okay",
            });
            return;
        }


        // console.log(param);
        //Set reqParams

        //Backend Call
        delegationHandler(param);
        //Message

        setHospitalSearchValue(0);
        setDoctorSearchValue(0);
        setOpen(false);

    }


    return (
        <tr className='tableRow'>
            <td>{index + 1}</td>
            <td>{consentId} </td>
            <td>{consentRequestId}</td>
            <td>{patientId}</td>
            <td>
                <button type="button" className="btnAccept" onClick={() => { setFetch(true) }}>Fetch <BiRightArrow size={10} /></button>
                <Modal open={fetch} onClose={() => setFetch(false)} setOpen={setFetch} closeOnOverlayClick={false}>
                    <h4 style={{ textAlign: "left", color: "navy", margin: "10px", width: "100%" }}>Patient Health Records</h4>
                    <hr />
                    <h5>Request: {consentRequestId} &ensp; &ensp; Consent: {consentId} &ensp; &ensp; Patient: {patientId}</h5>
                    <p style={{ fontStyle: "italic", fontFamily: "intensive", textAlign: "center" }}>(*) Expand to View Hospitalwise Health Records</p>
                    <ConsentRecords
                        consentRequestId={consentRequestId}
                        setOpen={setOpen}
                        consentId={consentId}
                        patientId={patientId}
                        user={user}
                    />
                </Modal>
            </td>
            <td>
                {
                    (consentType === 1) ?
                        <button type="button" className="btnReject" onClick={handleDelegationRequest(consentId)}>Delegate <BiRightArrow size={10} /></button> :
                        <h6>:: Non-Delegatable ::</h6>
                }
                <Modal open={open} onClose={() => setOpen(false)} setOpen={setOpen} closeOnOverlayClick={false}>
                    <h4 style={{ textAlign: "left", color: "navy", margin: "10px", width: "100%" }}>Consent Delegation</h4>
                    <hr />
                    <h5>Patient Id: {patientId} &ensp; &ensp; Consent Id: {consentId}</h5>
                    <p style={{ fontStyle: "italic", fontFamily: "intensive", textAlign: "center" }}>(*) Select Doctor to Delegate.<br /> Please Note that Delegated Doctor Can Access Patient's (Unique Id. Number: {patientId})<br /> Health Records for specified Duration & Cannot Delegate further...</p>
                    <form onSubmit={handleDelegateSubmit({ doctorId: doctorSearchValue, hospitalId: hospitalSearchValue, consentId: consentId, duration: delegationDuration, requestingDoctorId:user.doctorId, requestingHospitalId:2})}>
                        <div className='RecordsFilter' style={{ margin: "20px 0px" }}>
                            <label className='InputLabel'>Hospital</label>
                            <select
                                name="hospitalSearchValue"
                                className="InputText"
                                value={hospitalSearchValue}
                                onChange={e => setHospitalSearchValue(parseInt(e.target.value))}
                                required
                                style={{ marginRight: "10px" }}
                            >
                                <option value="0" disabled>Select Anyone</option>
                                <Options options={hospitalList} />
                            </select>
                            <label className='InputLabel'>Doctor</label>
                            <select
                                name="doctorSearchValue"
                                className="InputText"
                                value={doctorSearchValue}
                                onChange={e => setDoctorSearchValue(parseInt(e.target.value))}
                                required>
                                <option value="0" disabled>Select Anyone</option>
                                <Options options={doctorsList} />
                            </select>
                        </div>
                        <div>
                            <label className='InputLabel'>Duration (in Days)</label>
                            <input type="number" min={1} max={60} className='InputText' value={delegationDuration} onChange={(e) => { setDelegationDuration(e.target.value) }} required />
                            <button type="submit" className='InputButton'>Confirm & Delegate <BiRightArrow size={10} /></button>
                        </div>
                    </form>
                </Modal>
            </td>
        </tr>
    )
}

export default ActiveConsent