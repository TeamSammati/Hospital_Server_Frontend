import React, { useState } from "react";
import './Stylesheets/HealthRecordForm.css'
import healthRecordService from '../Services/HealthRecordService'
const HealthRecordForm = (user) => {
  const [medicines, setMedicines] = useState([]);
  const [dosages, setDosages] = useState([]);
  const [dosageTimings, setDosageTimings] = useState([]);
  const [newMedicine, setNewMedicine] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newDosageTimings, setNewDosageTimings] = useState("");
  const [visitId, setVisitId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [problem, setProblem] = useState('');
  const [treatment, setTreatment] = useState('');


  const handleNewMedicineChange = (event) => {
    setNewMedicine(event.target.value);
  };
  const handleNewDosageChange = (event) => {
    setNewDosage(event.target.value);
  };
  const handleNewDosageTimingsChange = (event) => {
    setNewDosageTimings(event.target.value);
  };

  const handleAddMedicine = () => {
    if (newMedicine !== "" && newDosage !== "" && newDosageTimings !== "") {
      setMedicines([...medicines, newMedicine]);
      setNewMedicine("");
      setDosages([...dosages, newDosage]);
      setNewDosage("");
      setDosageTimings([...dosageTimings, newDosageTimings]);
      setNewDosageTimings("");
    }
    else {
      alert("Enter All Fields To Add this to Prescription!");
      setNewMedicine("");
      setNewDosage("");
      setNewDosageTimings("");
    }
  };
  const healthRecordHandler = async (healthRecord) => {
    try {
      const response = await healthRecordService.addRecord(healthRecord)
      if (response) {
        alert("Record Added Successfully! Record Id. : ", response)
        window.location.reload(true)

      }
    }
    catch (exception) {
      alert("Failed to add record, try again !!!", exception)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const prescriptions = medicines.map((item, index) => {
      return {
        "medicine": item,
        "dosage": parseInt(dosages[index]),
        "dosage_timing": dosageTimings[index]
      }
    })
    const healthRecord = {
      "recordDto": {
        "patientId": parseInt(patientId),
        "doctorId": parseInt(1),
        "visitId": parseInt(visitId),
        "problem": problem,
        "treatment": treatment
      },
      "prescriptionDtos": prescriptions
    };
    console.log(healthRecord); 
    healthRecordHandler(healthRecord);
    setMedicines([]);
    setDosages([]);
    setDosageTimings([]);
    setPatientId('');
    setVisitId('');
    setProblem('');
    setTreatment('');
    setNewMedicine("");
    setNewDosage("");
    setNewDosageTimings("");

  };

  return (
    <div className="HealthRecodsFormContainer">
      <form onSubmit={handleSubmit}>
        <label className="InputLabel">Patient Id:</label>
        <input type="number" className="InputText" value={patientId} onChange={(e) => { setPatientId(e.target.value) }} required />
        <label className="InputLabel">Visit Id:</label>
        <input type="number" className="InputText" value={visitId} onChange={(e) => { setVisitId(e.target.value) }} required />
        <label className="InputLabel">Problem:</label>
        <input type="text" className="InputText" value={problem} onChange={(e) => { setProblem(e.target.value) }} required />
        <label className="InputLabel">Treatment:</label>
        <input type="text" className="InputText" value={treatment} onChange={(e) => { setTreatment(e.target.value) }} required />

        <br />
        <label className="InputLabel">Medicines:</label>
        <ol className="MedicineOL">
          {medicines.map((medicine, index) => (
            <li key={index} className='MedicineLI'><b>Medicine:</b> {medicine}, <b>Dosage:</b> {dosages[index]}, <b>Medication-Timings:</b>{dosageTimings[index]}</li>
          ))}
        </ol>
        <label className="InputLabel">Medicine:</label>
        <input type="text" className="InputText" value={newMedicine} onChange={handleNewMedicineChange} />
        <label className="InputLabel">Dosage:</label>
        <input type="number" className="InputText" value={newDosage} onChange={handleNewDosageChange} />
        <label className="InputLabel">Medication Timings:</label>
        <input type="text" className="InputText" value={newDosageTimings} onChange={handleNewDosageTimingsChange} />
        <button type="button" onClick={handleAddMedicine} className='InputButton'>
          Add Medicine
        </button>
        <br />
        <button type="submit" className='InputButton'>Save Health Record</button>
      </form>
    </div>
  );
};

export default HealthRecordForm;
