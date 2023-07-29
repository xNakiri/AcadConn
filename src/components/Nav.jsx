import React from 'react';
import { Link } from 'react-router-dom';
import InfoBar from './miniComponent/infoBar';
import profile from './../assets/profile1.png';
import chat from './../assets/profile2.png';
import contact from './../assets/profile3.png';
import school from './../assets/profile4.png';

const Nav = () => {
  return (
    <>
      <header>
        <InfoBar />
        <nav>
          <h4><Link to="/" className='link'>AcadConnec</Link></h4>
          <ul>
            {/* Use Link components instead of <a> tags */}
            <li>
              <label>
                <img src={profile} alt="" />
                <Link to="/profile">Profile</Link>
              </label>
            </li>
            <li>
              <label>
                <img src={chat} alt="" />
                <Link to="/chatInbox">Chat</Link>
              </label>
            </li>
            <li>
              <label>
                <img src={contact} alt="" />
                <Link to="/teacher">Teachers</Link>
              </label>
            </li>
            <li>
              <label>
                <img src={school} alt="" />
                <Link to="/school">School</Link>
              </label>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Nav;
