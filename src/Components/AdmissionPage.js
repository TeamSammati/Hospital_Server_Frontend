import './Stylesheets/AdmissionPage.css'
import React, { useState } from 'react'
import EpisodeDataList from '../EpisodeDataList.json'
import AdmissionVisits from './AdmissionVisits';
import LocalEHRDetailsListService from '../Services/LocalEHRDetailsListService'
import AddEpisodeService from '../Services/AddEpisodeService'
const AdmissionPage = () => {
    const [addEpisode, setAddEpisode] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [patient_id, setPatient_id] = useState('');
    const [episodeType, setEpisodeType] = useState('');
    console.log("Episode Data", EpisodeDataList)
    const handleExpand = (index) => {
        setExpandedIndex(index);
    };
    const fetchHandler = async (requestParams) => {
        try {
            const responseObject = await LocalEHRDetailsListService.getEHRDetailsList(requestParams)
        }
        catch (exception) {
            alert("Unable to Fetch Details, Try Again Later...")
        }
    }
    const fetchRequestHandler = (event) => {
        event.preventDefault(true)
        const requestParams = {
            patientId:parseInt(patient_id)
        }
        fetchHandler(requestParams)
        setPatient_id('')
    }
    const addHandler = async (requestParams) => {
        try {
            const responseObject = await AddEpisodeService.addEpisode(requestParams)
        }
        catch (exception) {
            alert("Unable to Add Details, Try Again Later...")
        }
    }
    const addRequestHandler = (event) => {
        event.preventDefault(true)
        const requestParams = {
            patientId:parseInt(patient_id),
            episodetype: episodeType
        }
        addHandler(requestParams)
        setEpisodeType('')
    }
    return (
        <div className='AdmissionPage'>
            <div className='AdmissionPageTitle'>Admissions</div>
            <div className='AdmissionPageContent'>
                <div className='MainContainer'>
                    <div className='PatientDivision'>
                        <form onSubmit={fetchRequestHandler}>
                            <label className='InputLabel'>Enter Patient Id.</label>
                            <input type="text" className='InputText' value={patient_id} onChange={(e)=>{setPatient_id(e.target.value)}} required />
                            <button type='submit' className='InputButton'>Fetch</button>
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
                                            <input type="text" value={episodeType} onChange={(e)=>{setEpisodeType(e.target.value)}} className='InputText' required />
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
                                        <AdmissionVisits EpisodeData={EpisodeData} index={index} patient_id={patient_id}/>
                                    }
                                    <br />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AdmissionPage