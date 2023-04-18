import React, { useState } from 'react'
import RecordComponent from './RecordComponent';
import './Stylesheets/HospitalComponent.css'
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
const HospitalComponent = ({ hospitalRecords, index }) => {
    const [recordSearchValue, setRecordSearchValue] = useState(parseInt(0))
    const [expandHospitalComponent, setExpandHospitalComponent] = useState(false)
    const RecordList = hospitalRecords.data.map((record, index) => {
        return {
            "index": index,
            "record_id": record.recordId,
            "problem": record.problem
        }
    })
    const recordOptionList = RecordList.map((recordItem, index) => {
        return {
            id: index,
            value: parseInt(recordItem.record_id),
            displayName: "[" + recordItem.record_id + "] - " + recordItem.problem
        }
    })
    function Options({ options }) {
        return (
            options.map(option =>
                <option key={option.id} value={option.value}>
                    {option.displayName}
                </option>)
        );
    }
    return (
        <div className='RecordComponent'>
            {
                (!expandHospitalComponent) ?
                    (
                        <div>
                            <IoMdArrowDroprightCircle onClick={() => { setExpandHospitalComponent(true) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Hospital : {hospitalRecords.hospitalId} - {hospitalRecords.hospitalName}</b>
                        </div>
                    ) :
                    (
                        <div>
                            <IoMdArrowDropdownCircle onClick={() => { setExpandHospitalComponent(false) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>{hospitalRecords.hospitalId} - {hospitalRecords.hospitalName}</b>
                        </div>
                    )

            }
            {
                (expandHospitalComponent) &&
                <div className='HospitalPageContainer'>
                    <div className='RecordsFilter'>
                        <label className='InputLabel'>Filter by: Record</label>
                        <select
                            name="recordSearchValue"
                            className="InputText"
                            value={recordSearchValue}
                            onChange={e => setRecordSearchValue(parseInt(e.target.value))}
                            required>
                            <option value="0">All</option>
                            <Options options={recordOptionList} />
                        </select>
                    </div>
                    <br /><br />
                    {
                        (hospitalRecords.data.length === 0) &&
                        <div className='RecordsPageMessage'>
                            No Records Available
                        </div>
                    }
                    {
                        (hospitalRecords.data.length !== 0) &&
                        <div>
                            {hospitalRecords.data.filter((record) => { return (recordSearchValue === 0 || recordSearchValue === record.recordId) }).map((record, index) => (
                                <RecordComponent
                                    key={index}
                                    index={index}
                                    record={record}
                                />
                            ))
                            }
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default HospitalComponent