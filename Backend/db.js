import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

const url = process.env.db_LOCAL;
console.log(url);

mongoose.connect(url)
 .then(() => {console.log(`Database running at ${url}`);})
 .catch((error) => {console.log("Error occured while connecting to database.", error);})

const db = mongoose.connection;
export default db;