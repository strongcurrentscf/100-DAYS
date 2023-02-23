const path = require("path");

const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const csrf = require("csurf");

const db = require("./data/database");
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(csrf());

app.use(async function (req, res, next) {
  const isAuth = req.session.isAuthenticated;
  const user = req.session.user;
  const csrfToken = req.session.csrfToken;
  // console.log(req.session);

  if (!user || !isAuth) {
    req.session.user = { isAdmin: false };
    return next();
  }

  const userDoc = await db
    .getDb()
    .collection("users")
    // .findOne({ _id: user.id });
    .findOne({ email: user.email });
  console.log(userDoc);

  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;
  res.locals.csrfToken = csrfToken;

  next();
});

app.use(blogRoutes);
app.use(authRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500", { csrfToken: req.csrfToken() });
  console.log(error);
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
