const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const db = require("../data/database");

async function auth(req, res, next) {
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
    .findOne({ _id: new ObjectId(user.id) });
  //   console.log(userDoc);

  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;
  res.locals.csrfToken = csrfToken;

  next();
}

module.exports = auth;
