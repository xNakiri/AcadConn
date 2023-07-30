import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const NewMessageContext = createContext();

export const NewMessageContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  // Add any other initial state properties specific to the new message context if needed
  const INITIAL_STATE = {
    userInfo: currentUser, // Pass the user info from the AuthContext as the initial value for userInfo
  };

  const newMessageReducer = (state, action) => {
    // Handle any actions related to the new message here (if needed)
    switch (action.type) {
      // Example of handling an action to change the user info
      case "CHANGE_USER_INFO":
        return {
          ...state,
          userInfo: action.payload, // Update the userInfo with the new data from the action payload
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(newMessageReducer, INITIAL_STATE);

  console.log(`message${state.userInfo}`);

  return (
    <NewMessageContext.Provider value={{ data: state, dispatch }}>
      {children}
    </NewMessageContext.Provider>
  );
};