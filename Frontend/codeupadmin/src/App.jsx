import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminNavbar from './components/AdminNavbar';
import Applicants from './components/Applicants';
import ApprovedUsers from './components/ApprovedUsers';
import NoticeBoard from './components/NoticeBoard';
import News from './components/News';
import Events from './components/Events';
import Login from './components/Login';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  // const GoogleAuthWrapper = () => {
  //   return (
  //     <GoogleOAuthProvider clientId='364325960968-5jmtd7p4nm8ovfqp7b0f2g94bmj2b2qo.apps.googleusercontent.com'>
  //       <Login />
  //     </GoogleOAuthProvider>
  //   );
  // };
  
  return (
    <>
     <ToastContainer />
      <Router basename='/admin'>
        <AdminNavbar />
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Navigate to='/login'/>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
          <Route path="/approved" element={<ProtectedRoute><ApprovedUsers /></ProtectedRoute>} />
          <Route path="/notice" element={<ProtectedRoute><NoticeBoard /></ProtectedRoute>} />
          <Route path="/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;




