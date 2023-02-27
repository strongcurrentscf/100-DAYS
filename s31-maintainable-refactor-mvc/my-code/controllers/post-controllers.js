const mongodb = require("mongodb");
const db = require("../data/database");
const Post = require("../models/post");
const ObjectId = mongodb.ObjectId;

function getHome(req, res) {
  res.render("welcome", { csrfToken: req.csrfToken() });
}

async function getAdmin(req, res) {
  if (
    !res.locals.isAuth ||
    !res.locals.isAdmin ||
    res.locals.isAdmin === false
  ) {
    return res.status(403).render("403");
  }

  const posts = await Post.fetchAll();

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
}

async function getProfile(req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const posts = await db.getDb().collection("posts").find().toArray();

  res.render("profile", {
    posts: posts,
    csrfToken: req.csrfToken(),
  });
}

async function createPost(req, res) {
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

    res.redirect("/profile");
    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const post = new Post(enteredTitle, enteredContent);
  await post.save();

  if (req.session.user.isAdmin) {
    res.redirect("/admin");
    return;
  }

  res.redirect("/profile");
  return;
}

async function getSinglePost(req, res) {
  const post = new Post(null, null, new ObjectId(req.params.id));
  await post.fetch();

  if (!post.title || !post.content) {
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
}

async function updatePost(req, res) {
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

  const post = new Post(enteredTitle, enteredContent, postId);
  post.save();

  res.redirect("/profile");
}

async function deletePost(req, res) {
  const post = new Post(null, null, new ObjectId(req.params.id));
  await post.delete();

  res.redirect("/profile");
}

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  getProfile: getProfile,
  createPost: createPost,
  getSinglePost: getSinglePost,
  updatePost: updatePost,
  deletePost: deletePost,
};
