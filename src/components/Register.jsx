import React, {useState} from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

    const [name,setName] = useState(null);
    const [email, setEmail] = useState('');
    const [section,setSection] = useState(null);
    const [userType,setUserType] = useState('Student');
    const [messageSubject,setMessageSubject] = useState(['Concern', 'Document', 'Grade', 'ETC'])
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const userInfoCollection = collection(db, 'userInfo');


    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
          // Create user with email and password
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser)
    
          //create user on firestore
          await setDoc(doc(userInfoCollection, res.user.uid), {
            uid: res.user.uid,
            email,
            name,
            section,
            userType,
            messageSubject
           
          });
    
          navigate("/");
          setEmail('');
          setPassword('');
          
        }catch (error) {
            console.error('Error signing in:', error);
          }
        };

  return (
    <>
    <form onSubmit={handleSignUp}>
      <input 
        type="email" 
        placeholder='Email'  
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Submit</button>
      </form>
    </>
  )
}

export default Register