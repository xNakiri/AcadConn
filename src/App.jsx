import AuthenticationPages from './Pages/AuthenticationPages';
import { useContext } from 'react';
import ChatPages from './Pages/ChatPages';
import Admin from './Pages/Admin';
import ProfilePages from './Pages/ProfilePages';
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import ChatsNew from './Pages/ChatsNew';
import TeacherTab from './Pages/TeacherTab';
import Home from "./Pages/Home";
import "./styles.scss";
import ChatImportant from './components/ChatImportant';
import ChatSentBox from './components/ChatSentbox';
import ChatInbox from './components/ChatInbox';
import ChatArchive from './components/ChatArchive';
import ChatNew from './Pages/ChatNew';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/authenticationPages" />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="authenticationPages" element={<AuthenticationPages />} />

          {/* All other routes are protected using ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <TeacherTab />
              </ProtectedRoute>
            }
          />
          <Route path="/message" element={<ProtectedRoute><ChatsNew /></ProtectedRoute>} />

          <Route path="/chatImportant" element={<ProtectedRoute><ChatImportant /></ProtectedRoute>} />
          <Route path="/chatSentBox" element={<ProtectedRoute><ChatSentBox /></ProtectedRoute>} />
          <Route path="/chatInbox" element={<ProtectedRoute><ChatInbox /></ProtectedRoute>} />
          <Route path="/chatArchive" element={<ProtectedRoute><ChatArchive /></ProtectedRoute>} />
          <Route path="/newChat" element={<ProtectedRoute><ChatNew /></ProtectedRoute>}/>
          
          {/* Catch-all route for paths not matched */}
          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
