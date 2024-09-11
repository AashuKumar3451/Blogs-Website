import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phone: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);
    this.password = hashedPass;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePass = async function (candidatePass) {
  try {
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

userSchema.methods.compareUsername = function (candidateUsername) {
  try {
    return this.username === candidateUsername ? true : false;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
