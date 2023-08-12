const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(fileUpload());

// Import Routes
const blog = require("./routes/blogRoutes");
const user = require("./routes/userRoutes");

app.use('/api', blog);
app.use('/api', user);

module.exports = app;