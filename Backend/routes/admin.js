import express from "express";
import { jwtAuthMiddleware } from "../jwt.js";
import userModel from "../models/users.js";
const router = express.Router();

const checkAdmin = async (userID) => {
  try {
    const person = await userModel.findById(userID);
    return person.role === "admin";
  } catch (error) {
    return false;
  }
};

router.get("/show/users", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    if (!(await checkAdmin(userData.id))) {
      return res.status(403).json("No Access Granted.");
    }
    const response = await userModel.find({role: {$ne : "admin"}});
    if (!response) {
      return res.status(400).json("Error Finding Users.");
    }
    const usersWithPhotos = response.map((user) => {
      let photo = null;
      if (user.photo && user.photo.data) {
        photo = `data:${
          user.photo.contentType
        };base64,${user.photo.data.toString("base64")}`;
      }
      return {
        ...user.toObject(),
        photo: photo,
      };
    });
    res.status(200).json({users: usersWithPhotos});
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

router.delete("/delete/:user", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.userPayload;
    if (!(await checkAdmin(userData.id))) {
      return res.status(403).json("No Access Granted.");
    }
    const response = await userModel.findByIdAndDelete(req.params.user);
    if (!response) {
      return res.status(400).json("Error Deleting User.");
    }
    res.status(200).json({response: response});
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

export default router;
