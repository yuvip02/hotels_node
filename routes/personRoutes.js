const express = require("express");
const router = express.Router();
const Person=require("./../models/person")
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body; //data coming from client to server using body parser

    //create instacne of person schema
    const newPerson = new Person(data);
    //or add manually like below
    // newPerson.name=data.name;

    //save new Person to database
    const response = await newPerson.save();
    res.status(200).json(response);
    // res.status(200).json({
    //     message:"Person added successfully",
    // })
  } catch (err) {
    res.status(500).json({
      error: "Internal server error lmao",
    });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "inalid work tyype" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error lmao" });
  }
});


router.put("/:id",async(req,res)=>
{
    try{
        const personId=req.params.id//extracts id from url
        const updatedPersonData=req.body//extracts data from body
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        });
        if(!response)
            {
                res.status(404).json({error:"Person not found"})
            }
    }
    catch(err)
    {
        console.log(err);
    res.status(500).json({ error: "Internal server error lmao" });
    }
})

router.delete("/:id",async(req,res)=>
{
    try{
        const personId=req.params.id
        const response=await Person.findByIdAndDelete(personId)
        console.log("deleted record")
        res.status(200).json({
            message:"deleted record"
        })
        if(!response)
            {
                res.status(404).json({error:"Person not found"})

            }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: "Internal server error lmao" });
    }
})
module.exports=router