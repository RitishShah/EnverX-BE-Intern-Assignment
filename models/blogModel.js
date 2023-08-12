const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },

    content: {
        type: String,
    },

    author: {
        type: String
    },

    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                require: true,
            }
        }
    ],

    category: {
        type: String,
    },

    publishDate: {
        type: Date,
        default: Date.now(),
    },

    lastUpdatedDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Blog', blogSchema);