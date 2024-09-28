import axios from "axios";
import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink } from "react-router-dom";
import "../App.css"

function Profile() {
  const [profile, setProfile] = useState(null);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProfile(response.data);
    } catch (error) {
      alert("Error Occured");
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-start my-6 max-h-screen">
      <div className="form-color shadow-2xl rounded px-7 py-20">
        <div className="flex justify-center mb-4">
          <img
            src={profile.user.photo}
            alt="Profile Photo"
            className="rounded-full w-32 h-32"
          />
        </div>
        <table className="table-auto w-full text-left">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-bold">Username:</td>
              <td className="px-4 py-2">{profile.user.username}</td>
              <td className="px-4 py-2">
                <NavLink to="/update-username" className="text-blue-500">
                  <i className="fas fa-pen"></i>
                </NavLink>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold">Phone:</td>
              <td className="px-4 py-2">{profile.user.phone}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold">Role:</td>
              <td className="px-4 py-2">{profile.user.role}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold">Password:</td>
              <td className="px-4 py-2">*************</td>
              <td className="px-4 py-2">
                <NavLink to="/update-password" className="text-blue-500">
                  <i className="fas fa-pen"></i>
                </NavLink>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
