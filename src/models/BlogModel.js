const mongoose = require('mongoose');
const validator = require("validator");
const { createAuthor } = require('../controllers/AuthorController');
// const AuthorId = mongoose.Schema.Types.AuthorId

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },  
        AuthorId: {
            type: mongoose.Types.ObjectId,
            // required: true,
            ref: "CreateAuthor"
        },
        tags: [String],

        category: {
            type: String,
            required: true
        },
        subcategory: [String],

        isPublished: {
            type: Boolean
        },
        isPublishedAt: {
            type: Date
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        isDletedAt: {
            type: Date
        },
        isUpdatedAt: {
            type: Date
        },
    },{ timestamps: true })

module.exports= mongoose.model('Blog', BlogSchema)