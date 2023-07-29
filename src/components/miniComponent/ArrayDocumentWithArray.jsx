// import React, { useContext, useState } from 'react';
// import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { db, storage } from '../../firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { ChatContext } from '../../context/ChatContext';

// const AddDocumentWithArray = () => {
//   const [messageContent, setMessageContent] = useState([]);
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [image, setImage] = useState(null);
//   const {data} = useContext(ChatContext)
//   const handleAddData = async () => {
//     try {
//       // Create a new object with the provided name, age, and image URL
//       const newData = {
//         name,
//         age: parseInt(age), // Convert age to a number if needed
//         image: null, // We'll store the image URL in Firestore later
//         // Add a timestamp for the object (you can add your timestamp logic here)
//         timestamp: new Date().toISOString(),
//       };

//       // Fetch the existing document to get the current array data
//       const docRef = doc(db, 'messageContent', data.chatId); // Replace 'documentId' with the actual document ID
//       const docSnap = await getDoc(docRef);
//       const existingDataArray = docSnap.exists() ? docSnap.data().messages : [];

//       // Add the new data object to the existing array
//       const updatedArray = [...existingDataArray, newData];

//       // Upload the image to storage and update the image URL in Firestore
//       if (image) {
//         const storageRef = ref(storage, `images/${image.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, image);

//         uploadTask.on('state_changed', null, (error) => {
//           console.error('Error uploading image:', error);
//         }, async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           newData.image = downloadURL;

//           // Update the document in Firestore with the updated array and new data object
//           await updateDoc(docRef, {
//             messages: updatedArray,
//           });
//           console.log('success');

//           // Clear the input fields and update the dataArray state
//           setMessageContent(updatedArray);
//           setName('');
//           setAge('');
//           setImage(null);
//         });
//       } else {
//         // Update the document in Firestore with the updated array and new data object (without image URL)
//         await updateDoc(docRef, {
//           messages: updatedArray,
//         });
//         console.log('success');

//         // Clear the input fields and update the dataArray state
//         setMessageContent(updatedArray);
//         setName('');
//         setAge('');
//         setImage(null);
//       }
//     } catch (error) {
//       console.error('Error adding document:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Document with Array of Objects</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Age"
//           value={age}
//           onChange={(e) => setAge(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button onClick={handleAddData}>Add Data</button>
//       </div>
//       <div>
//         <h3>Data Array:</h3>
//         <ul>
//           {messageContent.map((data, index) => (
//             <li key={index}>
//               Name: {data.name}, Age: {data.age}, Timestamp: {data.timestamp}
//               {data.image && <img src={data.image} alt={`Image of ${data.name}`} />}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddDocumentWithArray;
