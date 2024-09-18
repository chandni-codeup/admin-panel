import React from 'react'
import { NavLink } from 'react-router-dom'
import fullCodeupLogo from '../assets/full-logo-black.png'

function AdminNavbar() {
  const handleNavLinkClick = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
  }

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/applicants"> 
          <img 
            src={fullCodeupLogo} 
            alt="fullCodeupLogo" 
            style={{ height: '50px', width: '170px' }} 
          />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
            <NavLink id="offcanvasNavbarLabel" to="/applicants"> 
              <img 
               src={fullCodeupLogo} 
               alt="fullCodeupLogo" 
               style={{ height: '50px', width: '170px' }} 
              />
            </NavLink>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink to='/profile' className="nav-link text-decoration-none fw-bold" style={{color:"#0c2239"}} onClick={handleNavLinkClick}>View Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/applicants' className="nav-link text-decoration-none fw-bold" style={{color:"#0c2239"}} onClick={handleNavLinkClick}>Applicants</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/approved' className="nav-link text-decoration-none fw-bold" style={{color:"#0c2239"}} onClick={handleNavLinkClick}>Approved Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/news' className="nav-link text-decoration-none fw-bold" style={{color:"#0c2239"}} onClick={handleNavLinkClick}>News</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/events' className="nav-link text-decoration-none fw-bold" style={{color:"#0c2239"}} onClick={handleNavLinkClick}>Events</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/notice' className="nav-link text-decoration-none fw-bold" style={{color:"#0c2239"}} onClick={handleNavLinkClick}>Notice Board</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default AdminNavbar
