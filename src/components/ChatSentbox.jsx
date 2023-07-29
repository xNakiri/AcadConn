import React from 'react'
import SideBar from './miniComponent/SideBar'
import Nav from './Nav'
import SentBox from './miniComponent/SentBox'
import SchoolBar from './miniComponent/SchoolBar'

const ChatSentBox = () => {
  return (
    <>
        <div className='sentBox'> 
            <Nav />
            <main>
                <SideBar />
                <SentBox />
                <SchoolBar />
            </main>
        </div>
        
       
    
    
    </>
    )
}

export default ChatSentBox