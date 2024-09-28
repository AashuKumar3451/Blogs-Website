import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [thumbnailPic, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(null);
  const navigate = useNavigate();
  const { blogID } = useParams();
  const fetchBlog = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios
        .get(`/blog/${blogID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setTitle(response.data.post.title);
          setAuthor(response.data.post.author);
          setContent(response.data.post.content);
          setSummary(response.data.post.summary);
          setTags(response.data.post.tags);
          setTagInput(response.data.post.tags.join(" "));
          if (
            response.data.post.thumbnail &&
            response.data.post.thumbnail.data
          ) {
            const blob = new Blob(
              [new Uint8Array(response.data.post.thumbnail.data.data)],
              {
                type: response.data.post.thumbnail.contentType,
              }
            );
            const url = URL.createObjectURL(blob);
            setThumbnailURL(url);
          }
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const onFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };
  const handleAddBlog = async (e) => {
    e.preventDefault();
    let tagArray = [];
    let tags = tagInput.split(" ");
    for (let i = 0; i < tags.length; i++) {
      tagArray[i] = tags[i];
    }
    setTags((prev) => tagArray);

    const formData = {
      title,
      content,
      author,
      tags,
      thumbnail: thumbnailPic,
      summary,
    };
    
    try {
        const token = localStorage.getItem("token");

      await axios
        .put(`/blog/edit/${blogID}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert("Blog is edited successfully!");
        });
      navigate(`/blog/${blogID}`);
    } catch (error) {
      alert("Error Occured");
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="items-start my-10 mx-40 max-h-screen">
      <form
        className=" flex flex-col form-color shadow-2xl rounded px-8 py-10"
        onSubmit={handleAddBlog}
      >
        <div>
          <div className="mt-3">
            <label htmlFor="title">Title: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={title}
              type="text"
              required
              name="title"
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="author">Author: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              value={author}
              type="text"
              required
              name="author"
              id="author"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="tags">Tags: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              placeholder="Add spaces to differntiate between tags"
              value={tagInput}
              type="text"
              name="tags"
              id="tags"
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="content">Content: </label>
            <textarea
              className="border border-gray-500 p-1 w-full rounded-md"
              required
              value={content}
              name="content"
              id="content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="mt-3">
            <label htmlFor="content">Summary: </label>
            <textarea
              className="border border-gray-500 p-1 w-full rounded-md"
              value={summary}
              name="summary"
              id="summary"
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="mt-3">
            <label htmlFor="thumbnailPic">Thumbnail: </label>
            <input
              className="border border-gray-500 p-1 w-full rounded-md"
              type="file"
              name="thumbnailPic"
              id="thumbnailPic"
              accept="image/*"
              onChange={onFileChange}
            />
            {thumbnailURL && (
              <div className="mt-3">
                <a
                  href={thumbnailURL}
                  download="thumbnail"
                  className="underline text-blue-500"
                  target="_blank"
                >
                  Download Current Thumbnail
                </a>
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="mt-3 p-2 btn-color border rounded-md ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
