import express from "express";
const router = express.Router();
import { jwtAuthMiddleware } from "../jwt.js";
import userModel from "../models/users.js";
import blogModel from "../models/blogs.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const checkAdmin = async (userID) => {
  try {
    const person = await userModel.findById(userID);
    return person.role === "admin";
  } catch (error) {
    return false;
  }
};

router.post(
  "/create",
  upload.single("thumbnail"),
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const userData = req.userPayload;
      const user = await userModel.findById(userData.id);
      const accUsername = user.username;
      if (await checkAdmin(userData.id)) {
        return res.status(403).json("Admin can not post blogs.");
      }
      const blogData = req.body;
      const blogPost = new blogModel(blogData);
      blogPost.accUsername = accUsername;
      if (req.file) {
        blogPost.thumbnail = {
          data: req.file.buffer,
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        };
      }
      const response = await blogPost.save();
      if (!response) {
        return res.status(201).json("Error saving the blog.");
      }
      res.status(200).json({ response: response });
    } catch (error) {
      console.log("Error Occured", error);
      res.status(401).json({ err: error });
    }
  }
);

router.get("/posts", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    const posts = await blogModel.find().sort({ title: "asc" });
    if (!posts) {
      return res.status(400).json("No Post available");
    }
    const postsWithThumbnails = posts.map((post) => {
      let photo = null;
      if (post.thumbnail && post.thumbnail.data) {
        photo = `data:${
          post.thumbnail.contentType
        };base64,${post.thumbnail.data.toString("base64")}`;
      }
      return {
        ...post.toObject(),
        thumbnail: photo,
      };
    });
    res.status(200).json({ posts: postsWithThumbnails });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

router.get("/:postID", jwtAuthMiddleware, async (req, res) => {
  try {
    const postID = req.params.postID;
    const post = await blogModel.findById(postID);
    if (!post) {
      return res.status(400).json("The post is no longer available.");
    }
    let photo = null;
    if (post.thumbnail && post.thumbnail.data) {
      photo = `data:${
        post.thumbnail.contentType
      };base64,${post.thumbnail.data.toString("base64")}`;
    }
    const postObject = {
      ...post.toObject(),
      thumbnail: photo
    };
    res.status(200).json({ post: postObject });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

router.put(
  "/edit/:blogID",
  jwtAuthMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      if (await checkAdmin(req.userPayload.id)) {
        return res
          .status(401)
          .json("Admin is not allowed to change the content inside the blog.");
      }
      const userData = req.userPayload;
      const user = await userModel.findById(userData.id);
      const username = user.username;
      const blogID = req.params.blogID;
      const updatedContent = req.body;
      const blog = await blogModel.findById(blogID);
      if (!blog) {
        return res.status(404).json("Blog Not Found.");
      }
      const blogUsername = blog.accUsername;
      if (username !== blogUsername) {
        return res
          .status(401)
          .json({ message: "User do not have access to edit." });
      }

      Object.assign(blog, updatedContent);
      if (req.file) {
        blog.thumbnail = {
          data: req.file.buffer,
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        };
      }

      const localDate = new Date();
      const localOffset = localDate.getTimezoneOffset() * 60000;
      const localDateString = new Date(localDate.getTime() - localOffset);
      blog.updatedDate = localDateString;

      await blog.save();
      res.status(200).json({ updatedBlog: blog });
    } catch (error) {
      console.log("Error Occured", error);
      res.status(401).json({ err: error });
    }
  }
);

router.delete("/delete/:blogID", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    const user = await userModel.findById(userData.id);
    const username = user.username;
    const blogID = req.params.blogID;
    const blog = await blogModel.findById(blogID);
    if (!blog) {
      return res.status(404).json("Blog Not Found.");
    }
    const blogUsername = blog.accUsername;
    if (await checkAdmin(req.userPayload.id)) {
      const response = await blogModel.findByIdAndDelete(blogID);
      if (!response) {
        return res
          .status(400)
          .json({ message: "Error Occured deleting the blog" });
      }
      return res
        .status(200)
        .json({ message: "Blog Deleted", response: response });
    }
    if (username !== blogUsername) {
      return res
        .status(401)
        .json({ message: "User do not have access to edit." });
    }

    await blogModel.deleteOne({ _id: blogID });
    res.status(200).json({ message: "Blog Deleted" });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

export default router;
