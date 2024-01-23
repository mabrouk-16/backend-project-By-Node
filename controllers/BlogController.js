const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
// all blogs
const Show = async (req, res) => {
  try {
    let data = await Blog.find(
      {},
      {
        ID: 1,
        title: 1,
        body: 1,
        photo: 1,
        author: 1,
        tags: 1,
      }
    );
    res.json({
      blogs: data,
      msg: "all blogs",
    });
  } catch (error) {
    console.log(error);
  }
};
// add
const addBlog = async (req, res) => {
  jwt.verify(req.token, "secret_Key", (err, authData) => {
    authData = jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let { title, body, photo, tags } = req.body;
      console.log(req.body);
      let data = Blog.create({
        title,
        body,
        photo,
        author: authData._id,
        tags,
      });
      if (data == undefined) {
        res.send("posted faild ");
      } else {
        res.send("posted successfully ");
      }
    }
  });
};
// delete
const DeleteBlog = async (req, res) => {
  jwt.verify(req.token, "secret_Key", async (err, authData) => {
    authData = await jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let data = await Blog.find({ author: authData._id }, {});
      if (data[0]) {
        let item = await Blog.deleteOne({ _id: req.params.id });
        // res.send(data);
        console.log(item)
        res.send("succses");
        // res.json({
        //   blogs: item,
        //   msg: "all blogs",
        // });
      } else {
        res.send("user erorr ");
      }
    }
  });
};
// Update
const Edit = async (req, res) => {
  jwt.verify(req.token, "secret_Key", async (err, authData) => {
    authData = jwt.decode(req.token);
    if (err) {
      res.sendStatus(403);
    } else {
      let data = await Blog.find({ author: authData._id }, {});
      // res.json(data)
      if (data[0]) {
      // let { title, body, photo, tags } = req.body;
        let { title } = req.body;
        console.log(title)
        let item = await Blog.findOneAndUpdate(
          { _id: req.params.id },
          {
            title: title,
            // body: _body,
            // photo: _photo,
            // author: _author,
            // tags: _tags,
          }
        );
        console.log(item)
        res.send("succses");
        // res.send(item);
        // res.json({
        //   blogs: item,
        //   msg: "all blogs",
        // });
      } else {
        res.send("user erorr ");
      }
    }
  });
};
// search by title
const SearchByTitle = async (req, res) => {
  jwt.verify(req.token, "secret_Key", async (err, authData) => {
    authData = await jwt.decode(req.token);
    let sTitle = req.params.search;
    console.log(sTitle);
    if (err) {
      res.sendStatus(403);
    } else {
      let data = await Blog.find(
        { title: sTitle },
        {
          ID: 1,
          title: 1,
          body: 1,
          photo: 1,
          author: 1,
          tags: 1,
        }
      );
      res.json({
        blogs: data,
        msg: "all blogs",
      });
    }
  });
};
// search by author
const SearchByAuthor = async (req, res) => {
  jwt.verify(req.token, "secret_Key", async (err, authData) => {
    authData = await jwt.decode(req.token);
    let sAuthor = req.params.search;
    if (err) {
      res.sendStatus(403);
    } else {
      let data = await Blog.find({ author: sAuthor }, {});
      res.json({
        blogs: data,
        msg: "all blogs",
      });
    }
  });
};

// export
module.exports = {
  Show,
  addBlog,
  DeleteBlog,
  Edit,
  SearchByTitle,
  SearchByAuthor,
};
