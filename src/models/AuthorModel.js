const mongoose = require('mongoose');
const validator =require("validator");


const authorSchema = new mongoose.Schema(
{
    fname: {
        type: String,
        required: true
    },
    lname: {
        type:String,
        required: true
    },
    title: {
            type: String,
            required: true,
            enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
         type: String,
         required: true,
         unique:true,
         validator:function(email)
        { 
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        },
        password:{
            type: String,
            required: true
        }
    }

},{timestamps:true})

module.exports = mongoose.model('Createauthor', authorSchema) 