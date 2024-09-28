import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/AuthSlice/UseAuth.js";
import { useDispatch } from "react-redux";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      password,
      phone,
      role,
      photo: image,
    };
    try {
      await axios
        .post("/auth/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
        });
      dispatch(signup());
      alert("User Created Successfully");
      setUsername("");
      setPassword("");
      setPhone("");
      setRole("user");
      setImage("");
      navigate("/blogs");
    } catch (error) {
      alert("Error Occured");
      console.log("Error Occured", error);  
      
    }
  };

  return (
    <div className="items-start my-10 mx-40 max-h-screen">
      <form
        className=" flex flex-col form-color shadow-2xl rounded px-8 py-10"
        onSubmit={handleSignup}
      >
        <div>
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="font-light">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
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
          <div className="mt-3">
            <label htmlFor="phone">Phone: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={phone}
              type="string"
              required
              name="phone"
              id="phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="role">Role: </label>
            <select
              className="border border-gray-500 p-1 w-full rounded-md"
              value={role}
              type="string"
              name="role"
              id="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-3">
            <label htmlFor="photo">Photo: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        </div>
        <button type="submit" className="mt-3 p-2 btn-color border rounded-md ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
