import React, {useState} from 'react'
import './Stylesheets/RecordComponent.css'
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
const RecordComponent = ({ record, index }) => {
    const [expandRecordComponent, setExpandRecordComponent] = useState(false)
    return (
        <div className='RecordComponent'>
            {
                (!expandRecordComponent) ?
                    (
                        <div>
                            <IoMdArrowDroprightCircle onClick={() => { setExpandRecordComponent(true) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Record : {record.recordId} - {record.problem}</b>
                        </div>
                    ) :
                    (
                        <div>
                            <IoMdArrowDropdownCircle onClick={() => { setExpandRecordComponent(false) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>{record.recordId} - {record.problem}</b>
                        </div>
                    )

            }
            {
                (expandRecordComponent) &&
                <div>
                    <div className='RecordTitle'>
                        Electronic Health Record
                    </div>
                    <div className='MainContent'>
                        <div className='row'>
                            <div className='col col1'>Record Id. : {record.recordId}</div>
                        </div>
                        <div className='row'>
                            <div className='col col1'>Doctor : {record.doctor.doctorId} - {record.doctor.firstName} {record.doctor.lastName}</div>
                            <div className='col col2'></div>
                        </div>
                        <div className='row'>
                            <div className='col col1'>Problem : {record.problem}</div>
                            <div className='col colExtra col2'>Treatment : {record.treatment}</div>
                        </div>
                        <br/>
                        <h4 className='PrescriptionTitle'>Prescription</h4>
                        <div>
                            {
                                (record.prescriptions.length === 0) ?
                                    <h4>No Medicines Prescribed...</h4> :
                                    <div className='PrecriptionContainer'>
                                        <table className="PrecriptionTable">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Id.</th>
                                                    <th scope="col">Medicine</th>
                                                    <th scope="col">Dosage</th>
                                                    <th scope="col">Medication Timings</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {record.prescriptions.map((PrecriptionItem) => {
                                                    return (
                                                        <tr>
                                                            <td>{PrecriptionItem.prescriptionId}</td>
                                                            <td>{PrecriptionItem.medicine} </td>
                                                            <td>{PrecriptionItem.dosage}</td>
                                                            <td>{PrecriptionItem.dosage_timing}</td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RecordComponent