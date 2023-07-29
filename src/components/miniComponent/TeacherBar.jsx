import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

import { collection, getDocs, query, where, doc,getDoc,setDoc} from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const TeacherBar = () => {

    let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const userInfoCollection = collection(db, 'userInfo');
  const [teacher, setTeacher] = useState([]);
  const [admin, setAdmin] = useState([]);
  const {dispatch} = useContext(ChatContext)
 
  useEffect(() => {
    const getUser = async () => {
      if (currentUser && currentUser.uid) {
        const currentUserUid = currentUser.uid.toString();
        // Use the 'where' function to filter documents where a specific field meets a condition
        const q = query(userInfoCollection, where('userType', '==', "TEACHER"));
        const data = await getDocs(q);

        setTeacher(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data);
        
        
      }
    };
    getUser();
  }, [currentUser]); 

  useEffect(() => {
    const getUser = async () => {
      if (currentUser && currentUser.uid) {
        const currentUserUid = currentUser.uid.toString();
        // Use the 'where' function to filter documents where a specific field meets a condition
        const q = query(userInfoCollection, where('userType', '==', "ADMIN"));
        const data = await getDocs(q);

        setAdmin(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data);
        
        
      }
    };
    getUser();
  }, [currentUser]); 

  const handleSelect = async () => {
    console.log('clicked');
    //check whether the group(chats in firestore) exists, if not create
    const uid = uuidv4();
    
    try {
      const res = await getDoc(doc(db, "MessageContent", uid));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "messageContent", uid), {chatID: uid,senderUID: users.name ,userUID: user.uid, messages: [] });

        //create user chats
       console.log(uid)
       console.log(currentUser.uid)
       
      }
    } catch (err) {console.error(err)}
   
  };
  // const handleSelect = async (itemId) => {
  //   dispatch({type:"CHANGE_USER", payload: itemId});
  //   console.log(itemId)
  //   let path = `message`; 
  //   navigate(path);
  // };
  return (
    <>
      
      <div className='coordinator'>
      <h2>Coordinator</h2>
      <input type='text' placeholder='Search Coordinator' />

      <h3>Professor</h3>
    <div className='teacherInfo'>
        {teacher.map((teacher) => {
          return (
            <div className='teacherCard' onClick={() => handleSelect(teacher.uid)} key={teacher.id}>
              <div className='teacherFlex'>
              <img src={teacher.photoFile} alt="" />
              <p>{teacher.name}</p>
              </div>
              <div className='teacherRank'>
                <span>{teacher.userType}</span>
              </div>
            </div>
          );
        })}
    </div>
    <h3>Admin</h3>
    <div className='teacherInfo'>
        {admin.map((admin) => {
          return (
            <div className='teacherCard' onClick={() => handleSelect(admin.uid)} key={admin.id}>
              <div className='teacherFlex'>
              <img src={admin.photoFile} alt="" />
              <p>{admin.name}</p>
              </div>
              <div className='teacherRank'>
                <span>{admin.userType}</span>
              </div>
            </div>
          );
        })}
    </div>
      </div>
    </>
  )
}

export default TeacherBar