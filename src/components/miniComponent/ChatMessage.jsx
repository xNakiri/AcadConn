import send from "./../../assets/send.png"
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db, storage} from '../../firebase';
import{ v4 as uuid} from "uuid";
import { arrayUnion, doc, Timestamp,serverTimestamp, updateDoc, getDoc, onSnapshot} from 'firebase/firestore';
import { getDownloadURL,ref, uploadBytesResumable } from 'firebase/storage';
import MessageContent from "../MessageContent";


  
  const ChatMessage = () => {
    const [messages,setMessages] = useState([]);
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

    const checkFileSize = (file) => {
      return file.size <= MAX_FILE_SIZE;
    };


    useEffect(()=> {
        const unSub = onSnapshot(doc(db,"messageContent",data.chatId),(doc)=>{
            doc.exists()&& setMessages(doc.data().messages);
        });
        return()=>{
            unSub();
        };
    },[data.chatId])
  
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  
    const handleAddData = async () => {
      
      try {
        // Create a new object with the provided name, age, and image URL
        const newData = {
          text,
          subject, // Convert age to a number if needed
          image: null, // We'll store the image URL in Firestore later
          senderUID: currentUser.uid,// Add a timestamp for the object (you can add your timestamp logic here)
          timestamp: getCurrentTime(),
        };
  
        // Fetch the existing document to get the current array data
        const docRef = doc(db, 'messageContent', data.chatId); // Replace 'documentId' with the actual document ID
        const docSnap = await getDoc(docRef);
        const existingDataArray = docSnap.exists() ? docSnap.data().messages : [];
  
        // Add the new data object to the existing array
        const updatedArray = [...existingDataArray, newData];
  
        // Upload the image to storage and update the image URL in Firestore
        if (img) {
          const storageRef = ref(storage, `images/${img.name}`);
          const uploadTask = uploadBytesResumable(storageRef, img);

           if (!ALLOWED_FILE_TYPES.includes(img.type)) {
      console.log('Unsupported file type. Only images (JPEG/PNG) and PDFs are allowed.');
      return;
    }

          if (!checkFileSize(img)) {
            console.log('File size exceeds the limit (5MB).');
            return;
          }

          uploadTask.on('state_changed', null, (error) => {
            console.error('Error uploading image:', error);
          }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            newData.image = downloadURL;
  
            // Update the document in Firestore with the updated array and new data object
            await updateDoc(docRef, {
              userSeen:  false,
              messages: updatedArray,
            });
            console.log('success');
  
            // Clear the input fields and update the dataArray state
           
            setText('');
            setSubject('');
            setImg(null);
          });
        } else {
          // Update the document in Firestore with the updated array and new data object (without image URL)
          await updateDoc(docRef, {
            userSeen: false,
            time: new Date().toISOString(),
            messages: updatedArray,
          });
          console.log('success');
  
          // Clear the input fields and update the dataArray state
          
          setText('');
          setSubject('');
          setImg(null);
        }
      } catch (error) {
        console.error('Error adding document:', error);
      }
    };

  
    return (
  
      <>
        <div className='chatMessage'>
  
          <div className="messageBar">
          {messages.map((m)=>(
            <MessageContent message={m} key={m.id}/>
            ))}
          </div>
  
          <div className="input">
            
         
            <input
              type="text" 
              placeholder=" Type Something...." 
              onChange={(e) => setText(e.target.value)} 
              value={text}
            />

            <div className="send">
            <img src="" alt="" />
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
              <button onClick={handleAddData}>Send</button>
                
            </div>
        </div >
  
        </div>
  
      </>
    )
  };
  
  export default ChatMessage;