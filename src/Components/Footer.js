import React from 'react'
import './Stylesheets/Footer.css'
const Footer = () => {
  return (
    <div className='footerPage'>
      <div className="footer-container">
            <div className="footer-row">
                <div className="footer-col">
                    <h4>Contact Info</h4>
                    <h5>Sammati CMS Office, <br/> National Health Authority, New Delhi - 110001 <br/>Email: <a href="mailto:sammati@nha.gov.in">sammati@nha.gov.in</a><br/> Toll Free No. 1800-11-4477</h5>
                    </div>
                    <div className="footer-col">
                    <h4>Get Help</h4>
                    <ul>
                        <li><a href="default.asp" target="_blank">Ministry of Health Care</a></li>
                        <li><a href="default.asp" target="_blank">Help Team</a></li>
                        <li><a href="default.asp" target="_blank">Grievance Cell</a></li>
                        <li><a href="default.asp" target="_blank">Feedback</a></li>
                    </ul>
                    </div>
                    <div className="footer-col">
                    <h4>Official Reports</h4>
                    <ul>
                        <li><a href="default.asp" target="_blank">Natioanl Health Reports</a></li>
                        <li><a href="default.asp" target="_blank">Covid Care</a></li>
                        <li><a href="default.asp" target="_blank">NIMHANS</a></li>
                    </ul>
                    </div>
                    <div className="footer-col">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                      <a href="default.asp" target="_blank">Facebook &nbsp;&nbsp; Twitter &nbsp;&nbsp; Youtube</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright">
            <p>Copyright © 2023 All Rights Reserved <br/> Website Content Verified by Sammati Team - International Institute of Information Technology, Bangalore.</p>
        </div>
    </div>
  )
}

export default Footer