//file-system is used to open and read files
const fs = require("fs");

//makes creating file paths robust
const path = require("path");

const express = require("express");
const uuid = require("uuid");

const resData = require("./util/restaurant-data");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//all incoming request that need a static file will be able to check project folder for the file.
app.use(express.static("public"));

//all incoming requests are checked for incoming data
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "index.html");
  //   res.sendFile(htmlFilePath);

  res.render("index");
});

app.get("/restaurants", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  //   res.sendFile(htmlFilePath);

  const restaurants = resData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;
  const restaurants = resData.getStoredRestaurants();

  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (!restaurant) {
    return res.status(404).render("404");
  }

  res.render("restaurant-detail", {
    restaurant: restaurant,
  });
});

app.get("/recommend", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  //   res.sendFile(htmlFilePath);

  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  //   res.sendFile(htmlFilePath);

  res.render("confirm");
});

app.get("/about", function (req, res) {
  //   const htmlFilePath = path.join(__dirname, "views", "about.html");
  //   res.sendFile(htmlFilePath);

  res.render("about");
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
