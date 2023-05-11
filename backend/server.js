const app=require("./app");
const { connectdb } = require("./config/database");

connectdb()
app.listen(process.env.PORT ,()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`);
})