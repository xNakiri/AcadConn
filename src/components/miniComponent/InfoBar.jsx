import React from 'react'
import user from "../../assets/user11.jpg"
const InfoBar = () => {
  return (
    <>
    <div className='cardInfo'>
        <img src={user}></img>
        <div className='info'>
        <p>User11</p>
        <p className='role'>Student</p>
        </div>
    </div>
    </>
  )
}

export default InfoBar