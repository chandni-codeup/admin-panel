import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from './BaseUrl';

function ApprovedUsers() {
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
   
    const allApprovedUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/allAprovedApplicants`);
        setApprovedUsers(response.data);
      } catch (error) {
        console.error('Error fetching approved applicants:', error);
      }
    };

    allApprovedUsers();
  }, []);


  return (
    <>
    <div className="applicantsPage d-flex flex-column mx-1 " style={{ marginTop: "85px" }}>

    <h1 className='text-center' style={{color:"#0c2239"}}>APPROVED USERS</h1>
    <br />
    <br />

    <ol className="list-group list-group-numbered">

    {approvedUsers.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
             <div className="me-auto">
    <div className="ms-2">
      <div className="fw-bold ">{user.name}</div>
      {user.email}
      </div>
    </div>
          
              <div className="d-flex justify-content-center align-items-center">
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={`${user.name}'s profile`}
                    className="rounded-circle"
                    style={{ height: '40px', width: '40px' }}
                  />
                ) : (
               
                  <span className="badge text-bg-success rounded-circle d-flex justify-content-center align-items-center fs-6 " style={{height:"40px", width:"40px"}}>{user.name.split(' ').map(name=>name[0]).join('')}</span>
              
                )}
              </div>
             
          
          </li>
        ))}

  {/* <li className="list-group-item d-flex justify-content-between align-items-start">

    <div className="me-auto">
    <div className="ms-2">
      <div className="fw-bold ">Shubham Gupta</div>
      email123@gmail.com
      </div>
    </div>

    <div className=' d-flex justify-content-center align-items-center '>
    <span className="badge text-bg-success rounded-circle d-flex justify-content-center align-items-center fs-6 " style={{height:"40px", width:"40px"}}>SG</span>
</div>
  </li>

  <li className="list-group-item d-flex justify-content-between align-items-start">

    <div className="me-auto">
    <div className="ms-2">
      <div className="fw-bold ">Shubham Gupta</div>
      email123@gmail.com
      </div>
    </div>

    <div className=' d-flex justify-content-center align-items-center '>
    <span className="badge text-bg-success rounded-circle d-flex justify-content-center align-items-center fs-6 " style={{height:"40px", width:"40px"}}>SG</span>
</div>
  </li> */}
</ol>
    </div>
    
    </>
  )
}

export default ApprovedUsers