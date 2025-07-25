import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"


const BASE_URL=import.meta.env.VITE_API_BASE_URL


export const useAuthStore =create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,

    isUpdatingProfile:false,

    isCheckingAuth:true,

    onlineUsers:[],

    socket:null,

    checkAuth:async () => {
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket()
        } catch (error) {
            console.log("Error in ChecckAuth",error);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async (data) => {
        set({isSigningUp:true});

        try {
            const res=await axiosInstance.post("/auth/signin",data);
            set({authUser:res.data});
            toast.success("Account Created Successfully");
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false})
        }
    },


    logout:async () => {
        try {
            await axiosInstance.post("/auth/logut");
            set({authUser:null});
            toast.success("Logged Out Successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.message.data.response);
        }
    },

    login:async (data) => {
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged In Successfully");
            get().connectSocket()

        } catch (error) {
            console.log("Login Error:", error); // optional for debug
            toast.error(error.response?.data?.message || "Login failed");   
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile:true});
        try {
            const res=await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile Updated Sucessfully");
        } catch (error) {
            console.log("error in update profile",error);
            toast.error(error.respons.data.message);
            
        }
        finally{
        set({isUpdatingProfile:false});
        }
    },


    connectSocket:()=>{
        const{authUser}=get();
        if(!authUser || get.socket?.connected) return;

        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id,
            },
            withCredentials:true,
        })
        socket.connect();
        socket.on("getOnlineUsers",(userIds)=>{
             
            set({onlineUsers:userIds}); 
        });

        set({socket:socket});
    },

    disconnectSocket:()=>{
        if( get().socket?.connected ){
            get().socket.disconnect();
        } 
            
    },
}))