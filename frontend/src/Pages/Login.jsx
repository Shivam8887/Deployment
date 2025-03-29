import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../APi/api';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });

  // Change Handler
  function changeHandler(event) {
    const { name, value } = event.target;
    setlogindata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
  
    console.log("Logindata:", logindata); // Log input data
  
    try {
      const res = await axios.post(login, logindata, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }, // Add headers if required
      });
  
      console.log("Full Response:", res); // Log entire response
  
      if (res.status === 200) {
  
          navigate('/blogs');
      
      } else {
        console.error("Unexpected Response Status:", res.status);
      }
    } catch (err) {
      console.error("Error in Login:", err.response || err.message); // Log full error
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };
  
  return (
    <div className="p-4 border rounded-md flex justify-center items-center min-h-screen">
      <form className="flex flex-col space-y-4 p-6 border rounded-md hover:shadow-md shadow-black transition ease-in-out" onSubmit={submitHandler}>
        <h4 className="flex justify-center text-lg font-semibold">Login</h4>
        <input 
          type="email"
          placeholder="Enter Your Email"
          required
          className="border rounded p-2"
          name="email"
          value={logindata.email} // Ensure value is bound
          onChange={changeHandler} 
        />
        <input 
          type="password"
          placeholder="Enter Your Password"
          required
          className="border rounded p-2"
          name="password"
          value={logindata.password} // Ensure value is bound
          onChange={changeHandler} 
        />
        <button type="submit" className="mt-3 bg-blue-400 text-white p-2 rounded hover:bg-blue-600 transition ease-in-out">
          Login
        </button>
        <p> 
          Don't have an account?  
          <Link to="/signup" className="text-blue-600 ml-1">Register</Link>
        </p>
      </form>
    </div>
  );
};
