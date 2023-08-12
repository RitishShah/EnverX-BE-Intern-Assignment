const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const utils = require("../utils/response");

exports.createBlogValidation = (req, res, next) => {
    const body = req.body;
    let errorMsg = [];

    console.log("Req Files", body);

    let required_fields = ["title", "content", "category"];

    console.log(body['title']);

    for(let i=0;i<required_fields.length;i++) {
        if(!body[required_fields[i]]) {
            errorMsg.push(`Blog ${required_fields[i]} is required`);
        }
    }

    if(errorMsg.length > 0) {
        utils.response(res, 'fail', errorMsg, null, 400);
    }
    next();
};

exports.getAllBlogsValidation = (req, res, next) => {
    next();
};

exports.getSingleBlogValidation = (req, res, next) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return utils.response(res, 'fail', `${id} is not a valid mongoose Id`, null, 400);
    }
    next();
};

exports.deleteSingleBlogValidation = (req, res, next) => {
    const id = req.params.id;
    console.log("Deleted", id);
    if(!ObjectId.isValid(id)) {
        return utils.response(res, 'fail', `${id} is not a valid mongoose Id`, null, 400);
    }
    next();
};

exports.updateSingleBlogValidation = (req, res, next) => {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return utils.response(res, 'fail', `${id} is not a valid mongoose Id`, null, 400);
    }

    const body = req.body;
    let errorMsg = [];
    let required_fields = ['title', 'content', 'category'];

    for(let i=0;i<required_fields.length;i++) {
        if(!body[required_fields[i]]) {
            errorMsg.push(`Blog ${required_fields[i]} is required`);
        }
    }

    if(errorMsg.length > 0) {
        utils.response(res, 'fail', errorMsg, null, 400);
    }
    next();
}