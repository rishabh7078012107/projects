import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginform = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    
    try{
    let response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    
    if (response.ok) {
      const previousLogged = { email, token: data.token };
      setUser(previousLogged);
      localStorage.setItem("user", JSON.stringify(previousLogged));
      navigate("/profile",{ replace: true });
    } else {
      setError("Invalid credentials");
    }
  }
  catch(err){
    setError(err.message || "Something went wrong. Please try again.");
  }
  };

  return (
    <div className="loginContainer">
       
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Your Email here"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Your Password here"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Loginform;
