
const express = require('express');
const router = express.Router();
const AuthorController = require("../controllers/AuthorController")
const BlogController = require("../controllers/BlogController")
const Middleware = require("../Middleware/auth")
const Middlewares=require("../Middleware/auth")

router.post("/authors", AuthorController.createAuthor);

router.post("/blogs", BlogController.createBlog);

router.get("/getblogs",  BlogController.getBlogs);

router.put("/updateBlogs/:blogId",Middleware.auth1,  BlogController.updateBlogs)

router.delete("/deleteBlogs/:blogId",Middlewares.auth1,  BlogController.deleteBlogs)

router.delete("/deleteByAddress",  BlogController.deleteByAddress);

router.post("/login", AuthorController.loginUser)

module.exports = router;