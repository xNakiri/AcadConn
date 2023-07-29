import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";



export const ChatContext = createContext();

export const ChatContextProvider = ({children})=>{
    const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          
          chatId: action.payload,
          // Use only the UID from the action payload
        };
      default:
        return state;
    }
  };

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
    console.log(state) 
    return(
    <ChatContext.Provider value={{data:state, dispatch}}>
        {children}

    </ChatContext.Provider>
    );
};