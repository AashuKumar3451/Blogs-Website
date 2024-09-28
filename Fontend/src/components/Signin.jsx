import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signin } from "../features/AuthSlice/UseAuth.js";
import { useDispatch } from "react-redux";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
    };
    try {
      await axios.post("/auth/signin", formData).then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          dispatch(signin());
          alert("User Login Successfully");
          setUsername("");
          setPassword("");
          navigate("/blogs");
        }
      });
    } catch (error) {
      alert("Error Occured");
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="items-start my-16 mx-40 max-h-screen">
      <form
        className=" flex flex-col form-color shadow-2xl rounded px-8 py-20"
        onSubmit={handleSignin}
      >
        <div className="mt-3">
          <label htmlFor="username">Username: </label>
          <input
            className="border border-gray-500 p-1 w-full rounded-md"
            value={username}
            type="text"
            required
            name="username"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password">Password: </label>
          <input
            className="border border-gray-500 p-1 w-full rounded-md"
            value={password}
            type="password"
            required
            name="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="mt-3 p-2 btn-color border rounded-md ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signin;
