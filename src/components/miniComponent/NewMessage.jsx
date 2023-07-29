import React from 'react'
import SideBar from './SideBar'

const NewMessage = () => {
  return (
<>
    <main>
            <SideBar />
            <div className='newChat'>

             <form>
              <input type='text' placeholder='Recipient...'/>
              <input
                type="text" 
                placeholder="Type Subject..." 
              
              />
              <input type='file' />
              <div className="textarea-container">
                <textarea name="my_textarea" rows="10" cols="30" placeholder='Type Post here...'></textarea>
              </div>
              <button>Send</button>
            </form>

            </div>
    </main>


</>
  )
}

export default NewMessage