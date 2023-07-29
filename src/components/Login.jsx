import React, {useState} from 'react';
import {auth} from "../firebase";
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log('clicked')
        try {
          // Sign in user with email and password
          await signInWithEmailAndPassword(auth, email, password);
    
          // Clear the for
          navigate("/");
          setEmail('');
          setPassword('');

        } catch (error) {
          console.error('Error signing in:', error);
        }
      };

  return (
   <>
   <form onSubmit={handleSignIn}>
      <input 
        type="email" 
        placeholder='Email' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
      <input 
        type="password" 
        placeholder='password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      <button>Submit</button>
      </form>
   </>
  )
}

export default Login