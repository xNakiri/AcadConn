import React from 'react'
import SideBar from './miniComponent/SideBar'
import Archive from './miniComponent/Archive'

import SchoolBar from './miniComponent/SchoolBar'
import Nav from './Nav'

const ChatArchive = () => {
  return (
    <>
        <div className='archive'> 
            <Nav />
            <main>
                <SideBar />
                <Archive />
                <SchoolBar />
            </main>
        </div>
       
    
    
    </>
    )
}

export default ChatArchive