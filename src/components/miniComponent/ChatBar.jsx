import React from 'react'

const ChatBar = () => {
  return (
    <>

    <div className='chatBar'>

        <input type='text' placeholder='Search'/>

        <div className='chatCard'>
        <p>user55</p>
          <div className='chatInfo'>
          <p>Americano </p>
          
          </div>
        </div>
        <div className='chatCard'>
        <p>user22</p>
          <div className='chatInfo'>
          <p>Cortado </p>
          
          </div>
        </div>
        <div className='chatCard'>
        <p>user1</p>
          <div className='chatInfo'>
          <p>Espresso </p>
          
          </div>
        </div>
        <div className='chatCard'>
        <p>usertest1</p>
          <div className='chatInfo'>
          <p>Cortado</p>
        
          </div>
        </div>
        

    </div>
    
    
    </>
  )
}

export default ChatBar