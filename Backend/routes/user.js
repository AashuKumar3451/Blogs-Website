import express from "express";
const router = express.Router();
import { jwtAuthMiddleware } from "../jwt.js";
import userModel from "../models/users.js";
import blogModel from "../models/blogs.js";

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    const person = await userModel.findById(userData.id);
    if (!person) {
      return res.status(404).json("User is not available anymore.");
    }
    let photo = null;
    if (person.photo && person.photo.data) {
      photo = `data:${
        person.photo.contentType
      };base64,${person.photo.data.toString("base64")}`;
    }
    res.status(200).json({
      user: {
        ...person.toObject(),
        photo: photo,
      },
    });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

router.put("/profile/username", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    const { currentUsername, newUsername } = req.body;
    const person = await userModel.findById(userData.id);
    if (!person) {
      return res.status(400).json("User is not available anymore. ");
    }
    if (!(await person.compareUsername(currentUsername))) {
      return res.status(401).json("Incorrect Current Username");
    }
    person.username = newUsername;
    await person.save();
    await blogModel.updateMany(
      { accUsername: currentUsername },
      { accUsername: newUsername }
    );
    console.log("Username Updated");
    res.status(200).json({ message: "Username Updated" });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    const { currentPass, newPass } = req.body;
    const person = await userModel.findById(userData.id);
    if (!person) {
      return res.status(400).json("User is not available anymore. ");
    }
    if (!(await person.comparePass(currentPass))) {
      return res.status(401).json("Incorrect Current Password");
    }
    person.password = newPass;
    await person.save();
    console.log("Password Updated");
    res.status(200).json("Password Updated");
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

export default router;
