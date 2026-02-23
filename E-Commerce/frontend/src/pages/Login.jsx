import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../content/ShopContent";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // NEW — ERROR STATES
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ------------ VALIDATIONS ---------------

 const validateName = (value) => {
  setName(value);

  if (value.trim() === "") {
    return setNameError(""); // remove error when empty
  }

  if (value.length < 3) {
    setNameError("Name must be at least 3 characters");
  } else {
    setNameError("");
  }
};


  const validateEmail = (value) => {
  setEmail(value);

  if (value.trim() === "") {
    return setEmailError(""); // remove error when empty
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    setEmailError("Enter a valid email address");
  } else {
    setEmailError("");
  }
};


  const validatePassword = (value) => {
  setPassword(value);

  if (value.trim() === "") {
    return setPasswordError(""); // remove error when empty
  }

  if (value.length < 6) {
    setPasswordError("Password must be at least 6 characters");
  } else {
    setPasswordError("");
  }
};

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // If errors exist → stop submit
    if (nameError || emailError || passwordError) {
      return toast.error("Please fix validation errors");
    }

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <>
        <input
          onChange={(e) => validateName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
        {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
        </>
      )}
      <input
        onChange={(e) => validateEmail(e.target.value)}
        value={email}
        type="Email"
        placeholder="Email"
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
       {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
      <input
        onChange={(e) => validatePassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
       {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
      <div className="w-full flex justify-between text-sm mt-[-8px] ">
        <p className="cursor-pointer">Forgot your password</p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
