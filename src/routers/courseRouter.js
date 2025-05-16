const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(authController.authorization(["ADMIN"]), courseController.createCourse);

router
  .route("/:idCourse")
  .get(courseController.findCourseById)
  .patch(authController.authorization(["ADMIN"]), courseController.updateCourse)
  .delete(
    authController.authorization(["ADMIN"]),
    courseController.deleteCourse
  );

module.exports = router;
