import React, { useEffect } from 'react'
import './Stylesheets/Header.css'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';
const Header = ({ user, setUser }) => {
    const navigate = useNavigate();
    const logout = () => {
        window.localStorage.removeItem('sessionUser')
        navigate('/');
        setUser(null);
    }
    useEffect(() => {
        const sessionUser = window.localStorage.getItem('sessionUser')
        if (sessionUser)
            setUser(JSON.parse(sessionUser))
        else {
            setUser(null)
            navigate('/');
        }

    }, []);
    return (
        <div className='headerPage'>
            {
                (user !== null) &&
                <button className='headerTextRight' onClick={logout}>
                    Logout
                </button>
            }

            <div className='headerTitle'><span><img src={logo} alt="logo" width={35} height={35} /></span> Sammati - Consent Management System</div>
        </div>
    )
}

export default Header