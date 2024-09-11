import express from "express";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";

import db from "./db.js";
import userModel from "./models/users.js";
import authRoutes from "./routes/authorization.js";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import adminRoutes from "./routes/admin.js";

const app = express();
dotenv.config({ path: "../.env" });
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("At home page");
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
