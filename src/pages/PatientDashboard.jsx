import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const PatientDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage]);

  const fetchPatients = (page) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/patients-list?page=${page}&limit=6`)  
      .then(response => response.json())
      .then(data => {
        setPatients(data.patients);
        setTotalPages(data.totalPages);
      })
      .catch(error => console.error('Error fetching patients:', error));
  };

  const handleViewDetails = (patient) => {
    navigate('/patientDetails', { state: { patient } });
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <>
      <Header title='Patient Dashboard'/>
      
      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredPatients.map((patient) => (
          <div key={patient._id} className="bg-white shadow-md rounded-md p-4 flex flex-col justify-center text-center">
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Condition:</strong> {patient.medicalHistory[patient.medicalHistory.length - 1]}</p>
            <button 
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => handleViewDetails(patient)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <p className="text-center text-gray-500">No patients found.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-4 my-5">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PatientDashboard;
