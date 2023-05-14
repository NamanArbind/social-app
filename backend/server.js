const app=require("./app");
const { connectdb } = require("./config/database");
const cloudinary = require("cloudinary");

connectdb()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
app.listen(process.env.PORT ,()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`);
})