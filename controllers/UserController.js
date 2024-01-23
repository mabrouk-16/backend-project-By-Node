const User = require("../models/User");
const jwt = require("jsonwebtoken");
//
const Register = async (_name, _email, _password, _age) => {
  try {
    let data = await User.create({
      userName: _name,
      email: _email,
      password: _password,
      age: _age,
    });
    data ? console.log("added successfully") : console.log(" failed");
  } catch (error) {
    console.log(error);
  }
};

const Login = async (_email) => {
  try {
    let data = await User.findOne({
      email: _email,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const GetAll = async () => {
  try {
    let data = await User.find(
      {},
      {
        userName: 1,
        _id: 1,
        email: 1,
        password: 1,
        age: 1,
        followers: 1,
        followings: 1,
      }
    );
    // data ? return data : console.log(" failed");
    return data;
  } catch (err) {
    console.log(err);
  }
};

const Follow = async (req, res) => {
  // let id = req.params.id;
  // console.log(req);
  // console.log(req.token);
  jwt.verify(req.token, "secret_Key", async (err, authData) => {
    authData = jwt.decode(req.token);
    console.log(authData._id);
    console.log(req.params.id);
    if (err) {
      res.sendStatus(403);
    } else {
      let data = await User.findByIdAndUpdate(authData._id, {
        $push: { followers: req.params.id },
      });
      let Back = await User.findByIdAndUpdate(req.params.id, {
        $push: { followings: authData._id },
      });
      console.log(User);
      data
        ? res.send(`${req.params.id} had followed ${authData._id}`)
        : res.send("fail");
    }
  });
};
//


module.exports = { Register, Login, GetAll, Follow };
