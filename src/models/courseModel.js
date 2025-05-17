const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Course must have a name"],
    minlength: [3, "Course name must be at least 3 characters"],
  },
  chude: String,
  description: {
    type: String,
    default: "",
  },
  urlImageCourse: {
    type: String,
    trim: true,
    default: "",
    validate: [validator.isURL, "Url image is not valid"],
  },
  isComing: {
    type: Boolean,
    default: false,
  },
  courseDetail: [
    {
      name: {
        type: String,
        trim: true,
        required: [true, "Course detail name is required"],
      },
      urlCourse: {
        type: String,
        trim: true,
        required: [true, "Course detail URL is required"],
        validate: [validator.isURL, "Course detail URL is not valid"],
      },
    },
  ],
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
