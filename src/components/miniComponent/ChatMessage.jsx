import React from 'react'
import send from "./../../assets/send.png"
const ChatMessage = () => {
  return (
    <>
        <div className='chatMessage'>
            <div className='chatSubject'>
                <p>Americano</p>
            </div>
            <div className='chatContent'>

               <p>User message</p>
                
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia quo placeat ipsam quae, harum ab, laudantium sit, corrupti hic ratione architecto? Laboriosam eveniet quos voluptate ratione ad ullam minus esse.</p>

            </div>

          <div className='chatInput'>
            <form>
            <div className='inputSubject'>

            <label htmlFor="coffee">Subject</label>
            <input type="text" name="coffee" id="subject" list="subject-List" />
                <datalist id="subject-List">
                <option value="Regular coffee" />
                <option value="Iced Coffee" />
                <option value="Espresso" />
                <option value="Americano" />
                <option value="Cortado" />
            </datalist> 
            </div>

            <div className='inputMessage'>
                <textarea className="message" name="messages" id="message" cols="30" rows="10" placeholder="HELLLLLLLLLLLLOOOOOO"></textarea>
                <button><img src={send} alt="" /></button>
            </div>
            </form>
          </div>

        </div>
    
    </>
  )
}

export default ChatMessage