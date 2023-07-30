import React, { useContext, useRef, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Linkify from 'react-linkify';

const MessageContent = ({ message }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  const handleImageClick = () => {
    // Open the image in a new tab
    window.open(message.image, '_blank', 'noopener noreferrer');
  };

  return (
    <>
      <div className='chatSubject'></div>
        
            <div ref={ref} className={`message ${message.senderUID === currentUser.uid && 'owner'}`}>
        <div className='content'>
          {/* Use Linkify component to automatically convert links */}
          <Linkify>
            {message.text && <p>{message.text}</p>}
          </Linkify>
          {message.image && (
            <img
              src={message.image}
              alt="Message Image"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }} // Optionally change cursor on hover
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MessageContent;
