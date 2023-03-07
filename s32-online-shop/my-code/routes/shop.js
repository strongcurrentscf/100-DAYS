const express = require("express");

const router = express.Router();

const shopControllers = require("../controllers/shop-controllers");

router.get("/", shopControllers.getHome);

module.exports = router;
