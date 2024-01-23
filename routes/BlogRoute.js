const BlogController = require("../controllers/BlogController");
const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");

// show for all users
route.get("/show", BlogController.Show);

// create blog
route.post("/add", verifyToken, BlogController.addBlog);

//delete blog
route.delete("/:id", verifyToken, BlogController.DeleteBlog);
// edit blog
route.patch("/:id", verifyToken, BlogController.Edit);
// search blog
route.get("/searchTitle/:search", verifyToken, BlogController.SearchByTitle);
route.get("/searchAuthor/:search", verifyToken, BlogController.SearchByAuthor);

// mid
function verifyToken(req, res, next) {
  // get auth header val
  const authHeader = req.headers["authorization"];
  // check of undifined
  if (typeof authHeader !== "undefined") {
    const auth = authHeader.split(" ");
    const authToken = auth[1];
    req.token = authToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = route;
