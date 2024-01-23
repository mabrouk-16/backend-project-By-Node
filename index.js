const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;
const UserRoute = require("./routes/userRoute");
const BlogRoute = require("./routes/BlogRoute");
//
mongoose
  .connect("mongodb://127.0.0.1:27017/ITI")
  .then(() => {
    console.log("connect to mongoose");
  })
  .catch((e) => {
    console.log(e);
  });

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//
app.use("/users", UserRoute);
app.use("/blogs", BlogRoute);

// lestining
app.listen(port, () => console.log("server is lestining on port", port));
