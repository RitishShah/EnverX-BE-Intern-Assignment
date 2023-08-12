const Blog = require("../models/blogModel");
const utils = require("../utils/response");
const cloudinary = require('cloudinary');

exports.createBlog = async (req, res) => {
    try {
        const isFilePresent = req.files;

        if(isFilePresent) {
            let files = req.files.images;
            let imagesArr = [];
            if(files.length > 0) {
                imagesArr = files;
            } else {
                imagesArr.push(files);
            }
            let imagesLinks = [];
            for(let i=0;i<imagesArr.length;i++) {
                const realData = `data:image/jpeg;base64,${imagesArr[i].data.toString('base64')}`;
                console.log(imagesArr[i]);
                const result = await cloudinary.v2.uploader.upload(realData, {
                    folder: "BlogImages",
                    resource_type: "auto",
                });

                console.log("Image Link Model", result);
            
                imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
                });
            }
            console.log("IMages Links", imagesLinks);
            req.body.images = imagesLinks;
        }

        console.log("Whole Object", req.body);
        const blog = await Blog.create(req.body);
        utils.response(res, 'success', "Blog Created Successfully", blog, 201);
    } catch (error) {
        utils.response(res, 'fail', "Something went wrong", error.message, 400);
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        utils.response(res, 'success', "All Blogs Fetched Successfully", allBlogs, 200);
    } catch (error) {
        utils.response(res, 'fail', "Something went wrong", error, 400);
    }
};

exports.getSingleBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if(!blog) {
            return utils.response(res, 'fail', "Blog is not found with this id", null, 404);
        }
        utils.response(res, 'success', "Blog is found with this Id", blog, 200);
    } catch (error) {
        utils.response(res, 'fail', "Something went wrong", error, 400);
    }
};

exports.deleteSingleBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if(!blog) {
            return utils.response(res, 'fail', "Blog is not found with this id", null, 404);
        }

        if(blog.images.length > 0) {
            for(let i=0;i<blog.images.length;i++) {
                await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
            }
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);
        utils.response(res, 'fail', "Blog is deleted Successfully", deletedBlog, 200);
    } catch(error) {
        utils.response(res, "Something went wrong", error, 400);
    }
};

exports.updateSingleBlog = async (req, res) => {
    try { 
        const id = req.params.id;
        const blog = await Blog.findById(id);
        console.log("BLOG", blog);
        if(!blog) {
            return utils.response(res, 'fail', "Blog is not found with this id", null, 404);
        }

        console.log("len", blog.images.length);

        if(blog.images.length > 0) {
            let len = blog.images.length;
            for(let i=0;i<len;i++) {
                await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
            }
            blog.images = [];
        }

        const isFilePresent = req.files;
    
        if(isFilePresent) {
            let files = req.files.images;
            console.log("Filesssss", files);

            let newImagesArr = [];

            if(Array.isArray(files)) {
                newImagesArr = files;
            } else {
                newImagesArr.push(files);
            }

            console.log("new IMage arr" , newImagesArr);

            let imagesLinks = [];
            for(let i=0;i<newImagesArr.length;i++) {
                const realData = `data:image/jpeg;base64,${newImagesArr[i].data.toString('base64')}`;
                console.log(newImagesArr[i]);
                const result = await cloudinary.v2.uploader.upload(realData, {
                    folder: "BlogImages",
                    resource_type: "auto",
                });
            
                imagesLinks.push({
                  public_id: result.public_id,
                  url: result.secure_url,
                });
            }
            req.body.images = imagesLinks;
        }

        req.body.lastUpdatedDate = Date.now();
        await Blog.findByIdAndUpdate(id, req.body);
        const updatedProduct = await Blog.findById(id);
        utils.response(res, 'success', "Blog Updated Successfully", updatedProduct, 200);
    } catch(error) {
        utils.response(res, 'fail', "Something went wrong", error.message, 400);
    }
}