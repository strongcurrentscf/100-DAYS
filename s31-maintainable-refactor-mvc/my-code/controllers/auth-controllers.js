const bcrypt = require("bcryptjs");

const db = require("../data/database");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

function getSignup(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req, {
    title: "",
    content: "",
  });

  res.render("signup", {
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
}

function getLogin(req, res) {
  let sessionInputData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
}

async function createUser(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;
  const inputData = { enteredEmail, enteredConfirmEmail, enteredPassword };

  if (!validation.signupInputIsValid(inputData)) {
    // let errorLog = validationSession.getSignupErrorData(inputData);

    // req.session.inputData = errorLog;

    req.session.inputData = validationSession.getSignupErrorData(inputData);

    req.session.save(function () {
      res.redirect("signup");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    errorLog.message = "User already exists!";

    req.session.inputData = errorLog;

    req.session.save(function () {
      res.redirect("signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
    isAdmin: false,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("login");
}

async function authenticateUser(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return;
  }

  if (existingUser.isAdmin) {
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    };
    req.session.isAuthenticated = true;
    req.session.save(function () {
      res.redirect("/admin");
    });
    return;
  }

  req.session.user = {
    id: existingUser._id,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/profile");
  });
}

function exitUser(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  req.session.csrfToken = req.csrfToken();

  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  createUser: createUser,
  authenticateUser: authenticateUser,
  exitUser: exitUser,
};
