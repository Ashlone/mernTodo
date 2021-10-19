//importing required modules
const router = require("express").Router();

//importing controllers
const {
  registerUser,
  loggingInUser,
} = require("../controllers/userController");

//Registration
router.post("/register", registerUser);
router.post("/login", loggingInUser);
module.exports = router;
