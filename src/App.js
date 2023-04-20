import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './Components/AboutPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import loginService from './Services/LoginService';
import consentStatusService from './Services/ConsentStatusService';
import ConsentRequests from './Components/ConsentRequests';
import AdmissionPage from './Components/AdmissionPage';
import ActiveConsents from './Components/ActiveConsents';
import AdminPage from './Components/AdminPage';
import swal from 'sweetalert';
function App() {
  const [user, setUser] = useState(null)
  const [consentRequests, setConsentRequests] = useState([]);
  // const location = useLocation();
  const loginHandler = async (loginCredentials) => {
    try {
      const userObject = await loginService.login(loginCredentials)
      if (userObject) {
        setUser(userObject)
        window.localStorage.setItem('sessionUser', JSON.stringify({doctorId: userObject.doctorId, role: userObject.role}))
      }
      else {
        swal({
          title: "Operation Failed",
          text: "Log in failed, check username and password entered",
          icon: "error",
          button: "Okay",
        });
      }

    }
    catch (exception) {
      swal({
        title: "Operation Failed",
        text: "Log in failed, check username and password entered",
        icon: "error",
        button: "Okay",
      });
    }
  }


  useEffect(() => {
    async function fetchRequests() {
      if (user && user.role === "DOCTOR") {
        const requests = await consentStatusService.getStatusRequests(user)
        setConsentRequests(requests)
        //console.log("Requests: ", requests)
      }
    }
    fetchRequests()
  }, [user]);

  useEffect(() => {
    const sessionUser = window.localStorage.getItem('sessionUser')
    console.log(JSON.parse(sessionUser));
    if (sessionUser) {
      const doctorId = JSON.parse(sessionUser).doctorId;
      console.log(doctorId);
      async function getUser() {
        const response = await loginService.getUser(doctorId)
        console.log("Get User: ",response);
        setUser(response);
      }
      getUser();
    }

    else
      setUser(null)
  }, []);

  // useEffect(() => {
  //   const sessionUser = window.localStorage.getItem('sessionUser')
  //   if (sessionUser)
  //     setUser(JSON.parse(sessionUser))
  //   else
  //     setUser(null)
  // }, [])
  return (
    <BrowserRouter>
      <div>
        <Header user={user} setUser={setUser} />
        {
          (user !== null) && <Navbar user={user} />
        }
        <Routes>
          {
            (user === null) && <Route path="/" element={<LoginPage loginHandler={loginHandler} />} />
          }
          {
            (user !== null) && <Route path="/" element={<Dashboard user={user} />} />
          }
          {
            (user && user.role === "DOCTOR") &&
            <Route path="/consentRequests" element={<ConsentRequests consentRequests={consentRequests} user={user} />} />
          }

          {
            (user && user.role === "RECEPTIONIST") &&
            <Route path="/admission" element={<AdmissionPage />} />
          }
          {
            (user && user.role === "ADMIN") &&
            <Route path="/admin" element={<AdminPage user={user} />} />
          }
          {
            (user && user.role === "DOCTOR") &&
            <Route path="/consents" element={<ActiveConsents user={user} />} />
          }

          <Route path="/about" element={<AboutPage />} />
          <Route path="/404" element={<div style={{ minHeight: "70vh", textAlign: "center" }}><h1>Choose the correct Path</h1><hr /><br /><p>Error <br /> <strong style={{ fontSize: "100px" }}>404</strong> <br />Page Not Found!</p></div>} />

          {
            (user && user.role === "ADMIN") &&
            (window.location.href !== '/') && (window.location.href !== '/admin') && (window.location.href !== '/about') && <Route path="*" element={<Navigate replace to="/404" />} />
          }
          {
            (user && user.role === "DOCTOR") &&
            (window.location.href !== '/') && (window.location.href !== '/consents') && (window.location.href !== '/consentRequests') && (window.location.href !== '/about') && <Route path="*" element={<Navigate replace to="/404" />} />
          }
          {
            (user && user.role === "RECEPTIONIST") &&
            (window.location.href !== '/') && (window.location.href !== '/admission') && (window.location.href !== '/about') && <Route path="*" element={<Navigate replace to="/404" />} />
          }
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
