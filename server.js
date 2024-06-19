const express=require("express")
const app=express();
const db=require("./db")
const Person=require("./models/person")
const MenuItem=require("./models/MenuItem")
const bodyParser=require("body-parser")

app.use(bodyParser.json())//middleware

app.get("/",function(req,res)
{
    res.send("hello world")
})

// app.get("/idli",function(req,res)
// {
//     let customized_idli={
//         name:"rava idli",
//         size:"10cm",
//         is_sambar:true,
//     }
//     res.send(customized_idli)
// })





//importing router for person realted 
const personRoutes=require('./routes/personRoutes')
app.use("/person",personRoutes)

const menuRoutes=require("./routes/menuRoutes")
app.use("/menu",menuRoutes)


//app starts server
app.listen(3000,()=>
{
    console.log("Server listening on port 3000")
})