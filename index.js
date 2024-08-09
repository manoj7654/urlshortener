const express=require("express");

const app=express();


const {connection}=require("./config/db");
require("dotenv").config()


const cors=require("cors");
const { userRouter } = require("./routes/userRouter");
const { urlRouter } = require("./routes/urlRouter");
const swaggerRouter = require("./swagger");

app.use(express.json());
app.use(cors());
// app.use(express.static("public"));

// app.use("/",(req,res)=>{
//     res.json({"message":"Welcome to the url shortner api"})
// })
app.use("/",userRouter)
app.use("/",urlRouter)
app.use(swaggerRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Database connected")
    } catch (error) {
        console.log("Getting error while connecting database")
    }

    console.log(`Server is running on port no ${process.env.port}`)
})