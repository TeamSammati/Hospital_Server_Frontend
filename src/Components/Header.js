import React, { useEffect } from 'react'
import './Stylesheets/Header.css'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa'
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
                (user && user.role) &&
                <div>
                    <button className='headerTextRight' onClick={logout}>
                        Logout
                    </button>

                    <b className='headerTextRight' style={{ background: "none", color: "green", textTransform: 'capitalize' }}><FaRegUser size={15} /> &ensp;<b style={{ textTransform: 'capitalize' }}>{(user.role).toLowerCase()}</b> : {user.doctorId} - {user.firstName} {user.lastName} </b>
                </div>
            }

            <div className='headerTitle'><span><img src={logo} alt="logo" width={35} height={35} /></span> Kauvery Hospitals - Powered By, Sammati</div>
        </div>
    )
}

export default Header