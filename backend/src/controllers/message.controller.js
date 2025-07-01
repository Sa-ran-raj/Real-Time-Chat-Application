import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { io } from "../lib/socket.js";
export const getUserForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in  getUserSidebar route",error.message);
        res.status(500).json({message:"Internal Status Error"});
    }
};

export const getMessages =async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages= await Message.find({
            $or:[
                {senderId:myId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:myId}
            ]
        });
        res.status(200).json(messages); 

    } catch (error) {
        console.log("Error in  getMessages route",error.message);
        res.status(500).json({message:"Internal Status Error"});
    }
};

export const sendMessages=async(req,res)=>{
    try {
        const  {text,image}=req.body;
        const {id:reciverId}=req.params;

        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            reciverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();

        // todo socket io

        const reciverSocketId=getReceiverSocketId(reciverId);
        console.log("Sending socket message to:", reciverSocketId);
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in  send Message route",error.message);
        res.status(500).json({message:"Internal Status Error"});
    }
}