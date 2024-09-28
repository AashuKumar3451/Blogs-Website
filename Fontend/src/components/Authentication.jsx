import React from "react";
import "../App.css"
import { useNavigate } from "react-router-dom";

function Authentication() {
    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault()
        navigate("/signup")
    }
    const handleSignin = (e) => {
        e.preventDefault()
        navigate("/signin")
    }

  return (
    <div className="h-screen my-2 p-3">
      <h1 className="text-center text-3xl font-semibold ">
        Welcome To Blog Sphere
      </h1>
      <h3 className="text-center text-2xl font-light">
        Choose A Method To Enter
      </h3>
      <div className="flex justify-center align-middle gap-10 mt-3">
        <button
          onClick={handleSignup}
          type="submit"
          className="p-2 btn-color border rounded-md "
        >
          Sign Up
        </button>
        <button
        onClick={handleSignin}
          type="submit"
          className="p-2 btn-color border rounded-md "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Authentication;
