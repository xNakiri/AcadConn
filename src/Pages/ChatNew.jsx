import React from 'react'
import Nav from '../components/Nav'
import NewMessage from '../components/miniComponent/NewMessage'

const ChatNew = () => {
  return (
    <>
    <div className='chatNewContainer'>
    <Nav />
    <NewMessage />
    </div>
    </>
  )
}

export default ChatNew