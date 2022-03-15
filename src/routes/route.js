const express = require('express');
const router = express.Router();

const AuthorController= require("../controllers/AuthorController")
const BlogController= require("../controllers/BlogController")


router.get("/test-me", function (req, res) {
    res.send("Rishabh...!!")
})


// product route
router.post("/CreateAuthor", AuthorController.createAuthor)

router.post("/Blogs", BlogController.createBlog)

router.get("/getBlogs", BlogController.getDetails)

router.put("/UpdateBlogs/:blogId", BlogController.isModified)

router.delete("/blogs/:blogId", BlogController.isDelete)

router.delete("/Deleted", BlogController.deleteByQuery)


module.exports = router;
