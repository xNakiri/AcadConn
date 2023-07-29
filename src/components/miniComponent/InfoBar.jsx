import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
import { db, auth } from '../../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const InfoBar = () => {
  const {currentUser} = useContext(AuthContext);
  const userInfoCollection = collection(db, 'userInfo');
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  
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
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Handle successful logout
      console.log('User logged out successfully.');
      navigate("/authenticationPages");
    } catch (error) {
      // Handle logout error
      console.error('Error logging out:', error);
    }
  };
  return (
    <>
    <div className='cardInfo'>
        <img src={users.photoFile}></img>
        <div className='info'>
        <p>{users.name}</p>
        <p className='role'>{users.userType}</p>
        </div>
        <button onClick={handleLogout}>Logout</button>
        {users.userType === "ADMIN" && (
          <Link to="/admin"><p className='Admin'>ADMIN</p></Link>
        )}
    </div>
    </>
  )
}

export default InfoBar