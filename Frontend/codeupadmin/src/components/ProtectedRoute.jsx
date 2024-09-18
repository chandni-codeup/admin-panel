import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const userDetails = localStorage.getItem('auth-token');

    if (!userDetails) {
        return <Navigate to="/login" replace />;
    }
  
    return children;
  }



export default ProtectedRoute