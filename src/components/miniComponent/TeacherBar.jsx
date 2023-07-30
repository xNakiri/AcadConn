import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


import { collection, getDocs, query, where, doc,getDoc,setDoc} from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { NewMessageContext } from '../../context/CreateChatContext';
const TeacherBar = () => {

    let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const userInfoCollection = collection(db, 'userInfo');
  const [teacher, setTeacher] = useState([]);
  const [admin, setAdmin] = useState([]);
  const {dispatch} = useContext(NewMessageContext)
 
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

  
  // const handleSelect = async (itemId) => {
  //   dispatch({type:"CHANGE_USER", payload: itemId});
  //   console.log(itemId)
  //   let path = `message`; 
  //   navigate(path);
  // };
  const handleSelect = async (itemId) => {
    
    dispatch({type:"CHANGE_USER_INFO", payload: itemId});
    let path = `/newChat`; 
    navigate(path);
   
  };
  return (
    <>
      
      <div className='coordinator'>
      <h2>Coordinator</h2>
      <input type='text' placeholder='Search Coordinator' />

      <h3>Professor</h3>
    <div className='teacherInfo'>
        {teacher.map((teacher) => {
          return (
            <div className='teacherCard' onClick={() => handleSelect(teacher.firstName)} key={teacher.id}>
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
            <div className='teacherCard' onClick={() => handleSelect(admin.name)} key={admin.id}>
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