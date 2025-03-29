import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signup } from '../APi/api';
import { ToastContainer, toast } from 'react-toastify';

export const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Change Handler
  function changeHandler(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const submitHandler = async (event) => {
   
    event.preventDefault(); // Prevents page refresh on form submission
    try {
      const res = await axios.post(signup, userData);
      console.log('Registration Successful:', res.data);
      if(res.status===201){
        toast("Successfully Registered! kindly Login");
        setTimeout(() => {
          navigate('/login');
        }, 3000); // 2-second delay
        
      }
    } catch (err) {
      console.log('Error in Registration.');
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 flex justify-center items-center min-h-screen">
      <form
        className="flex flex-col space-y-4 p-6 border rounded-md hover:shadow-md shadow-black transition ease-in-out"
        onSubmit={submitHandler}
      >
        <h4 className="flex justify-center text-lg font-semibold">Sign Up</h4>
        <input
          type="text"
          placeholder="Enter Your Full Name"
          required
          className="border rounded p-2"
          name="name"
          value={userData.name} // Binding state to input
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          className="border rounded p-2"
          name="email"
          value={userData.email} // Binding state to input
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          required
          className="border rounded p-2"
          name="password"
          value={userData.password} // Binding state to input
          onChange={changeHandler}
        />
        <button
          type="submit"
          className="mt-3 bg-blue-400 text-white p-2 rounded hover:bg-blue-600 transition ease-in-out"
        >
          Sign Up
        </button>
        <p>
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1">
            Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};
