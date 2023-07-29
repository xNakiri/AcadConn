import React from 'react'
import { Link } from 'react-router-dom'
import newMessage from "./../../assets/new.png"
import archive from "./../../assets/archive.png"
import star from "./../../assets/starred.png"
import trash from "./../../assets/IMP.png"
import group from "./../../assets/group.png"
const SideBar = () => {
  
  return (
    <>
    <div className='messageCreation'>
            <label><button><img src={newMessage} alt="" /></button><Link to="/chatInbox">inbox</Link></label>
            <label><button><img src={archive} alt="" /></button><Link to="/chatSentBox">Sentbox</Link></label>
            <label><button><img src={star} alt="" /></button><Link to="/chatArchive">Archive</Link></label>
            <label><button><img src={trash} alt="" /></button><Link to="/chatImportant">Important</Link></label>
            <label><button><img src={group} alt="" /></button><Link to="/chatInbox">Group</Link></label>
        </div>
    </>
  )
}

export default SideBar