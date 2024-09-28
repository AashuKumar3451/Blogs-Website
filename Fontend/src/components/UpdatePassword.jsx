import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      currentPass: currentPassword,
      newPass: newPassword,
    };
    try {
        const token = localStorage.getItem("token");
      await axios.put("/user/profile/password", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
      }).then((response) => {
        alert("Password Updated Successfully");
        setCurrentPassword("");
        setNewPassword("");
        navigate("/profile");
      });
    } catch (error) {
      alert("Error Occured");
      console.error("There was an error!", error);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-start my-6 max-h-screen">
        <div className="form-color shadow-2xl rounded px-7 py-20 items-center flex flex-col">
          <div className="mt-3 w-full">
            <label htmlFor="currentPassword">Current Password: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={currentPassword}
              type="password"
              required
              name="currentPassword"
              id="currentPassword"
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 w-full">
            <label htmlFor="newPassword">New Password: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={newPassword}
              type="password"
              required
              name="newPassword"
              id="newPassword"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-3 p-2 btn-color border rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword
