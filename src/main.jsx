import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { NewMessageContextProvider } from './context/CreateChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <NewMessageContextProvider>
  <ChatContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChatContextProvider>
  </NewMessageContextProvider>
  </AuthContextProvider>
)
