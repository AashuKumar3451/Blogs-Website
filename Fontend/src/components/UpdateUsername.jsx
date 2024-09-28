import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateUsername() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      currentUsername,
      newUsername,
    };
    try {
        const token = localStorage.getItem("token");
      await axios.put("/user/profile/username", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
      }).then((response) => {
        alert("Username Updated Successfully");
        setCurrentUsername("");
        setNewUsername("");
        navigate("/profile");
      })
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
            <label htmlFor="currentUsername">Current Username: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={currentUsername}
              type="text"
              required
              name="currentUsername"
              id="currentUsername"
              onChange={(e) => {
                setCurrentUsername(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 w-full">
            <label htmlFor="newUsername">New Username: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={newUsername}
              type="text"
              required
              name="newUsername"
              id="newUsername"
              onChange={(e) => {
                setNewUsername(e.target.value);
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
  );
}

export default UpdateUsername;
