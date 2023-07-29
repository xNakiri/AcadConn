import React from 'react'
import ChatMessage from '../components/miniComponent/ChatMessage'
import Nav from '../components/Nav'
import SideBar from '../components/miniComponent/SideBar'

const ChatsNew = () => {
  return (
 <>
 <div className='chatNew'>
 <Nav />
 <main>
 <SideBar />
 <ChatMessage />
 </main>
 </div>
 
 </>
  )
}

export default ChatsNew