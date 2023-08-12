const http = require('http');
const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./database/db');
const cloudinary = require('cloudinary');

dotenv.config({
    path: "config/.env"
})

const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';

const server = http.createServer(app);

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

server.listen(PORT, HOST, () => {
    console.log(`Server is running on ${PORT}`);
});