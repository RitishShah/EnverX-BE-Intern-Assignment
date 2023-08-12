const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(fileUpload());

// Import Routes
const blog = require("./routes/blogRoutes");
app.use('/api', blog);

module.exports = app;