const express = require("express");

const db = require("../data/database");

const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body["confirm-email"];
  const enteredPassword = await bcrypt.hash(req.body.password, 12);

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    console.log("INCORRECT DATA");
    return res.redirect("/signup");
  }

  const user = {
    email: enteredEmail,
    confirmEmail: enteredConfirmEmail,
    password: enteredPassword,
  };

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: user.email });

  if (existingUser) {
    console.log("USER EXISTS ALREADY!");
    return res.redirect("/signup");
  }

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  const user = {
    email: enteredEmail,
    password: enteredPassword,
  };

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: user.email });

  if (!existingUser) {
    return res.redirect("/login");
  }

  const matchingPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!matchingPassword) {
    return res.redirect("/login");
  }

  res.redirect("/admin");
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
