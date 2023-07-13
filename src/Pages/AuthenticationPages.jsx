import React from 'react';
import logo1 from "../../src/assets/logo1.jpg"

const AuthenticationPages = () => {


  return (
  <>
  <div className='authPage'>
  <div className='authContainer'>
    <div className='banner'>
    <img src={logo1} alt="" />
    <h1>AcadConnec</h1>
    
    <div className='regContainer'>
      <h3>Register</h3>
      <form>
      <input type="email" placeholder='Email' />
      <input type="password" placeholder='password'/>
      <button onClick="">Submit</button>
      </form>
    </div>
    <div className='logContainer'>
      <h3>Login</h3>
      <form>
      <input type="email" placeholder='Email' />
      <input type="password" placeholder='password'/>
      <button onClick="">Submit</button>
      </form>
    </div>
    </div>

  </div>
  </div>
  </>
    
  )
}

export default AuthenticationPages