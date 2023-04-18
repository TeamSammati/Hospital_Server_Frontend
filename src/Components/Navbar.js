import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Stylesheets/Navbar.css'
const Navbar = ({ user }) => {
  const location = useLocation();
  useEffect(() => {

  }, [location.pathname]);
  return (
    <nav>
      <ul className='navul'>
        <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/" className={window.location.pathname === "/" ? "active-link" : ""}>Home</Link>
        </li>
        {
          (user.role === "DOCTOR") &&
          <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/consentRequests" className={window.location.pathname === "/consentRequests" ? "active-link" : ""}>Consent Requests</Link>
        </li>
        }
        {
          (user.role === "DOCTOR") &&
          <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/consents" className={window.location.pathname === "/consents" ? "active-link" : ""}>Active Consents</Link>
          </li>
        }
        
        {
          (user.role === "RECEPTIONIST") &&
          <li className={window.location.pathname === "/" ? "active-li" : ""}>
            <Link to="/admission" className={window.location.pathname === "/admission" ? "active-link" : ""}>Admissions</Link>
          </li>
        }
        {
          (user.role === "ADMIN") &&
          <li className={window.location.pathname === "/" ? "active-li" : ""}>
            <Link to="/admin" className={window.location.pathname === "/admin" ? "active-link" : ""}>Administrator</Link>
          </li>
        }

        <li className={window.location.pathname === "/" ? "active-li" : ""}>
          <Link to="/about" className={window.location.pathname === "/about" ? "active-link" : ""}>About Us</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar