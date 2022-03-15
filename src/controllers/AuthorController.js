
// const authorModel= require("../model/AuthorModel");
const { status } = require("express/lib/response");
const { restart } = require("nodemon");
const AuthorModel = require("../models/AuthorModel");

const createAuthor= async function(req, res){
    try{
        const data=req.body;
        let email = req.body.email;
        if(!data) {
            // res.send("Author info is needed...!!")
            // console.log("Author info is needed...!!")
           return res.status(400).send({status: false, message: 'Invalid request parameters. Please provide author details'})
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        
            return status(406).send({status: false, message: "Invalid EmailId..!!"})
        
        const Author= await AuthorModel.create(data);
        res.send(Author);
    }
    catch(err)
    {
        res.send(err);
        console.log(err);
        res.status(500).send({status: false, message: err.message});
    }
}


module.exports.createAuthor= createAuthor
