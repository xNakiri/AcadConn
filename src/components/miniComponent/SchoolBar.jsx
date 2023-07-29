import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { NewMessageContext } from '../../context/CreateChatContext';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const SchoolBar = () => {
  const { currentUser } = useContext(AuthContext);
  const userInfoCollection = collection(db, "schoolInfo");
  const [school, setSchool] = useState([]);
  const {dispatch} = useContext(NewMessageContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getSchool = async () => {
      const data = await getDocs(userInfoCollection);
      setSchool(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getSchool();
  }, []);

  const handleSelect = async (itemId) => {
    console.log(itemId)
    dispatch({type:"CHANGE_USER", payload: itemId});
    
    let path = `/message`; 
    navigate(path);
  };

  return (
    <>
      <div className="mainContainer">
        <div className="slide1">{school.map((school) => {
              return (
                <>
          <div className='cardContainer' id="#card1" key={school.id}>
            
            
              <img src={school.schoolImage} alt="" />
                <div className='schoolCardInfo'>
                  <h4>Name of School: {school.schoolName}</h4>
                  <p>Description : {school.schoolDescription}</p>
                  <p><a href={`tel:${school.contactNumber}`}>Contact Number: {school.contactNumber}</a></p>
                  <p><a href={`mailto:${school.schoolEmail}`}>Email: {school.schoolEmail}</a></p>
                  <div className='newButton'><button onClick={() => handleSelect(school.schoolName)}>New Message</button></div>
                </div>
            </div>
                </>
              );
            })}
          
        </div>
      </div>
    </>
  );
};

export default SchoolBar;
