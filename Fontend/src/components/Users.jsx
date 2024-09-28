import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const fetchUsers = async () => {
    try {
      await axios
        .get("/admin/show/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setUsers(response.data.users);
        });
    } catch (error) {
      alert("Error Occured");
      console.log("Error occurred: ", error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center align-middle flex-wrap gap-7 p-2">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex flex-col border border-black p-4 relative"
          style={{ maxWidth: "30rem", width: "25rem", height: "auto" }}
        >
          <div className="relative" style={{ paddingBottom: "70.25%" }}>
            <img
              src={user.photo}
              alt="photo"
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          </div>
          <h1 className="text-lg font-bold">Username: {user.username}</h1>
          <h2 className="text-lg">Phone: {user.phone}</h2>
          <h2 className="text-lg">Role: {user.role}</h2>
          <button
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white text-xs font-semibold px-2 py-1 rounded-full"
            onClick={async () => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this user?"
              );
              if (confirmDelete) {
                const token = localStorage.getItem("token");
                try {
                  await axios
                    .delete(`/admin/delete/${user._id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                    })
                    .then((response) => {
                      alert(
                        `User is deleted from records`
                      );
                      setUsers(prevUsers => prevUsers.filter(prevUser => prevUser._id !== user._id));
                    });
                } catch (error) {
                  console.log("Error occurred: ", error);
                }
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;
