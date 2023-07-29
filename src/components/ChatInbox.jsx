import React from 'react'
import SideBar from './miniComponent/SideBar'
import Inbox from './miniComponent/Inbox'
import Nav from './Nav'
import SchoolBar from './miniComponent/SchoolBar'

const ChatInbox = () => {
  return (
    <>
       <div className='inbox'> 
            <Nav />
            <main>
                <SideBar />
                <Inbox />
                <SchoolBar />
            </main>
        </div>
        
       
    
    
    </>
    )
}

export default ChatInbox