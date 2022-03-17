const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/AuthorModel")
const AlogsModel = require("../models/BlogModel");

//part1
const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let savedata = await AuthorModel.create(data);
        res.status(201).send({ status: true, msg: savedata })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const loginUser = async function (req, res) {
    try{
    let userName = req.body.emailId;
    let password = req.body.password;
    let author= await AuthorModel.findOne({ emailId: userName, password: password });
    if (!author)
      return res.send({
        status: false,
        msg: "username or the password is not corerct",
      });
      let token = jwt.sign({ authorId: author._id.toString() }, "Blog");

      res.status(201).send({ status: true, msg: "Succesfully LogedIn.Here is a access Token", token: token })
    }
    
    catch(error){
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
  }

module.exports.createAuthor = createAuthor;
module.exports.loginUser=loginUser;