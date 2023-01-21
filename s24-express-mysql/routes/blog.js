const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `
    SELECT posts.*, authors.name AS author_name FROM posts 
    INNER JOIN authors ON posts.author_id = authors.id
  `;
  const [posts] = await db.query(query);

  //   console.log(posts);

  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("SELECT * FROM blog.authors");

  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];

  await db.query(
    "INSERT INTO blog.posts (title, summary, body, author_id) VALUES (?)",
    [data]
  );

  //   console.log(data); //testing

  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const postId = req.params.id;

  const query = `
    SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
    INNER JOIN authors ON posts.author_id = authors.id
    WHERE posts.id = ${postId}
  `;
  const [[post]] = await db.query(query);

  if (!post) {
    return res.status(404).render("404");
  }

  console.log(post);

  res.render("post-detail", { post: post });
});
// router.get("/posts/:id", async function (req, res) {
//   const query = `
//         SELECT * FROM posts WHERE id = ?
//     `;

//   const [[post]] = await db.query(query, [req.params.id]);

//   console.log(post);

//   if (!post) {
//     return res.status(404).render("404");
//   }

//   res.render("post-detail", { post: post });
// });

router.get("/posts/:id/update", async function (req, res) {
  const postId = req.params.id;
  const query = `
    SELECT id, title, summary, body FROM blog.posts 
    WHERE posts.id = ${postId}
  `;
  const [[post]] = await db.query(query);

  console.log(post);

  res.render("update-post", { post: post });
});

router.post("/update-post/:id/edit", async function (req, res) {
  const postId = req.params.id;
  const [title, summary, content] = [
    req.body.title,
    req.body.summary,
    req.body.content,
  ];

  const query = `
    UPDATE blog.posts 
    SET title = "${title}", summary = "${summary}", body = "${content}"
    WHERE blog.posts.id = ${postId}
  `;
  await db.query(query);

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  const query = `DELETE FROM blog.posts WHERE id = ?`;

  await db.query(query, [req.params.id]);

  res.redirect("/posts");
});

module.exports = router;
