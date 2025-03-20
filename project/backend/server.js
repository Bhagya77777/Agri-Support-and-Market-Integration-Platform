const dotenv=require("dotenv");
dotenv.config();


const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");



const app = express();

app.use(cors())

app.use(express.json())


const mongoURL = process.env.MONGODB_URL;



mongoose.connect(mongoURL).then(
    ()=>{
        console.log("Mongo DB Connected!")

        app.listen(5000, ()=>{
            console.log("Server Listenning...")
        })
    }

    
).catch((e)=>{
console.log(e)
})
