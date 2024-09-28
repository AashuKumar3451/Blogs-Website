import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { nanoid } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function IndividualBlog() {
  const { blogID } = useParams();
  const [blog, setBlog] = useState(null);
  const [accUsername, setAccUsername] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdminAvailable = useSelector(
    (state) => state.adminStatus.isAdminAvailable
  );

  const fetchBlog = async () => {
    try {
      await axios
        .get(`/blog/${blogID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlog(response.data);
          setAccUsername(response.data.post.accUsername);
        });
    } catch (error) {
      // alert("Error Occured");
      console.error("There was an error!", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      if (token) {
        await axios
          .get(`/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setProfileUsername(response.data.user.username);
          });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      } else {
        alert("Error Occured")
        console.error("There was an error!", error);
      }
    }
  };

  const deleteBlog = async () => {
    try {
      await axios
        .delete(`/blog/delete/${blogID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert("Blog is deleted successfully!");
          navigate("/blogs");
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogID]);
  useEffect(() => {
    fetchProfileData();
  });
  if (!blog) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between align-middle text-left items-center p-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold underline-custom">
            {blog.post.title}
          </h1>
          <h2 className="text-xl mt-1">Author: {blog.post.author}</h2>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <p>Publication: {blog.post.publicationDate}</p>
              <p>Last Updated On: {blog.post.updatedDate}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {blog.post.tags.map((tag) => (
              <h3
                className="border border-black px-1 rounded-md tag-color"
                key={nanoid()}
              >
                {tag}
              </h3>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <NavLink
            to={`/blog/edit/${blogID}`}
            className={({ isActive }) =>
              `hover:text-black p-2 px-4 btn-color border rounded-md
              ${
                accUsername === profileUsername
                  ? ""
                  : "pointer-events-none opacity-50"
              }`
            }
          >
            Edit
          </NavLink>
          <NavLink
            to="#"
            className={({ isActive }) =>
              `hover:text-black p-2 px-4 btn-color border rounded-md
              ${
                accUsername === profileUsername || isAdminAvailable
                  ? ""
                  : "pointer-events-none opacity-50"
              }`
            }
            onClick={deleteBlog}
          >
            Delete
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 items-start px-20">
        <div className="col-span-3">
          <p>{blog.post.content}</p>
        </div>
        {/* <div className="col-span-1">
          <img
            src={blog.post.thumbnail}
            alt="thumbnail"
            className="w-full h-auto object-contain"
          />
        </div> */}
      </div>
      <div>
        {blog.post.summary ? (
          <>
            <h3 className="underline-custom font-bold text-xl">Summary: </h3>
            <h3 className="text-xl mt-1 font-semibold">{blog.post.summary}</h3>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default IndividualBlog;
