const BlogModel= require("../models/BlogModel")
const AuthorModel = require("../models/AuthorModel");
const { createAuthor } = require("./AuthorController");


const createBlog =async function(req, res)
{
    const requestBody= req.body
    // console.log(blogData)
    
    const {AuthorId}= requestBody
    console.log(req.body)
    if(!requestBody)
    {
        res.status(400).send({status: false, message:"Blog not found..!!"})
    }
    // const AuthorId = req.body.AuthorId;
    // const AuthorId= req.body.ObjectId

    const author= await AuthorModel.findById({_id : AuthorId})
    // console.log(author)
    if(!author)
    {
        return res.status(404).send({status: false, message:"Author not present..!!"});
    }
    

    const newBlog= await BlogModel.create(requestBody);
    return res.status(200).send({status: true, message: newBlog})
    
}


//Get Details
const getDetails = async function (req, res)
{
    try 
    {
        const toFind = req.query

        const collection = await BlogModel.find({$and : [toFind, {isPublished:true}]})//(toFind)
        if (collection.length==0) 
        {
            res.status(400).send({ status: false, msg: "Not Found" })
        }
        console.log(collection)
        res.status(201).send({ status: true, message: collection })
    }
    catch (err) 
    {
        res.status(500).send({ status: false, msg: err.message })
    }
}


//Update
const isModified= async function(req,res)
{
    try
    {
        const blogId = req.params.blogId
        if(Object.keys(blogId).length==0)
        {
            res.status(404).send({status: false, message: "BlogId is needed..!!"})
        }
        const searchId = await BlogModel.find({_id:blogId}) 
        if(!searchId)
        {
            res.status(404).send({status: false, message: "No such Id found :( "})
        }
        console.log(searchId)
        res.send({status: true, message: searchId})
        
        const changeData = req.body
        const toUpdate = await BlogModel.findOneAndUpdate({_id: blogId}, {$set:{changeData}, new:true})

        console.log(searchId)
        res.send({mesage: searchId})
        toUpdate.isPublished= true
        toUpdate.isPublishedAt= Date
        toUpdate.save()
        res.status(200).send({status: true, message: "Changes Saved :)"})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({status: false, message: err.message})
    }
}


//Delete
const isDelete = async function(req, res)
{
    try
    {
        const blogId = req.params.blogId
        if(Object.keys(blogId).length==0)
        {
            console.log("Id not found :(")
            res.status(404).send({status: false, message: "Id not found :("})
        }
        const deletingData = await BlogModel.findOne({$and:[{_id:blogId}, {isDeleted: false}]})
        if(!deletingData)
        {
            console.log("Data not found :(")
            res.status(404).send({status:false, message: "Data not found :("})
        }
        const done= await BlogModel.updateOne({_id: blogId},{isDeleted: true})
        res.status(200).send({status: true, message: "Deleted :)"})
        console.log("Deleted :)")
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({status: false, message: err.mesage})
    }

}


//Deleted By Query
const deleteByQuery = async function(req, res)
{
    try
    {
        const authorId = req.query.AuthorId
        const category = req.query.category
        if (!authorId) 
        {
            res.status(400).send({status: false, msg: "AuthorId Required" })
        }
        if (!category) 
        {
            res.status(400).send({status: false, msg: "Category Required" })
        }
        const authorDetails = await AuthorModel.find({ _id: authorId })
        if (!authorDetails) 
        {
            res.status(404).send({status: false, msg: "AuthorId Not Exist" })
        } 
       
        const updateDetails = await BlogModel.updateMany({ authorId: authorId,     category: category }, { $set: { isDeleted: true } })
        updateDetails.deletedAt = Date()
        res.status(201).send({status: true, data: updateDetails })
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({status: false, message: err.mesage})
    }
}



module.exports.createBlog = createBlog
module.exports.getDetails = getDetails
module.exports.isModified = isModified
module.exports.isDelete = isDelete
module.exports.deleteByQuery = deleteByQuery