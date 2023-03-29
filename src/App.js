import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './Components/AboutPage';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import LoginPage from './Components/LoginPage';
import Dashboard from './Components/Dashboard';
import loginService from './Services/LoginService';
import consentStatusService from './Services/ConsentStatusService';
import ConsentRequests from './Components/ConsentRequests';
function App() {
  const [user, setUser] = useState(null)
  const [consentRequests, setConsentRequests] = useState([])
  const loginHandler = async (loginCredentials) => {
    try {
      const userObject = await loginService.login(loginCredentials)
      if (userObject) {
        setUser(userObject)
        window.localStorage.setItem('sessionUser', JSON.stringify(userObject))
      }
      else {
        alert("Log in failed, check username and password entered")
      }

    }
    catch (exception) {
      alert("Log in failed, check username and password entered")
    }
  }
  useEffect(() => {
    async function fetchRequests() {
      if (user) {
        const requests = await consentStatusService.getStatusRequests(user)
        setConsentRequests(requests)
        console.log("Requests: ", requests)
      }
    }
    fetchRequests()
  }, [user])
  useEffect(() => {
    const sessionUser = window.localStorage.getItem('sessionUser')
    if (sessionUser)
      setUser(JSON.parse(sessionUser))
    else
      setUser(null)
  }, [])
  return (
    <BrowserRouter>
      <div>
        <Header user={user} setUser={setUser} />
        {
          (user !== null) && <Navbar />
        }
        <Routes>
          {
            (user === null) && <Route path="/" element={<LoginPage loginHandler={loginHandler} />} />
          }
          {
            (user !== null) && <Route path="/" element={<Dashboard user={user} />} />
          }
          <Route path="/consentRequests" element={<ConsentRequests consentRequests={consentRequests} />} />
          {/* <Route path="/healthData" element={<RecordsPage healthRecords={healthRecords}/>} /> */}
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
