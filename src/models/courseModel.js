const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  name: String,
  chude: String,
  description: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
});
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
