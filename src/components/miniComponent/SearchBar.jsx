import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDoc,
  arrayUnion,
  FieldValue
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { v4 as uuidv4 } from 'uuid';

const SearchBar = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const userInfoCollection = collection(db, 'userInfo');
    const [users,setUsers] = useState([]);
    const userName = users.name;
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
  
    const handleSearch = async () => {
      const q = query(
        collection(db, "userInfo"),
        where("name", "==", username)
      );
  
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    };
  
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const uid = uuidv4();
        
        try {
          const res = await getDoc(doc(db, "MessageContent", uid));
    
          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "messageContent", uid), {chatID: uid,senderUID: userName ,userUID: user.name, messages: [], senderSeen: false, userSeen: false});
    
            //create user chats
           console.log(uid)
           console.log(currentUser.uid)
           
          }
        } catch (err) {console.error(err)}
        
        setUser(null);
        setUsername("")
      };
    

  return (
    <>
     <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          
          <div className="userChatInfo">
            <span>{user.name}</span>
          </div>
        </div>

    )}
    
    </div>
     
    </>
 
    
      )
      }


export default SearchBar