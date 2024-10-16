import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json()) //whenever we will get request from the frontend to backend that will be parsed using these jsx
app.use(cors()) //access backend from frontend

//db connection
connectDB()

//api end point
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req,res)=>{
  res.send("api working")
})
// get method is http method using that we can request data from server. 


app.listen(port,()=>{
  console.log(`Server started on http://localhost:${port}`)
})









//express 
//mongoose = connect with database
//jsonwebtoken = create authentication system
//bcrypt = encrypt the users data and store in db
//cors = give permission to frontend to connect with backend
//dotenv = use environment variable in project
// body-parser = parse the data coming through user
//multer = we can create images store system
//stripe = payment getways
//validator = check password or email id valid or not
//nodemon = restart server when we save data.

//folders
//config = store configuration files like database configuration.
//controllers = login for our backend
//uploads = uploads all images uploaded by user
//.env = environmental variables.
