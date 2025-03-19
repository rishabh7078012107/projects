import React, { useEffect, useState } from "react";
import Loginform from "./components/Loginform";
import Userprofile from "./components/userprofile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginform setUser={setUser} />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Userprofile user={user} setUser={setUser} />
            </ProtectedRoute>
          }
          />
        
        
      </Routes>
    </Router>
  );
};

export default App;
