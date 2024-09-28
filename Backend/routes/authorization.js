import express from "express";
const router = express.Router();
import userModel from "../models/users.js";
import { generateJWT } from "../jwt.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get("/", (req, res) => {
  res.send("Authorization Page");
});

router.post("/signup", upload.single('photo'), async (req, res) => {
  try {
    const data = req.body;
    const newUser = new userModel(data);
    if (newUser.role === "admin") {
      const admin = await userModel.findOne({ role: "admin" });
      if (admin) {
        return res.status(400).json({message: "Admin already exists."});
      }
    }
    if(req.file){
      newUser.photo = {
        data: req.file.buffer,
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      }
    }
    const response = await newUser.save();
    if (!response) {
      return res.status(201).json("Error saving the user.");
    }
    console.log("User is saved to database.");
    const payload = {
      id: response.id,
    };
    const token = generateJWT(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const person = await userModel.findOne({ username: username });
    if(!person){
      return res.status(400).json("Invalid Username or Password.");
    }
    if(!(await person.comparePass(password))){
      return res.status(400).json("Invalid Username or Password.");
    }
    const payload = {
      id: person.id,
    };
    const token = generateJWT(payload);
    res.status(200).json({ user: person, token: token });
  } catch (error) {
    console.log("Error Occured", error);
    res.status(401).json({ err: error });
  }
});

export default router;
