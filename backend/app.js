const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")
// const cors=require("cors")
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit:"50mb", extended:true }))
app.use(cookieParser())
// app.use(cors())
if(process.env.NODE_ENV!=="production")
{
 require("dotenv").config({path: "backend/config/config.env"});
}
const postRoutes=require("./routes/post")
const userRoutes=require("./routes/user")
app.use("/api/",postRoutes)
app.use("/api/",userRoutes)

module.exports=app