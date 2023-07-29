import React from 'react'
import inbox from "../assets/inbox.png"
import { Link } from 'react-router-dom'
const HomeMain = () => {
  return (
    <>
        <main>
            <div className='inbox'>
            <label>
            <button><img src={inbox} /></button>
               <p>Inbox</p>
            </label>
            </div>
            <div className='inbox'>
            <label>
            <button><img src={inbox} /></button>
               <p>Sentbox</p>
            </label>
            </div>
            <div className='inbox'>
            <label>
            <button><img src={inbox} /></button>
                <p>Archive</p>
            </label>
            </div>
            <div className='inbox'>
            <label>
                <button><img src={inbox} /></button>
                <p>Important</p>
            </label>
            </div>
        </main>
    
    </>
  )
}

export default HomeMain