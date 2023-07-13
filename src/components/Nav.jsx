import React from 'react'
import InfoBar from './miniComponent/infoBar'
import profile from "./../assets/profile1.png"
import chat from "./../assets/profile2.png"
import contact from "./../assets/profile3.png"
import school from "./../assets/profile4.png"
const Nav = () => {
  return (
    <>
    <header> 
        <InfoBar />
        <nav>
           <h4>AcadConnec</h4>
            <ul>
                <li><label><img src={profile} alt="" /><a href="#">Profile</a></label></li>
                <li><label><img src={chat} alt="" /><a href="#">Chat</a></label></li>
                <li><label><img src={contact} alt="" /><a href="#">Contacts</a></label></li>
                <li><label><img src={school} alt="" /><a href="#">School</a></label></li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Nav