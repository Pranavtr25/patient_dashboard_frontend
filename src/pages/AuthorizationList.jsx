import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const AuthorizationList = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of authorization requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/authorization-list`);
        if (!response.ok) {
          throw new Error('error in response');
        }
        console.log(response)
        const data = await response.json();
        setRequests(data); 
      } catch (err) {
        setError('Error fetching authorization requests');
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
        <Header title={'Authorization Request List'}/>
        <div className="p-4">
        {error && <p className="text-red-500">{error}</p>}
        {requests.length > 0 ? (
            <div className="space-y-4">
            {requests.map((request) => (
                <div key={request._id} className="p-4 border rounded shadow">
                <h3 className="font-semibold">Patient Name: {request.patientId?.name}</h3>
                <p><strong>Treatment Type:</strong> {request.treatmentType}</p>
                <p><strong>Insurance Plan:</strong> {request.insurancePlan}</p>
                <p><strong>Date of Service:</strong> {new Date(request.dateOfService).toLocaleDateString()}</p>
                <p><strong>Diagnosis Code:</strong> {request.diagnosisCode}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Notes:</strong> {request.notes}</p>
                <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
                </div>
            ))}
            </div>
        ) : (
            <p>No authorization requests found.</p>
        )}
        </div>
    </>
  );
};

export default AuthorizationList;
