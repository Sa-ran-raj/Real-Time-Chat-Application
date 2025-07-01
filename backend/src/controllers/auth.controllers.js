import bcrypt from"bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signin =async (req,res)=>{
    const {fullName,email,password}=req.body  

    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"Make Sure all fields have been filled"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password Must Be at least 6 Characters"});
        }
        const user= await User.findOne({email});
        if(user) return res.status(400).json({message:"User already Exist please login"});
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser= new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })
        if(newUser){
            //generate jwt token here
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(200).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });

        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internall server Error"});
    }
}

export const login =async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });


    } catch (error) {
        console.log("Error in login Controller",error.message);
        res.status(500).json({message:"Internall Server Error"});
    }
}

export const logut =(req,res)=>{
     try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully"});
        console.log("looged out user");
     } catch (error) {
        console.log("Error in logut end point");
        res.status(500).json({message:"Internall server Error"});
     }
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId=req.user._id;
        if(!profilePic){
            return res.status(401).json({message:"Profile Pic is Require"});
        }
        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in update profile",error.message);
        res.status(500).json({message:"Internal Server error"});
    }
}

export const checkAuth=async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("3rror in check auth api",error.message);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}