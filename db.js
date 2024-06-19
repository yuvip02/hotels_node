const mongoose=require("mongoose")

//define mongodb url
const mongoURL="mongodb://localhost:27017/hotels"

//set up mongodb connecttion

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