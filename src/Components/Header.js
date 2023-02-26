import React from 'react'
import './Stylesheets/Header.css'
import logo from '../Images/logo.png'
const Header = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('sessionUser')
    setUser(null)
  }
  return (
    <div className='headerPage'>
      {
        (user !== null) &&
        <button className='headerTextRight' onClick={logout}>
          Logout
        </button>
      }

      <div className='headerTitle'><span><img src={logo} alt="logo" width={35} height={35} /></span>Kauvery Hospital (in Association with) Sammati - Consent Management System</div>
    </div>
  )
}

export default Header