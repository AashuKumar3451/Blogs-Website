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
    res.status(200).json("User Deleted Successfully.");
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

export default router;
