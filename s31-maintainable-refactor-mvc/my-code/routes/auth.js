const express = require("express");

const authControllers = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/signup", authControllers.getSignup);

router.get("/login", authControllers.getLogin);

router.post("/signup", authControllers.createUser);

router.post("/login", authControllers.authenticateUser);

router.post("/logout", authControllers.exitUser);

module.exports = router;
