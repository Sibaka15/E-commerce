import React, { useState } from "react";
import registerImage from '../assets/register.webp'
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log('User Registered :: ',{name,email,password});
    
  }

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border rounded-lg shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Sibaka</h2>
          </div>
          <h2 className="text-center font-bold mb-6 text-2xl">Hey There 👋</h2>
          <p className="text-center mb-6">
            Enter your username and Password to register
          </p>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="Enter your password"
            />
          </div>
          <button className="mt-2 w-full bg-black text-white px-2 py-2 rounded-lg font-semibold hover:bg-gray-600">
            Sign Up
          </button>
          <p className="mt-6 text-center text-sm">
            Don't have account?
            <Link to="/login" className="ml-2 text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 p-8 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img src={registerImage} className="w-full h-[750px] object-cover rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Register;
