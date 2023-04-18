import React from 'react'
import './Stylesheets/DashboardProfile.css'
const DashboardProfile = ({ user }) => {
    return (
        <div className="dashboard-profile-container">
            <div className="row">
                {
                    (user && user.registrationDate && user.role) &&
                    <div className="col-sm-8 col-md-9 col-lg-10">
                        <h2>Welcome back!, &emsp;<b style={{ color: "green" }}>{user.firstName} {user.lastName}</b> &emsp; [<b style={{ color: "navy" }}>{user.registrationNumber}</b>]</h2>
                        <p>Role: &emsp;<b style={{ color: "navy", fontWeight: "normal" }}>{user.role}</b>,&emsp; Id: &emsp;<b style={{ color: "navy", fontWeight: "normal" }}>{user.doctorId}</b></p>
                        <p>Designation:&emsp; <b style={{ color: "navy", fontWeight: "normal" }}>{user.designation}</b></p>
                        <p>Mobile Number: &emsp;<b style={{ color: "navy", fontWeight: "normal" }}>{user.mobileNumber}</b></p>
                        <p>Email:&emsp; <b style={{ color: "navy", fontWeight: "normal" }}>{user.email}</b></p>
                        <p>Registration Date: &emsp;<b style={{ color: "navy", fontWeight: "normal" }}>{user.registrationDate.substring(0, 10)}</b></p>
                        <p>Account Status: &emsp;<b style={{ color: "navy", fontWeight: "normal" }}>{user.accountNonLocked ? "Active" : "Blocked"}</b></p>

                    </div>
                }

            </div>
        </div>
    )
}

export default DashboardProfile