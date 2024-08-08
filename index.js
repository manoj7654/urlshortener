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
app.use(express.static("public"));

// Route for the base API endpoint "/"
// app.get("/", (req, res) => {
//     // This will serve index.html from the 'public' folder
//     res.sendFile(__dirname + "/public/index.html");
// });
// app.use("/tasks",taskRouter)
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