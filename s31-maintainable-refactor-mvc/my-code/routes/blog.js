const express = require("express");
const mongodb = require("mongodb");

const db = require("../data/database");
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome", { csrfToken: req.csrfToken() });
});

router.get("/admin", async function (req, res) {
  if (
    !res.locals.isAuth ||
    !res.locals.isAdmin ||
    res.locals.isAdmin === false
  ) {
    return res.status(403).render("403");
  }

  const posts = await db.getDb().collection("posts").find().toArray();

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: "",
      content: "",
    };
  }

  req.session.inputData = null;

  res.render("admin", {
    posts: posts,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});
// router.get("/admin", async function (req, res) {
//   const user = await db
//     .getDb()
//     .collection("users")
//     .findOne({ _id: req.session.user.id });

//   if (req.session.isAuthenticated && user.isAdmin) {
//     res.render("admin");
//   }
// });

router.get("/profile", async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const posts = await db.getDb().collection("posts").find().toArray();

  res.render("profile", {
    posts: posts,
    csrfToken: req.csrfToken(),
  });
});

router.post("/posts", async function (req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === "" ||
    enteredContent.trim() === ""
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    if (req.session.user.isAdmin) {
      res.redirect("/admin");
      return;
    }

    res.redirect("/profile");
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const newPost = {
    title: enteredTitle,
    content: enteredContent,
  };

  await db.getDb().collection("posts").insertOne(newPost);

  if (req.session.user.isAdmin) {
    res.redirect("/admin");
    return;
  }

  res.redirect("/profile");
  return;
});

router.get("/posts/:id/edit", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const post = await db.getDb().collection("posts").findOne({ _id: postId });

  if (!post) {
    res.status(404).render("404");
    return;
  }

  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: post.title,
      content: post.content,
    };
  }
  req.session.inputData = null;

  res.render("single-post", {
    post: post,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});

router.post("/posts/:id/edit", async function (req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;
  const postId = new ObjectId(req.params.id);

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === "" ||
    enteredContent.trim() === ""
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  }

  await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: postId },
      { $set: { title: enteredTitle, content: enteredContent } }
    );

  res.redirect("/profile");
});

router.post("/posts/:id/delete", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  await db.getDb().collection("posts").deleteOne({ _id: postId });

  res.redirect("/profile");
});

module.exports = router;
