const express = require("express");

const blogControllers = require("../controllers/post-controllers");
const guardRoute = require("../middlewares/auth-protection-middleware");
const guardAdminRoute = require("../middlewares/admin-protection-middleware");

const router = express.Router();

router.get("/", blogControllers.getHome);

router.get("/admin", guardAdminRoute, blogControllers.getAdmin);

router.use(guardRoute);

router.get("/profile", blogControllers.getProfile);

router.post("/posts", blogControllers.createPost);

router.get("/posts/:id/edit", blogControllers.getSinglePost);

router.post("/posts/:id/edit", blogControllers.updatePost);

router.post("/posts/:id/delete", blogControllers.deletePost);

module.exports = router;
