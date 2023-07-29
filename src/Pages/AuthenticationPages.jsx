import React, {useState} from 'react';
import logo1 from "../../src/assets/logo1.jpg"
import authBanner from "../../src/assets/authBanner.jpg"
import Register from '../components/Register';
import Login from "../components/Login";
const AuthenticationPages = () => {

  return (
  <>
  <div className='authPage'>
    <div className='authBanner'>
      <div className='bannerImage'>
      <img src={authBanner} alt="" />
      </div>
      
    <div className='authContainer'>
    <div className='banner'>
    <img src={logo1} alt="" />
    <h1>AcadConnec</h1>
    
    <div className='regContainer'>
      <h3>Register</h3>
      <Register />
    </div>
    <div className='logContainer'>
      <h3>Login</h3>
      <Login />
    </div>
    </div>
  </div>
  </div>
  </div>
  </>
    
  )
}

export default AuthenticationPages;