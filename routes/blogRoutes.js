const express = require('express');
const router = express.Router();
const { createBlogValidation, getAllBlogsValidation, getSingleBlogValidation, deleteSingleBlogValidation, 
updateSingleBlogValidation } = require('../validator/blogValidation');
const { createBlog, getAllBlogs, getSingleBlog, deleteSingleBlog, updateSingleBlog } = require('../controller/blogController');
const checkAuth = require('../middleware/checkAuth');

router.get('/posts', getAllBlogsValidation, getAllBlogs); // Get All Blogs.
router.get('/posts/:id', getSingleBlogValidation, getSingleBlog); // Get Single Blog associated with id.
router.post('/posts', checkAuth, createBlogValidation, createBlog); // Create Blog.
router.delete('/posts/:id', checkAuth, deleteSingleBlogValidation, deleteSingleBlog); // Delete Blog associated with id.
router.put('/posts/:id', checkAuth, updateSingleBlogValidation, updateSingleBlog); // Update Blog associated with id.

module.exports = router;