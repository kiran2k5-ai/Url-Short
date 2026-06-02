const express = require("express");
const router = express.Router();

console.log("AUTH ROUTES LOADED");

const {
    signup,
    login
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;