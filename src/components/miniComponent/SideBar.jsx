import React from 'react'
import newMessage from "./../../assets/new.png"
import archive from "./../../assets/archive.png"
import star from "./../../assets/starred.png"
import trash from "./../../assets/trash.png"
import group from "./../../assets/group.png"
const SideBar = () => {
  return (
    <>
    <div className='messageCreation'>
            <label><button ><img src={newMessage} alt="" /></button>New</label>
            <label><button><img src={archive} alt="" /></button>Archive</label>
            <label><button><img src={star} alt="" /></button>Important</label>
            <label><button><img src={trash} alt="" /></button>Trash</label>
            <label><button><img src={group} alt="" /></button>Group</label>
        </div>
    </>
  )
}

export default SideBar