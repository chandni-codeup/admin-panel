// import React, { useEffect, useState } from 'react'
// import '../App.css'

// function ProfilePage() {
//     const [userInfo, setUserInfo]=useState(null);

//     useEffect(()=>{
//       const data=localStorage.getItem('user-info')
//       const userData=JSON.parse(data)
//       setUserInfo(userData)
//     },[])
//   return (
//     <>
//       rn (
//         <div className=" bg-secondary-subtle" >
//         <div className="container  d-flex justify-content-center align-items-center flex-column min-vh-100 ">
//             <h1 className="categoryHeading " style={{ letterSpacing: "2px",  textTransform: "uppercase" , marginBottom:"150px" }}>ADMIN PROFILE</h1>

//           <div className="profile-image-container position-absolute shadow">
//             <img src={userInfo?.profilePhoto} alt="Profile" className="profile-image rounded-circle" />
//           </div>
//       <div className="card profile-card text-center position-relative border-light rounded-4 shadow my-5 ">
//         <div className="card-body">
//           <h5 className="card-title ">{userInfo?.name}</h5>
//           <p className="card-subtitle mb-2">{userInfo?.email}</p>
//           {/* <p className="card-text">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p> */}
//           {/* <button className="btn btn-outline-light profile-btn">View Profile</button> */}
//         </div>
//       </div>
      
//     </div>
//       </div>
    
//     </>
//   )
// }

// export default ProfilePage

import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from './BaseUrl';
import axios from 'axios';

function ProfilePage() {
    const navigate=useNavigate()
    const [userDetails, setUserDetails] = useState(null);
    // const baseUrl = process.env.NODE_ENV === 'production' 
    // ? 'https://codeup.in' 
    // : 'http://localhost:8080';

    const fetchUserData = async () => {
    //   auth.onAuthStateChanged(async (user) => {
    //     console.log(user);
    //     setUserDetails(user)
      
    //   });
    const token = localStorage.getItem('auth-token');
    if (token) {
        try {
            const response = await axios.get(`${baseUrl}auth/verify-token`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.data;
            if (data.success) {
                setUserDetails(data.user); 
                // console.log(userDetails)
            } else {
                localStorage.removeItem('auth-token');
                setUserDetails(null);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login');
        }
    } else {
        navigate('/login');
    }
    };

    useEffect(() => {
       fetchUserData();
    }, []);

    async function handleLogout() {
      try {
        await auth.signOut();
        localStorage.removeItem('auth-token');
        navigate('/login');
        toast.success("User logged out successfully!");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }
    
    return (
        <>
        <ToastContainer/>
            <div className="bg-secondary-subtle min-vh-100 d-flex flex-column align-items-center">
                <h2 className="profileHeading text-center " style={{ letterSpacing: "1px", marginTop:"85px" , color:"black" , fontSize:"40px"}}>ADMIN PROFILE</h2>

                {/* Profile Card */}
                {userDetails?
                ( 
                <div className="d-flex justify-content-center align-items-center flex-grow-1 " style={{marginBottom:"100px"}}>
                    <div className="profile-image-container position-absolute shadow">
                        {/* <img src={userInfo?.profilePhoto} alt="Profile" className="profile-image rounded-circle" /> */}
                        <img src={userDetails.photoURL} alt="Profile" className="profile-image rounded-circle" />
                    </div>
                    <div className="card profile-card text-center position-relative border-light rounded-4 shadow mt-5">
                        <div className="card-body">
                            <h5 className="card-title">{userDetails.displayName}</h5>
                            <p className="card-subtitle mb-4">{userDetails.email}</p>
                            <button className="btn btn-outline-secondary profile-btn rounded-pill" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
                )
                :
                (
                    <div className="d-flex gap-2 justify-content-center align-items-center m-5">
                    <div className="spinner-grow" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-light" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                )}
               
            </div>
        </>
    );
}

export default ProfilePage;
