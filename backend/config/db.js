// import mongoose from "mongoose";

// export const connectDB = async () =>{
//   await mongoose.connect('mongodb://localhost:27017/food-delivery').then(()=>console.log("DB Connected"))
// }

import mongoose from "mongoose";

export const connectDB = async () =>{
  await mongoose.connect('mongodb+srv://rutikshelavale88:plmnko09@cluster0.q5upc.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}

