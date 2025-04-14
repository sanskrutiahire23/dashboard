require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sendEmail = require("./email");


const course=require('../Backend/Models/courses')

const app = express();

 
app.use(express.json());
app.use(cors());


app.post("/addsession", async (req, res) => {
    try {
        const { title, date, time, email } = req.body;

        // Send Email Notification
        await sendEmail(email, title, date, time);

        res.status(200).json({ message: "Session added and email sent!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add session" });
    }
});

app.post('/addcourse',async (req,res)=> {
    try{
        const {image,title,subtitle,rating}=req.body

        const currentcourse=new course({image,title,subtitle,rating})
        await currentcourse.save()
        res.status(200).json({currentcourse})
    } catch(error) {
        res.status(400).json({message:"Internal Server error"})
    }


})

app.get('/getcourse',async (req,res)=> {
    try{
        const courses=await course.find();
        res.status(200).json({courses})
    } catch(error) {
        res.status(400).json({message:"Internal Server error"})
    }
})

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI)

//   for connection states
mongoose.connection.on('connected', () => {
    console.log('Mongodb connected successfully');
});
