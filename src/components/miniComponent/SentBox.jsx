import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import SearchBar from './SearchBar';
import { collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import archive from "../../assets/archive.png";
import star  from "../../assets/star.png";

const SentBox = () => {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const userInfoCollection = collection(db, 'messageContent');
  const [chatMessage, setChatMessage] = useState([]);
  const {dispatch} = useContext(ChatContext)
  const [itemId,setItemId] =useState('')
  const [users,setUsers] = useState([]);
  
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
        const q = query(userInfoCollection, where('senderUID', '==', userName));
        const data = await getDocs(q);

        setChatMessage(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data); 
      
    };
    getUser();
  }, [userName]); 


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
                <label><button><img src={archive} /></button></label>
                <label><button><img src={star} /></button></label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SentBox