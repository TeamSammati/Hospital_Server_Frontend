import './Stylesheets/AdmissionPage.css'
import React, { useState } from 'react'
import EpisodeDataList from '../EpisodeDataList.json'
import AdmissionVisits from './AdmissionVisits';
const AdmissionPage = () => {
    const [addEpisode, setAddEpisode] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    console.log("Episode Data", EpisodeDataList)
    const handleExpand = (index) => {
        setExpandedIndex(index);
    };
    return (
        <div className='AdmissionPage'>
            <div className='AdmissionPageTitle'>Admissions</div>
            <div className='AdmissionPageContent'>
                <div className='MainContainer'>
                    <div className='PatientDivision'>
                        <form>
                            <label className='InputLabel'>Enter Patient Id.</label>
                            <input type="text" className='InputText' required />
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
                                        <form>
                                            <label className='InputLabel'>Enter Consultation (Episode) Type</label>
                                            <input type="text" className='InputText' required />
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
                                        <AdmissionVisits EpisodeData={EpisodeData} index={index} />
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