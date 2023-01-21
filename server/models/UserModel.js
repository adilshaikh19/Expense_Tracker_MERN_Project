import mongoose from "mongoose";
const {Schema} = mongoose

const userScheme = new Schema({
    firstName: {type: String, required:['Required']},
    lastName: {type: String, required:['Required']},
    email: {type: String, required:['Required']},
    password: {type: String, required:['Required']},
    categories: [{ label: String, icon: String }]
    
},  
{
    timestamps:true
})

export default new mongoose.model("USerModel", userScheme)