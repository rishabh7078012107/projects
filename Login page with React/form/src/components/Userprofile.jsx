import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Userprofile = ({ user, setUser }) => {
  const navigate = useNavigate();

 

  useEffect(() => {
    if (!user) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        navigate("/",{ replace: true });
      } }
  }, [user,navigate,setUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/",{ replace: true });
  };
  return (
    <div >
      {user ? (
        <div className="profile-container">
          <h2>Welcome,{user.email}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Userprofile;
