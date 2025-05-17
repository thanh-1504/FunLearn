const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must be at most 50 characters"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Email is not valid"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
    minlength: [5, "Password must be at least 5 characters"],
    maxlength: [20, "Password must be at most 20 characters"],
  },
  passwordConfirm: {
    type: String,
    select: false,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password confirm must be the same as password",
    },
  },
  role: {
    type: String,
    trim: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

// Hash password trước khi lưu vào database
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Check password của user với password đã hash của user được lưu trong database
userSchema.methods.correctPassword = (userPassword, hashPassword) => {
  return bcrypt.compare(userPassword, hashPassword);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
