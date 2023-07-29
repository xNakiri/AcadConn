import React, { useState } from 'react';
import {db, storage} from "../firebase"
import {  ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';


const AdminPanel = () => {
  const [schoolName, setSchoolName] = useState('');
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [schoolDescription, setSchoolDescription] = useState('');
  const [schoolImage, setSchoolImage] = useState(null);
  
  
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
  


  const [selectedValue, setSelectedValue] = useState('option1');
  
  // Function to handle radio button change
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <main>
        <div className='adminEditAccount'>
          <p>Name</p>
          
          <form>
          <input type='text' />
          <div className='radioButton'>
            <label htmlFor="option1">
            <input
              type="radio"
              id="option1"
              name="radioGroup"
              value="Student"
              checked={selectedValue === 'Student'}
              onChange={handleRadioChange}
            />
            Student</label>

            <label htmlFor="option2">
            <input
              type="radio"
              id="option2"
              name="radioGroup"
              value="Teacher"
              checked={selectedValue === 'Teacher'}
              onChange={handleRadioChange}
            />
            Teacher</label>
            <label htmlFor="option3">
            <input
              type="radio"
              id="option3"
              name="radioGroup"
              value="Admin"
              checked={selectedValue === 'Admin'}
              onChange={handleRadioChange}
            />
            Admin</label>
          </div>
          </form>
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
