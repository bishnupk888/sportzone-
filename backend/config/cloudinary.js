const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name:sportzone-sportsapp,
    api_key :process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true,
})


// CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@sportzone-sportsapp