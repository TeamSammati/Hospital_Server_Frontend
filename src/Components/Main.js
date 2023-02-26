import React, { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import LoginPage from './LoginPage'
import loginService from '../Services/LoginService'
import ConsentStatusService from '../Services/ConsentStatusService'
import Header from './Header'
const Main = () => {
    const [user, setUser] = useState(null)
    const [consentRequests, setConsentRequests] = useState([])
    const loginHandler = async (loginCredentials) => {
        try {
            const userObject = await loginService.login(loginCredentials)
            if(userObject){
                setUser(userObject)
                console.log(userObject)
                window.localStorage.setItem('sessionUser', JSON.stringify(userObject))
            }
            else{
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
            const requests = await ConsentStatusService.getStatusRequests(user)
            setConsentRequests(requests)
            console.log("Requests: ",requests)
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
        <div>
            {
                <Header user={user} setUser={setUser}/>
            }
            {
                (user === null) && <LoginPage loginHandler={loginHandler}/>
            }
            {
                (user !== null) && <Dashboard user={user} consentRequests={consentRequests} />
            }
        </div>

    )
}

export default Main