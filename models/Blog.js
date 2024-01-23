const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: Array,
  },
});
blogSchema.index({ title: 1});
blogSchema.index({  author: 1});
const Blog = mongoose.model("Blog", blogSchema);
// Blog.createIndexes({ title: 1, author: 1, tags: 1 });
module.exports = Blog;
