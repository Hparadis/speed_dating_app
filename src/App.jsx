import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";

import Login from "./pages/Login";

import Chat from "./pages/Chat";

import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
    </Routes>
  );
}



export default App;
