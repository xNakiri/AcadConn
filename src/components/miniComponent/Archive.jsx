import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import SearchBar from './SearchBar';
import { collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import archive from "../../assets/archive.png";
import star  from "../../assets/star.png";

const Archive = () => {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const userInfoCollection = collection(db, 'messageContent');
  const [chatMessage, setChatMessage] = useState([]);
  const {dispatch} = useContext(ChatContext)
  const [itemId,setItemId] =useState('')
  const [users,setUsers] = useState([]);
  const [isArchived, setIsArchived] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const userInfo = collection(db, 'userInfo');
  const userName = users.name;

    useEffect(()=>{
      const getUsers = async () =>{
        const currentUserUID = currentUser.uid.toString()
        
        try{
          const docRef = doc(userInfo, currentUserUID);
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

  useEffect(() => {
    const getUser = async () => {
        // Use the 'where' function to filter documents where a specific field meets a condition
        const q = query(userInfoCollection, where('userUID', '==', userName),where('archivedBy', 'array-contains', currentUser.uid));
        const data = await getDocs(q);

        setChatMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data); 
      
    };
    getUser();
  }, [userName]); 
  const handleImportantClick = async (newID) => {
    try {
      // Fetch the existing data of the message from Firestore
      const messageRef = doc(db, 'messageContent', newID);
      const messageDoc = await getDoc(messageRef);
  
      if (messageDoc.exists()) {
        const messageData = messageDoc.data();
        const archivedByArray = messageData.importantBy || [];
        const currentUserUID = currentUser.uid;
  
        if (archivedByArray.includes(currentUserUID)) {
          // Unarchive the message
          const updatedArchivedByArray = archivedByArray.filter(
            (uid) => uid !== currentUserUID
          );
  
          // Update the 'archivedBy' and 'archive' fields in Firestore
          await updateDoc(messageRef, {
           importantBy: arrayRemove(currentUserUID),
            important: updatedArchivedByArray.length > 0, // Set 'archive' to false if no more users have archived the message
          });
  
          console.log('Message unarchived successfully.');
  
          // Update the local state to reflect the change
          setIsArchived(false);
        } else {
          // Archive the message
          // Update the 'archivedBy' array with the current user's UID using arrayUnion
          const updatedArchivedByArray = [...archivedByArray, currentUserUID];
  
          // Update the 'archivedBy' and 'archive' fields in Firestore
          await updateDoc(messageRef, {
            importantBy: arrayUnion(currentUserUID),
            important: true,
          });
  
          console.log('Message archived successfully.');
  
          // Update the local state to reflect the change
          setIsImportant(true);
        }
      }
    } catch (error) {
      console.error('Error archiving/unarchiving data:', error);
    }
  };

  const handleArchiveClick = async (newID) => {
    try {
      // Fetch the existing data of the message from Firestore
      const messageRef = doc(db, 'messageContent', newID);
      const messageDoc = await getDoc(messageRef);
  
      if (messageDoc.exists()) {
        const messageData = messageDoc.data();
        const archivedByArray = messageData.archivedBy || [];
        const currentUserUID = currentUser.uid;
  
        if (archivedByArray.includes(currentUserUID)) {
          // Unarchive the message
          const updatedArchivedByArray = archivedByArray.filter(
            (uid) => uid !== currentUserUID
          );
  
          // Update the 'archivedBy' and 'archive' fields in Firestore
          await updateDoc(messageRef, {
            archivedBy: arrayRemove(currentUserUID),
            archive: updatedArchivedByArray.length > 0, // Set 'archive' to false if no more users have archived the message
          });
  
          console.log('Message unarchived successfully.');
  
          // Update the local state to reflect the change
          setIsArchived(false);
        } else {
          // Archive the message
          // Update the 'archivedBy' array with the current user's UID using arrayUnion
          const updatedArchivedByArray = [...archivedByArray, currentUserUID];
  
          // Update the 'archivedBy' and 'archive' fields in Firestore
          await updateDoc(messageRef, {
            archivedBy: arrayUnion(currentUserUID),
            archive: true,
          });
  
          console.log('Message archived successfully.');
  
          // Update the local state to reflect the change
          setIsArchived(true);
        }
      }
    } catch (error) {
      console.error('Error archiving/unarchiving data:', error);
    }
  };


  const handleSelect = async (itemId) => {
    
    dispatch({type:"CHANGE_USER", payload: itemId});
    console.log(itemId)
    let path = `/message`; 
    navigate(path);
  };

  return (
    <>
      <div className='chatBar'>
        <SearchBar />

        {chatMessage.map((chat) => {
          return (
            <div className='chatCard'  key={chat.id}>
            <p onClick={() => handleSelect(chat.id)}>{chat.senderUID}</p>
            <div className='chatInfo'>
              <p>{chat.userUID}</p>
              <label><button onClick={()=>handleArchiveClick(chat.id)}><img src={archive} /></button></label>
                <label><button onClick={()=>handleImportantClick(chat.id)}><img src={star} /></button></label>
            </div>
          </div>
          );
        })}
      </div>
    </>
  );
}

export default Archive