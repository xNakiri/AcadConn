import React from 'react'
import SideBar from './miniComponent/SideBar'
import Important from './miniComponent/Important'
import Nav from './Nav'
import SchoolBar from './miniComponent/SchoolBar'

const ChatImportant= () => {
  return (
    <>
       <div className='important'> 
            <Nav />
            <main>
                <SideBar />
                <Important />
                <SchoolBar />
            </main>
        </div>
        
       
    
    
    </>
    )
}

export default ChatImportant