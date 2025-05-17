const User = require("../models/userModel");
const catchAsync = require("../common/catchAsync");

// Xử lý đăng ký user
exports.signUp = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const isExisted = await User.findOne({ email });
  if (isExisted) throw new Error("User is existed !");
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });
  res.status(201).json({
    status: "success",
    newUser,
  });
});

// Xử lý đăng nhập
exports.signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new Error("Please enter emaill and password !");
  const user = await User.findOne({ email });
  const correctPassword = await user.correctPassword(password, user.password);
  if (!user || !correctPassword)
    throw new Error("Email or password is incorrect !");
  res.status(200).json({
    status: "success",
    user,
  });
});

// Phân quyền user
exports.authorization = (roles) => {
  return (req, res, next) => {
    const roleUser = req.body?.role?.toUpperCase() ?? "User";
    if (!roles.includes(roleUser))
      throw new Error("You don't have permission to perform this action");
    next();
  };
};
