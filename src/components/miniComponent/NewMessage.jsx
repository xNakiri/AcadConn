import React, { useContext,useState, useEffect } from 'react'
import SideBar from './SideBar'
import { NewMessageContext } from '../../context/CreateChatContext'
import { AuthContext } from '../../context/AuthContext'
import{ v4 as uuid} from "uuid";
import { collection, doc, addDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { ChatContext } from '../../context/ChatContext';
import { useNavigate } from "react-router-dom";
 // Replace './firebase' with the correct path to your Firebase setup

const NewMessage = () => {
  let navigate = useNavigate();
  const {dispatch} = useContext(ChatContext);
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
  const { currentUser } = useContext(AuthContext);
  const {data} =useContext(NewMessageContext);
  const [userUID, setUserUID] = useState(data.userInfo);
  const [subject, setSubject] = useState('');
  const [img, setImg] = useState(null);
  const [text, setText] = useState('');
  const userInfoCollection = collection(db, 'userInfo');
  const [message,setMessage] = useState([]);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
 

  const checkFileSize = (file) => {
    return file.size <= MAX_FILE_SIZE;
  };
  const [users,setUsers] = useState([]);
    const userName = users.firstName;
    useEffect(()=>{
      const getUsers = async () =>{
        const currentUserUID = currentUser.uid.toString()
        try{
          const docRef = doc(userInfoCollection, currentUserUID);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUsers(docSnap.data())
          } else {
            // docSnap.data() will be undefined in this case
          console.log("No such document!");
          }
        } catch  (error) {
            console.error('Error retrieving collection:', error);
          }
      };
    getUsers();
    },[currentUser]);

    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  const handleNewSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a new object with the provided data
      const newMessage = {
        text,
        // Convert age to a number if needed
        image: null, // We'll store the image URL in Firestore later
        senderUID: currentUser.uid,// Add a timestamp for the object (you can add your timestamp logic here)
        timestamp: getCurrentTime(),
      };

      if (img) {
        if (!ALLOWED_FILE_TYPES.includes(img.type)) {
          console.log('Unsupported file type. Only images (JPEG/PNG) are allowed.');
          return;
        }

        if (!checkFileSize(img)) {
          console.log('File size exceeds the limit (5MB).');
          return;
        }

        // Generate UUID v4 as the document ID
        const messageId = uuid();

        // Upload the image to storage
        const storageRef = ref(storage, `images/${img.name}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed', null, (error) => {
          console.error('Error uploading image:', error);
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          newMessage.image = downloadURL;

          const updatedMessages = [...message, newMessage];

          // Set the document with the generated UUID as the ID
          await setDoc(doc(db, 'messageContent', messageId), {
            subject,
            archive: false,
            important: false,
            senderUID: userName,
            userName: data.userInfo,
            messages: updatedMessages,
            timestamp: getCurrentTime(),
            }
            );

          console.log('Message sent successfully');

          // Clear the input fields after successful message submission
          
          dispatch({type:"CHANGE_USER", payload: messageId});
          console.log(messageId)
          let path = `/message`; 
          navigate(path);
        });
      } else {
        // Generate UUID v4 as the document ID
        const messageId = uuid();

        const newMessage = {
          text,
          // Convert age to a number if needed
          image: null, // We'll store the image URL in Firestore later
          senderUID: currentUser.uid,// Add a timestamp for the object (you can add your timestamp logic here)
          timestamp: getCurrentTime(),
        };

        const updatedMessages = [...message, newMessage];
        // Set the document with the generated UUID as the ID (without image URL)
        await setDoc(doc(db, 'messageContent', messageId), 
        {
          subject,
          archive: false,
          important: false,
          senderUID: userName,
          userUID: data.userInfo,
          messages: updatedMessages,
          timestamp: getCurrentTime(),
        }
        
        );

        console.log('Message sent successfully');

        dispatch({type:"CHANGE_USER", payload: messageId});
       
        let path = `/message`; 
        navigate(path);
        // Clear the input fields after successful message submission
        
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
<>
    <main>
            <SideBar />
            <div className='newChat'>

            <form>
        <input
          type='text'
          placeholder='Recipient...'
          value={userUID}
          onChange={(e) => setUserUID(e.target.value)}
        />
        <input
          type='text'
          placeholder='Type Subject...'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input type='file' onChange={(e) => setImg(e.target.files[0])} />
        <div className='textarea-container'>
          <textarea
            name='my_textarea'
            rows='10'
            cols='30'
            placeholder='Type Post here...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button onClick={handleNewSubmit}>Send</button>
      </form>

            </div>
    </main>


</>
  )
}

export default NewMessage