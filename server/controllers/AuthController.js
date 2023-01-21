import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";


const categories = [
  { label: "Travel", icon: "user" },
  { label: "Shopping", icon: "user" },
  { label: "Investment", icon: "user" },
  { label: "Bills", icon: "user" },
];


export const register = async (req, res) => {
    
    const {email, password, firstName, lastName} = req.body;

    const userExist = await UserModel.findOne({email})

    if(userExist){
        res.status(406).json({message: "User Already Exist"})
        return;
    }

    //hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    console.log(hashedPassword);

    const user = await UserModel({email,password: hashedPassword, firstName, lastName, categories});
    const saveUser = await user.save();
    console.log(saveUser);
   
    res.status(201).json({message: "User is created"})
}


export const login =  async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        res.status(406).json({ message: "credentials not found" });
        return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        res.status(406).json({ message: "credentials not found" });
        return;
    }


    //jwt token
    const payLoad =  {
        userName : email,
        _id: user._id,
    }
    const token = jwt.sign(payLoad ,process.env.JWT_SECRET)
    console.log(token)

    res.json({message : "succesfully logged in",token, user})
}