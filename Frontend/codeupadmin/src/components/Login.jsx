import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from './firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {useGoogleLogin} from '@react-oauth/google'
// import { googleAuth } from './api';
import { useNavigate } from 'react-router-dom';
import gif from '../assets/Admin.gif'
import { baseUrl } from './BaseUrl';


function Login() {

    const navigate=useNavigate()
    // const baseUrl = process.env.NODE_ENV === 'production' 
    // ? 'https://codeup.in' 
    // : 'http://localhost:8080';

//   const responseGoogle = async (authResult) => {
//     try {
//       if (authResult['code']) {
//         const result = await googleAuth(authResult['code']);
//         console.log('Google Auth Result:', result);
//         const { email, name, profilePhoto } = result.data.user;
//         const token = result.data.token;
//         const obj = { email, name, profilePhoto, token };
//         localStorage.setItem('user-info', JSON.stringify(obj));
//         navigate('/applicants');
//       }
//     } catch (error) {
//       console.error('Error while requesting Google code:', error);
//     }
//   };

//   useEffect(() => {
//     const userInfo = localStorage.getItem('user-info');
//     console.log('Retrieved userInfo:', userInfo);
//     if (userInfo) {
//         navigate('/applicants');
//     }
//   }, [navigate]);
  
//   const GoogleSignin = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: responseGoogle,
//     flow: 'auth-code',
//     redirect_uri: window.location.origin === 'https://codeup.in' 
//                   ? 'https://codeup.in/admin' 
//                   : 'http://localhost:5173'
// });

function googleLogin(e) {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
      .then(async (result) => {
          try {
              const idToken = await result.user.getIdToken(); 

              const response = await fetch(`${baseUrl}auth/secure-endpoint`, {
                  method: 'POST',
                  headers: {
                      'Authorization': `Bearer ${idToken}`, 
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      email: result.user.email,
                      displayName: result.user.displayName,
                      profilePhoto: result.user.photoURL,
                  }),
              });

              if (!response.ok) {
                  throw new Error(`Server responded with ${response.status}`);
              }

              const data = await response.json(); // Parse the JSON response
              
              if (data.message === 'Data received and processed successfully') {
                  // const userInfo = {
                  //     token: idToken,
                  //     email: result.user.email,
                  //     name: result.user.displayName,
                  //     profilePhoto: result.user.photoURL,
                  // };

                  localStorage.setItem('auth-token', idToken);

                  toast.success("User logged in successfully", {
                      position: "top-center",
                  });
                  navigate('/applicants');
              } else {
                  toast.error("Login failed", {
                      position: "top-center",
                  });
              }
          } catch (error) {
              console.error('Error logging in:', error);
              toast.error("An error occurred during login", {
                  position: "top-center",
              });
          }
      })
      .catch((error) => {
          console.error('Error during sign-in:', error);
          toast.error("Sign-in failed", {
              position: "top-center",
          });
      });

}

  return (
    <>
    <ToastContainer/>
    <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-white" style={{ backgroundColor: "#0c2239"}}>
    <br />
       <div className="adminHeading fw-bold py-2 px-3 shadow text-light border rounded-end-pill me-auto " style={{ backgroundColor: "#0c2239"}}>             
                <h4 className='mt-2'>ADMIN PANEL</h4>             
       </div>

       <img src={gif} alt="gif" className="img-fluid mt-5" style={{maxHeight: '500px', maxWidth: '100%'}} />
    
       <div className="loginBtn mt-5">
         <button type="button" className="btn btn mt-5 text-white shadow" style={{backgroundColor:"#0c2239"}}  onClick={googleLogin}> <i className="fa-brands fa-google me-2"></i>  Signin with Google</button>
       </div>
    </div>

    </>
  )
}

export default Login