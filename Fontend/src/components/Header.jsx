import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import { signout, signin } from "../features/AuthSlice/UseAuth.js";
import axios from "axios";
import { adminSignIn, adminSignOut } from "../features/AdminAuthSlice/UseAdminAuth.js";

function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const isAuthenticated = useSelector(
    (state) => state.authStatus.isAuthenticated
  );
  const dispatch = useDispatch();

  const checkAdmin = async (token) => {
    try {
      const response = await axios.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data.user.role === "admin") {
        setIsAdmin(true);
        dispatch(adminSignIn());
      } else {
        setIsAdmin(false);
        dispatch(adminSignOut());
      }
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(signin());
      checkAdmin(token);
    }
  }, [dispatch, isAuthenticated]);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(signout());
    dispatch(adminSignOut());
    setIsAdmin(false);
  };

  return (
    <div className="sticky z-50 top-0 shadow-md hidden md:flex justify-between align-middle p-2 md:p-2 bg-cream">
      <div className="flex gap-2 justify-center align-middle">
        {isAuthenticated ? (
          <>
            <Link to="/blogs" className="hover:text-gray-700">
              <img src=".././Imgs/logo.jpeg" alt="Logo" className="max-w-16" />
            </Link>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `text-xl m-auto font-bold hover:text-gray-800 ${
                  isActive ? "text-gray-900" : ""
                }`
              }
            >
              Blog Sphere
            </NavLink>
          </>
        ) : (
          <>
            <Link to="/" className="hover:text-gray-700">
              <img src=".././Imgs/logo.jpeg" alt="Logo" className="max-w-16" />
            </Link>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl m-auto font-bold hover:text-gray-800 ${
                  isActive ? "text-gray-900" : ""
                }`
              }
            >
              Blog Sphere
            </NavLink>
          </>
        )}
      </div>
      <div className="flex align-middle justify-center">
        <ul className="flex gap-4 align-middle justify-center m-auto">
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `text-center hover:text-gray-800 ${
                  isActive ? "text-black font-bold underline" : ""
                } ${!isAuthenticated && "pointer-events-none opacity-50"}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addBlog"
              className={({ isActive }) =>
                `hover:text-gray-800${
                  isActive ? "text-black font-bold underline" : ""
                } ${!isAuthenticated && "pointer-events-none opacity-50"}`
              }
            >
              Add Blog
            </NavLink>
          </li>
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `hover:text-gray-800${
                      isActive ? "text-black font-bold underline" : ""
                    } ${!isAuthenticated && "pointer-events-none opacity-50"}`
                  }
                >
                  Users
                </NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="flex items-center justify-center align-middle text-gray-800">
        {isAuthenticated ? (
          <>
            <div className="flex gap-2">
              <NavLink
                to="/profile"
                className="hover:text-black p-2 btn-color border rounded-md"
              >
                Profile
              </NavLink>
              <NavLink
                to="/"
                onClick={handleLogout}
                className="hover:text-black p-2 btn-color border rounded-md"
              >
                Log Out
              </NavLink>
            </div>
            <img src=".././Imgs/signout.png" alt="" />
          </>
        ) : (
          <>
            <div className="flex gap-1">
              <NavLink
                to="/signin"
                className="hover:text-black p-2 btn-color border rounded-md"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="hover:text-black p-2 btn-color border rounded-md"
              >
                Sign Up
              </NavLink>
            </div>
            <img src=".././Imgs/signin.png" alt="" />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
