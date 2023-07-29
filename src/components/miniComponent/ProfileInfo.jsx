import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { collection, doc, updateDoc,getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import avatar4 from './../../assets/avatar4.png';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileInfo = () => {
  const { currentUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [section, setSection] = useState('');
  const [id, setId] = useState('');
  const [userType, setUserType] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  
  const userInfoCollection = collection(db, 'userInfo');
  const [users,setUsers] = useState([]);

  // ... (rest of the code remains unchanged) ...

  // Define a function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('clicked')
    const updatedUserData = {};
    if (photoFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `user_photos/${currentUser.uid}/${photoFile.name}`);
    
      try {
        // Upload the photo file to Storage
        await uploadBytes(storageRef, photoFile);
  
        // Get the download URL of the uploaded photo
        const downloadURL = await getDownloadURL(storageRef);
        
  
        // Add the photoURL to the updatedUserData object
        updatedUserData.photoFile = downloadURL;
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
    // Create an object to store the updated user data
    
  
    // Add fields to the updatedUserData object only if they have non-empty values
    if (email.trim() !== '') {
      updatedUserData.email = email;
    }
    if (name.trim() !== '') {
      updatedUserData.name = name;
    }
    if (firstName.trim() !== '') {
      updatedUserData.firstName = firstName;
    }
    if (lastName.trim() !== '') {
      updatedUserData.lastName = lastName;
    }
    if (age.trim() !== '') {
      updatedUserData.age = age;
    }
    if (section.trim() !== '') {
      updatedUserData.section = section;
    }
    if (id.trim() !== '') {
      updatedUserData.id = id;
    }
    if (userType.trim() !== '') {
      updatedUserData.userType = userType;
    }
   
      updatedUserData.photoFile; // Include photoURL in the updatedUserData object
    
  
    // Get the user document reference in the "userInfo" collection
    const currentUserUID = currentUser.uid.toString();
    const userDocRef = doc(userInfoCollection, currentUserUID);
  
    try {
      // Update the user document with the updated data
      await updateDoc(userDocRef, updatedUserData);
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
 
 
  
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

  return (
    <>
      <div className='profileInfo'>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Profile Page</h2>
            </legend>
            <div>
              <label>Email:</label>
              <input type="email" value={email} placeholder={users.email} onChange={(e) => setEmail(e.target.value)} />

              <label>Name:</label>
              <input type="text" value={name} placeholder={users.name} onChange={(e) => setName(e.target.value)} />

              <label>First Name:</label>
              <input type="text" value={firstName} placeholder={users.firstName} onChange={(e) => setFirstName(e.target.value)} />

              <label>Last Name:</label>
              <input type="text" value={lastName} placeholder={users.lastName} onChange={(e) => setLastName(e.target.value)} />

              <label>Age:</label>
              <input type="number" value={age} placeholder={users.age} onChange={(e) => setAge(e.target.value)} />

              <label>Section:</label>
              <input type="text" value={section} placeholder={users.section} onChange={(e) => setSection(e.target.value)} />

              <label>ID:</label>
              <input type="text" value={id} placeholder={users.id} onChange={(e) => setId(e.target.value)} />

              <label>Photo:</label>
              <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} />

            <div>
              
            </div>
           
           
        

              <button type="submit">Submit</button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
