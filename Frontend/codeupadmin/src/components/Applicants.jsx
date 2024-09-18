import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from './BaseUrl';


function Applicants() {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const allApplicants = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/allApplicants`);
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        toast.error('Error fetching applicants');
      }
    };

    allApplicants();
  }, []);

  const handleApprove = async (applicantId) => {
    try {
      await axios.post(`${baseUrl}api/approveApplicants`, { applicantId });
      setApplicants((prev) => prev.filter(applicant => applicant._id !== applicantId));
      toast.success('Applicant approved successfully');
    } catch (error) {
      console.error('Error approving applicant:', error);
      toast.error('Error approving applicant');
    }
  };

  return (
    <>
      <div className="applicantsPage d-flex flex-column mx-1" style={{ marginTop: "80px" }}>
        <h1 className="text-center " style={{color:"#0c2239"}}>APPLICANTS</h1>
        <br />
        <br />

        <ol className="list-group">
          {applicants.map((applicant) => (
            <li key={applicant._id} className="list-group-item d-flex justify-content-between align-items-start">
              <div className="d-flex">
                <div className="d-flex justify-content-center align-items-center">
                  {applicant.profilePhoto ? (
                    <img
                      src={applicant.profilePhoto}
                      alt={`${applicant.name}'s profile`}
                      className="rounded-circle"
                      style={{ height: '40px', width: '40px' }}
                    />
                  ) : (
                    <span className="badge text-bg-success rounded-circle d-flex justify-content-center align-items-center fs-5" style={{ height: "40px", width: "40px" }}>
                      {applicant.name.split(' ').map(name => name[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="ms-2">
                  <div className="fw-bold">{applicant.name}</div>
                  {applicant.email}
                </div>
              </div>
              <i
                className="bi bi-check2-circle text-success fs-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleApprove(applicant._id)}
              ></i>
            </li>
          ))}
        </ol>

        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </div>
    </>
  );
}

export default Applicants;
