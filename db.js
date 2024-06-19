const mongoose=require("mongoose")
require("dotenv").config()
//define mongodb url locally
// const mongoURL="mongodb://localhost:27017/hotels"

//define mongo url on atlas

// const mongoURL="mongodb+srv://yuvipradhan2002:qazwsxedc123@cluster0.fm5tkg1.mongodb.net/"

//set up mongodb connecttion

const mongoURL=process.env.MONGODB_URL

mongoose.connect(mongoURL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)

const db=mongoose.connection

db.on("connected",()=>
{
    console.log("MongoDb connected")
})
db.on("disconnected",()=>
{
    console.log("MongoDb disconnected")
})
db.on("error",(err)=>
{
    console.log("MongoDb connection error: ",err)
})

module.exports=db;