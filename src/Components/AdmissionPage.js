import './Stylesheets/AdmissionPage.css'
import React, { useState, useEffect } from 'react'
import AdmissionVisits from './AdmissionVisits';
import LocalEHRDetailsListService from '../Services/LocalEHRDetailsListService'
import AddEpisodeService from '../Services/AddEpisodeService'
import PatientRegistrationService from '../Services/PatientRegistrationService'
import { TbCircleNumber1, TbCircle1Filled, TbCircleNumber2, TbCircleNumber3, TbCircle2Filled, TbCircle3Filled, TbArrowBigRightLinesFilled, TbArrowBigRightLines } from 'react-icons/tb';
// import patient from '../image.json';
import QRScanner from './QRScanner';
import swal from 'sweetalert';
import configURL from "../Configurations/configURL"
const {hospitalId} = configURL
const AdmissionPage = () => {
    const [addEpisode, setAddEpisode] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [patient_id, setPatient_id] = useState('');
    const [episodeType, setEpisodeType] = useState('');
    const [EpisodeDataList, setEpisodeDataList] = useState([]);
    const [fetchPatient, setFetchPatient] = useState(true);
    const [register, setRegister] = useState(false);
    const [regSec1, setRegSec1] = useState(true);
    const [regSec2, setRegSec2] = useState(false);
    const [regSec3, setRegSec3] = useState(false);
    const [id, setId] = useState(null);
    const [scan, setScan] = useState(false);
    const [regOtp, setRegOtp] = useState('');
    const [patient, setPatient] = useState(null);
    const handleExpand = (index) => {
        setExpandedIndex(index);
    };
    const ProceedRequestHandler = async (requestParams) => {
        try {
            const responseObject = await PatientRegistrationService.sendOtp(requestParams)
            if(responseObject === "Exist"){
                swal({
                    title: "Operation Failed",
                    text: "Patient Already Registered in this Hospital",
                    icon: "error",
                    button: "Okay",
                }); 
                return;
            }
            if (responseObject) {
                setRegSec1(false); setRegSec2(true); setRegSec3(false);
            }
            else {
                swal({
                    title: "Operation Failed",
                    text: "Invalid Patient QR or No Regd. Mobile Number Exist for the Patient at Sammati",
                    icon: "error",
                    button: "Okay",
                });

            }
            // console.log(responseObject)
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Unable to Send Request, Try Again Later...",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const handleProceed = (event) => {
        event.preventDefault(true);
        const requestParams = {
            patientId: parseInt(id)
        }
        ProceedRequestHandler(requestParams);
    }
    const ValidateRequestHandler = async (requestParams) => {
        try {
            const responseObject = await PatientRegistrationService.validateOtp(requestParams)
            if (responseObject) {
                setPatient(responseObject);
                setId(null);
                setRegOtp('');
                setRegSec1(false); setRegSec2(false); setRegSec3(true);
            }
            else {
                swal({
                    title: "Operation Failed",
                    text: "Invalid OTP, Try Again!",
                    icon: "error",
                    button: "Okay",
                });
                
                setRegOtp('');
            }
            // console.log(responseObject)
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Unable to Send Request, Try Again Later...",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const handleValidate = (event) => {
        event.preventDefault(true);
        const requestParams = {
            patientId: parseInt(id),
            hospitalId: hospitalId,
            otp: regOtp
        }
        ValidateRequestHandler(requestParams);
    }
    const RegisterRequestHandler = async (requestParams) => {
        try {
            const responseObject = await PatientRegistrationService.registerPatient(requestParams)
            if (responseObject) {
                setPatient(responseObject);
                swal({
                    title: "Operation Successfull",
                    text: "Patient Registration Successfull!!!",
                    icon: "success",
                    button: "Okay",
                  }).then(()=>{
                    setRegSec1(true); setRegSec2(false); setRegSec3(false);
                  })
                
            }
            else {
                swal({
                    title: "Operation Failed",
                    text: "Patient Registration Failed...",
                    icon: "error",
                    button: "Okay",
                });
            }
            console.log(responseObject)
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Unable to Send Request, Try Again Later...",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const handleRegister = (event) => {
        event.preventDefault(true);
        RegisterRequestHandler(patient);
    }

    const fetchHandler = async (requestParams) => {
        try {
            const responseObject = await LocalEHRDetailsListService.getEHRDetailsList(requestParams);
            console.log("responseObject",responseObject);
            if(responseObject === "NotExist"){
                swal({
                    title: "Operation Failed",
                    text: "Patient Not Registered, Register First!",
                    icon: "error",
                    button: "Okay",
                });
                return;
            }
            setEpisodeDataList(responseObject);
            console.log(responseObject)
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Unable to Fetch Details, Try Again Later...",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const fetchRequestHandler = (event) => {
        if (patient_id === '' || patient_id <= 0) {
            swal({
                text: "Enter Valid Patient Id.",
                icon: "warning",
                button: "Okay",
            });
            return;
        }
        event.preventDefault(true)
        setFetchPatient(false)
        const requestParams = {
            patientId: parseInt(patient_id)
        }
        fetchHandler(requestParams)
        // setPatient_id('')
    }
    const addHandler = async (requestParams) => {
        try {
            const responseObject = await AddEpisodeService.addEpisode(requestParams)
            swal({
                title: "Operation Successfull",
                text: "Episode Added Successfully! " + responseObject,
                icon: "success",
                button: "Okay",
              });
            console.log(responseObject)
            const reqParams = {
                patientId: parseInt(patient_id)
            }
            fetchHandler(reqParams)
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Unable to Add Details, Try Again Later..." + exception,
                icon: "error",
                button: "Okay",
            });
        }
    }
    const addRequestHandler = (event) => {
        event.preventDefault(true)
        const requestParams = {
            patientId: parseInt(patient_id),
            episodetype: episodeType
        }
        addHandler(requestParams)
        setEpisodeType('')
    }
    function ImageComponent({ base64String }) {
        const binaryString = atob(base64String.slice("data:image/png;base64,".length));
        const byteArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([byteArray], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);

        return <img src={imageUrl} alt="PNG_image" className='imgPatient' />;
    }
    useEffect(() => {
        console.log(patient);
    }, [patient]);

    return (
        <div className='AdmissionPage'>
            {(!register) ? <div className='AdmissionPageTitle'>Admissions</div> : <div className='AdmissionPageTitle'>Patient Registration</div>}
            {(!register) && <button className='InputLink' onClick={() => { setRegister(true) }}>+ New Patient Registration</button>}
            {
                (register) &&
                <div className='RegisterPageContainer'>
                    <div className='MainContainer'>
                        <div>
                            {
                                (regSec1) &&
                                <div className='QRSection'>
                                    <div className='PageHeader'>
                                        <div className='fr1'><span style={{ float: "left" }}><TbCircle1Filled className='Icons' size={30} /> <br /> <span>QR Scan</span> </span></div>
                                        <TbArrowBigRightLinesFilled style={{ float: "left" }} className='Icons Arrow1' size={30} />
                                        <div className='fr2'><span style={{ float: "left" }}><TbCircleNumber2 className='Icons' size={30} /> <br /> <span>OTP Validation</span></span></div>
                                        <TbArrowBigRightLines style={{ float: "left" }} className='Icons Arrow2' size={30} />
                                        <div className='fr3'><span style={{ float: "left" }}><TbCircleNumber3 className='Icons' size={30} /> <br /> <span>Save Details</span></span></div>
                                    </div>
                                    <div className='PageBody'>Start QR Scanner by Clicking on 'Scan'</div>
                                    <div ScanSection>
                                        {
                                            (scan) ?
                                                <button className='InputLink ScanButton' onClick={() => { setScan(false) }}>Close Scanner</button> :
                                                <button className='InputLink ScanButton' onClick={() => { setScan(true) }}>Scan</button>
                                        }
                                        <br /><br /><br />
                                        {
                                            (scan) &&
                                            <QRScanner
                                                id={id}
                                                setId={setId}
                                            />
                                        }
                                    </div>
                                    <label className='InputLabel'>Unique Patient Id. </label>
                                    <input type='text' value={id} className='InputText' disabled></input><span></span>
                                    {(id !== null) && <button className='InputButton' onClick={handleProceed}>Proceed</button>}
                                </div>
                            }
                            {
                                (regSec2) &&
                                <div className='ValidateSection'>
                                    <div className='PageHeader'>
                                        <div className='fr1'><span style={{ float: "left" }}><TbCircleNumber1 className='Icons' size={30} /> <br /> <span>QR Scan</span> </span></div>
                                        <TbArrowBigRightLinesFilled style={{ float: "left" }} className='Icons Arrow1' size={30} />
                                        <div className='fr2'><span style={{ float: "left" }}><TbCircle2Filled className='Icons' size={30} /> <br /> <span>OTP Validation</span></span></div>
                                        <TbArrowBigRightLinesFilled style={{ float: "left" }} className='Icons' size={30} />
                                        <div className='fr3'><span style={{ float: "left" }}><TbCircleNumber3 className='Icons Arrow2' size={30} /> <br /> <span>Save Details</span></span></div>
                                    </div>
                                    <div className='PageBody'>Enter High Security PIN. Sent to the Patient's Registered Mobile No.</div>
                                    <label className='InputLabel'>Enter OTP </label>
                                    <input type='password' className='InputText' value={regOtp} onChange={(e) => { setRegOtp(e.target.value) }} ></input><span></span>
                                    <button className='InputButton' onClick={handleValidate}>Validate</button>
                                </div>
                            }
                            {
                                (regSec3) &&
                                <div className='DetailsSection'>
                                    <div className='PageHeader'>
                                        <div className='fr1'><span style={{ float: "left" }}><TbCircleNumber1 className='Icons' size={30} /> <br /> <span>QR Scan</span> </span></div>
                                        <TbArrowBigRightLinesFilled style={{ float: "left" }} className='Icons' size={30} />
                                        <div className='fr2'> <span style={{ float: "left" }}><TbCircleNumber2 className='Icons' size={30} /> <br /> <span>OTP Validation</span></span></div>
                                        <TbArrowBigRightLinesFilled style={{ float: "left" }} className='Icons' size={30} />
                                        <div className='fr3'><span style={{ float: "left" }}><TbCircle3Filled className='Icons' size={30} /> <br /> <span>Save Details</span></span></div>
                                    </div>
                                    {
                                        (patient !== null) ?
                                            <div>
                                                <div className='PageBody'>Fetched Global Patient Details</div>
                                                {
                                                    (patient && patient.passPhoto) &&
                                                    <div className='imgComponent'><ImageComponent base64String={patient.passPhoto} /></div>
                                                }
                                                
                                                <div className='form_content'>
                                                    <label className='InputLabel'>Unique Patient Id.</label>
                                                    <input type='text' className='InputText' value={patient.patientId} disabled></input>
                                                    <label className='InputLabel'>Name</label>
                                                    <input type='text' className='InputText' value={patient.firstName + " " + patient.lastName} disabled></input>
                                                    <label className='InputLabel'>Date of Birth</label>
                                                    <input type='text' className='InputText' value={patient.dob} disabled></input>
                                                    <label className='InputLabel'>Gender</label>
                                                    <input type='text' className='InputText' value={patient.gender} disabled></input>
                                                    <label className='InputLabel'>Mobile Number</label>
                                                    <input type='text' className='InputText' value={patient.phoneNumber} disabled></input>
                                                    <label className='InputLabel'>Address</label>
                                                    <input type='text' className='InputText' value={patient.address + ", " + patient.state + " - " + patient.pinCode} disabled></input>
                                                </div>
                                                <button className='InputButton' onClick={handleRegister}>Register</button>
                                            </div> :
                                            <div>No Data Available</div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <button className='InputLink' onClick={() => { setRegSec1(true); setRegSec2(false); setRegSec3(false); setRegister(false); }}>&lt; Go to AdmissionPage</button>
                </div>
            }
            {
                (!register) &&
                <div className='AdmissionPageContent'>
                    <div className='MainContainer'>
                        <div className='PatientDivision'>
                            <form onSubmit={fetchRequestHandler}>
                                <label className='InputLabel'>Enter Patient Id.</label>
                                <input type="text" className='InputText' value={patient_id} disabled={!fetchPatient} onChange={(e) => { setPatient_id(e.target.value) }} required />
                                <button type='submit' className='InputButton'>Fetch</button>
                                {(!fetchPatient) && <button className='InputButton' onClick={() => { setFetchPatient(true); setPatient_id(''); }}>Reset</button>}
                            </form>
                        </div>
                        {
                            (EpisodeDataList === null) &&
                            <div>Nothing to Show (Enter Valid Patiend Id. above)</div>
                        }
                        <div>
                            {
                                (EpisodeDataList !== null) &&
                                <div className='AddEpisodeSection'>
                                    <h4 className='AddEpisodeDivision'>Patient Consultations (Episodes)</h4>
                                    <div className='AddEpisodeDivision AddButton'>
                                        {
                                            (!addEpisode) && <button onClick={() => { setAddEpisode(true) }} className="InputButtonLink">&nbsp;+&nbsp;</button>
                                        }
                                    </div>
                                    <div className='AddEpisodeDivision AddButton'>
                                        {
                                            (addEpisode) && <button onClick={() => { setAddEpisode(false) }} className="InputButtonLink">&nbsp;-&nbsp;</button>
                                        }
                                    </div>
                                    <div className='AddEpisodeDivision AddEpisodeForm'>
                                        {
                                            (addEpisode) &&
                                            <form onSubmit={addRequestHandler}>
                                                <label className='InputLabel'>Enter Consultation (Episode) Type</label>
                                                <input type="text" value={episodeType} onChange={(e) => { setEpisodeType(e.target.value) }} className='InputText' required />
                                                <button type='submit' className='InputButton'>Add</button>
                                            </form>
                                        }
                                    </div>
                                    <br />
                                </div>

                            }
                        </div>
                        <br />
                        {
                            EpisodeDataList.sort((a, b) => a.episodeId < b.episodeId ? 1 : -1).map((EpisodeData, index) => {
                                return (
                                    <div className='EpisodeContainer' key={index}>
                                        <div className='EpisodeRecord'>
                                            <div className='EpisodeItem'>
                                                {index === expandedIndex ? (
                                                    <button onClick={() => handleExpand(-1)} className="InputButtonLink">&nbsp;-&nbsp;</button>
                                                ) : (
                                                    <button onClick={() => handleExpand(index)} className="InputButtonLink">&nbsp;+&nbsp;</button>
                                                )}
                                            </div>
                                            <div className='EpisodeItem'>Episode Id: {EpisodeData.episodeId}</div>
                                            <div className='EpisodeItem'>Type: {EpisodeData.episode_type}</div>
                                            <div className='EpisodeItem'>Started: {EpisodeData.start_date.substring(0, 16)}</div>
                                        </div>
                                        {
                                            (index === expandedIndex) &&
                                            <AdmissionVisits EpisodeData={EpisodeData} index={index} patient_id={patient_id} fetchHandler={fetchHandler} />
                                        }
                                        <br />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default AdmissionPage