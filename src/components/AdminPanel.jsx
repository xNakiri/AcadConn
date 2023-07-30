import React, { useState } from 'react';
import {db, storage} from "../firebase"
import {  ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, setDoc, doc,updateDoc, query, where, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const AdminPanel = () => {
  const [schoolName, setSchoolName] = useState('');
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [schoolDescription, setSchoolDescription] = useState('');
  const [schoolImage, setSchoolImage] = useState(null);
  const [username, setUsername] = useState('');
  const [ err, setErr ] = useState(false);
  const [user,setUser] = useState([]);
  const [userType, setUserType] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [section, setSection] = useState('');
  const [userId, setUserId] = useState('');

    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setSchoolImage(e.target.files[0]);
      }
    };
  
    const handleSubmit = async (e) => {
      setLoading(true);
      setError(false);
      e.preventDefault();

      console.log('Clicked');
      const uid = uuidv4();
      try {
        // Create a unique image name
        const date = new Date().getTime();
       
        const storageRef = ref(storage, `${schoolName + date}`);
  
        // Upload the image to Firebase Storage
        const uploadTask = uploadBytesResumable(storageRef, schoolImage);
  
        // Listen for state changes, errors, and completion of the upload task
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Track the current upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error during upload:', error);
            setError(true);
            setLoading(false);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // Add school information to the "schoolInfo" collection in Firestore
            await setDoc(doc(db, "schoolInfo", uid), {
              schoolName,
              schoolDescription,
              schoolImage: downloadURL,
            });
          } 
        );
        console.log("success")
        setLoading(false);
        setSchoolName('');
        setSchoolDescription('');
        setUploadProgress(0)
        setSchoolImage(null)
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };
  

    const handleRadioChange = (event) => {
      setSelectedValue(event.target.value);
    };
  
  // Function to handle radio button change
  const handleUpdate = async () => {
    try {
      // Assuming 'userInfo' is the name of your Firestore collection and 'userId' is the user to update
      const userRef = doc(db, 'userInfo', user.id);
  
      // Create a partial update object with only the non-empty fields
      const updateData = {
        ...(name && { name }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(age && { age }),
        ...(section && { section }),
        ...(userId && { userId }),
        userType: selectedValue,
      };
  
      // Perform a partial update using the `set` method with the option `{ merge: true }`
      await setDoc(userRef, updateData, { merge: true });
  
      setError(null);
      console.log('Data updated successfully');
      setUser([]);
      setName('');
      setFirstName('');
      setLastName('');
      setAge('');
      setSection('');
      setUserType('');
      setUserId('');
    } catch (err) {
      setError('Error updating data: ' + err.message);
      console.error('Error updating data:', err);
    }
  };
  

  const handleKey = (e) => {
    if (e.code === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const q = query(collection(db, 'userInfo'), where('name', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming there's only one user with the given username
        const doc = querySnapshot.docs[0];
        setUser({ id: doc.id, ...doc.data() });
        setSelectedValue(doc.data().userType); // Set the radio button value based on the user's userType
        setErr(false);
        console.log('User found');
      } else {
        setUser(null);
        setSelectedValue(''); // Reset radio button value when user not found
        setErr(true);
        console.log('User not found');
      }
    } catch (err) {
      console.error('Error searching for user:', err);
      setErr(true);
    }
  };

  const handleSelect = (itemId) => {
    console.log(itemId);
    setSelectedValue(user.userType); // Set the radio button value based on the selected user's userType
  };

  
  
  
  return (
    <>
      <main>
        <div className='adminEditAccount'>
          <p>Name</p>
          
          
          <input
            type='text'
            placeholder='Find a user'
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          {err && <span>User not found!</span>}
          {user && (
            <div className='userChat' onClick={() => handleSelect(user.id)}>
              <div className='userChatInfo'>
                <span>{user.name}</span>
              </div>
            </div>
          )}
    <p>{`current Account : ${user?.name}`}</p>
    
    <label>Name:</label>
              <input type="text" value={name} placeholder={user.name} onChange={(e) => setName(e.target.value)} />

              <label>First Name:</label>
              <input type="text" value={firstName} placeholder={user.firstName} onChange={(e) => setFirstName(e.target.value)} />

              <label>Last Name:</label>
              <input type="text" value={lastName} placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)} />

              <label>Age:</label>
              <input type="number" value={age} placeholder={user.age} onChange={(e) => setAge(e.target.value)} />

              <label>Section:</label>
              <input type="text" value={section} placeholder={user.section} onChange={(e) => setSection(e.target.value)} />

              <label>ID:</label>
              <input type="text" value={userId} placeholder={user.userId} onChange={(e) => setUserId(e.target.value)} />
          <div className='radioButton'>

            <label htmlFor='option1'>
              <input
                type='radio'
                id='option1'
                name='radioGroup'
                value='STUDENT'
                checked={selectedValue === 'STUDENT'}
                onChange={handleRadioChange}
              />
              Student
            </label>

            <label htmlFor='option2'>
              <input
                type='radio'
                id='option2'
                name='radioGroup'
                value='TEACHER'
                checked={selectedValue === 'TEACHER'}
                onChange={handleRadioChange}
              />
              Teacher
            </label>
            <label htmlFor='option3'>
              <input
                type='radio'
                id='option3'
                name='radioGroup'
                value='ADMIN'
                checked={selectedValue === 'ADMIN'}
                onChange={handleRadioChange}
              />
              Admin
            </label>
          </div>
          <button onClick={handleUpdate}>Update User Type</button>
          {updateSuccess && <p>Data updated successfully!</p>}
        </div>

        <div className='adminPost'>
          <form>
            <input type='file' />
            <textarea name="my_textarea" rows="10" cols="30" placeholder='Type Post here...'></textarea>
            <button>Post</button>
          </form>
        </div>

        <div className='adminAdd'>
          <form>
            <input type='text' placeholder='School Name' onChange={(e) => setSchoolName(e.target.value)}/>
            <textarea name="my_textarea" rows="10" cols="30" placeholder='Type description here...' onChange={(e) => setSchoolDescription(e.target.value)}></textarea>
            <input
              id='schoolImage'
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button onClick={handleSubmit}>Submit</button>
          </form>
          <p>{uploadProgress}</p>
        </div>
      </main>
    </>
  )
}

export default AdminPanel;
