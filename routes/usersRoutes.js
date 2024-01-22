const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middlewares/validateTokenHandler");
const {
  login,
  register,
  getUsers,
  getCurrentUser,
  getUserByUsername,
  deleteUserByUsername
} = require("../controllers/usersControllers");

router.route("/login").post(login);
router.route("/get-all").get(getUsers);
router.route("/register").post(register);
router.route("/current").get(validateTokenHandler, getCurrentUser);
router.route("/:username").get(validateTokenHandler, getUserByUsername).delete(deleteUserByUsername);

module.exports = router;
