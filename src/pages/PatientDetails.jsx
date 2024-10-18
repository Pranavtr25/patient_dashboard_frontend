import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function PatientDetail() {

  const { state } = useLocation();
  const { patient } = state || {};
  const navigate = useNavigate();

  console.log(patient)

  const [authorizationStatus, setAuthorizationStatus] = useState(null);

  useEffect(() => {
    if (patient) {
      fetch(`http://localhost:3000/prior-authorization-check/${patient._id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log(data)
            console.log(11)
            setAuthorizationStatus(data.status); // If data exists, set the status
          }
        })
        .catch(error => console.error('Error checking prior authorization:', error));
    }
  }, [patient]);

  console.log(authorizationStatus)

  const handleSubmitRequest = (id, name) => {
    navigate('/PriorAuthorization', {state : {
        id,
        name
    }})
  }
  

if (!patient) return <p>No patient details available.</p>

  return (
    <>
        <Header title={'Patient Details'}/>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{patient.name}</h1>
        <div className="mb-4">
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Medical History:</strong></p>
            <ul className="list-disc ml-5">
            {patient.medicalHistory.map((condition, index) => (
                <li key={index}>{condition}</li>
            ))}
            </ul>
        </div>
        <div className="mb-4">
            <p><strong>Treatment Plan:</strong> {patient.treatmentPlan}</p>
        </div>
        {authorizationStatus ? (
          <p className="text-lg font-semibold">Authorization Status: {authorizationStatus}</p>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => handleSubmitRequest(patient._id, patient.name)}
          >
            Request Prior Authorization
          </button>
        )}
        </div>
    </>
  );
}

export default PatientDetail;
