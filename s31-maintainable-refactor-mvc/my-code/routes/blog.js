const express = require("express");

const blogContorllers = require("../controllers/post-controllers");

const router = express.Router();

router.get("/", blogContorllers.getHome);

router.get("/admin", blogContorllers.getAdmin);

router.get("/profile", blogContorllers.getProfile);

router.post("/posts", blogContorllers.createPost);

router.get("/posts/:id/edit", blogContorllers.getSinglePost);

router.post("/posts/:id/edit", blogContorllers.updatePost);

router.post("/posts/:id/delete", blogContorllers.deletePost);

module.exports = router;
