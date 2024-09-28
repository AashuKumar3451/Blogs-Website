import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async (e) => {
    try {
      const token = localStorage.getItem("token");
      axios
        .get("/blog/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setBlogs(response.data.posts);
        });
    } catch (error) {
      alert("Error Occured");
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="flex justify-center align-middle flex-wrap gap-7 p-2">
      {blogs.map((blog) => (
        <NavLink key={blog._id} to={`/blog/${blog._id}`}>
          <div
            className="flex flex-col border border-black p-4"
            style={{ maxWidth: "30rem", width: "25rem", height: "auto" }}
          >
            <div className="relative" style={{ paddingBottom: "70.25%" }}>
              <img
                src={blog.thumbnail}
                alt="thumbnail"
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
            <h1 className="text-lg font-bold">Title: {blog.title}</h1>
            <h2 className="text-lg">Author: {blog.author}</h2>
            <p>Summary: {blog.summary}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
}

export default Blogs;
