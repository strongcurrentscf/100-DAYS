const Post = require("../models/post");
const validationSession = require("../util/validation-session");
const sessionValidation = require("../util/validation-session");
const validation = require("../util/validation");

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

  let sessionErrorData = sessionValidation.getSessionErrorData(req, {
    title: "",
    content: "",
  });

  res.render("admin", {
    posts: posts,
    inputData: sessionErrorData,
    csrfToken: req.csrfToken(),
  });
}

async function getProfile(req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const posts = await Post.fetchAll();

  let sessionErrorData = sessionValidation.getSessionErrorData(req);

  res.render("profile", {
    posts: posts,
    inputData: sessionErrorData,
    csrfToken: req.csrfToken(),
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect("/profile");
      }
    );

    return;
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
  const post = new Post(null, null, req.params.id);
  await post.fetch();

  if (!post.title || !post.content) {
    res.status(404).render("404");
    return;
  }

  let sessionErrorData = sessionValidation.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render("single-post", {
    post: post,
    inputData: sessionErrorData,
    csrfToken: req.csrfToken(),
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;
  const postId = req.params.id;

  if (!validation.postIsValid(enteredTitle, enteredContent)) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );

    return;
  }

  const post = new Post(enteredTitle, enteredContent, postId);
  post.save();

  res.redirect("/profile");
}

async function deletePost(req, res) {
  const post = new Post(null, null, req.params.id);
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
