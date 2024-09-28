import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css"

function Footer() {
  return (
    <div className=" flex flex-col align-middle justify-start shadow-lg p-5 bg-cream">
      <div className="flex justify-start align-start">
        <div className="flex gap-2 justify-start align-middle w-auto">
          <Link to="/" className="hover:text-gray-700">
            <img src=".././Imgs/logo.jpeg" alt="Logo" className="max-w-16" />
          </Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `m-auto text-lg text-center font-bold hover:text-gray-800 ${
                isActive ? "text-gray-900" : ""
              }`
            }
          >
            Blog Sphere
          </NavLink>
        </div>
      </div>
      <div className="flex justify-between align-middle">
        <p className="text-start italic text-lg ">
          Empower Your Voice: Create, Share, and Connect with Ease
        </p>
        <div className="flex align-middle justify-center">
          <ul className="flex gap-4 align-middle justify-center m-auto">
            <li>
              <NavLink to="https://github.com/AashuKumar3451" target="_blank">
                <img src=".././Imgs/github.png" alt="github" />
              </NavLink>
            </li>
            <li>
              <NavLink to="https://www.instagram.com/thenameis_aashu/" target="_blank">
                <img src=".././Imgs/instagram.png" alt="instagram" />
              </NavLink>
            </li>
            <li>
              <NavLink to="https://www.facebook.com/profile.php?id=100078297591879" target="_blank">
                <img src=".././Imgs/facebook.png" alt="facebook" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-3"/>
      <p>© 2024 Ashesh Kumar, Inc. All rights reserved.</p>
    </div>
  );
}

export default Footer;
