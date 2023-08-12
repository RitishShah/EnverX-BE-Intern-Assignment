const express = require('express');
const { createBlogValidation, getAllBlogsValidation, getSingleBlogValidation, deleteSingleBlogValidation, 
updateSingleBlogValidation } = require('../validator/blogValidation');
const { createBlog, getAllBlogs, getSingleBlog, deleteSingleBlog, updateSingleBlog } = require('../controller/blogController');
const router = express.Router();

router.get('/posts', getAllBlogsValidation, getAllBlogs); // Get All Blogs.
router.get('/posts/:id', getSingleBlogValidation, getSingleBlog); // Get Single Blog associated with id.
router.post('/posts', createBlogValidation, createBlog); // Create Blog.
router.delete('/posts/:id', deleteSingleBlogValidation, deleteSingleBlog); // Delete Blog associated with id.
router.put('/posts/:id', updateSingleBlogValidation, updateSingleBlog); // Update Blog associated with id.

module.exports = router;