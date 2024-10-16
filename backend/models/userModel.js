import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
  cartData:{type:Object,default:{}},
},{minimize:false})

const userModel = mongoose.model.user || mongoose.model("user",userSchema); //if the model is created then it uses first statement but if it not created then it create model.
export default userModel;
