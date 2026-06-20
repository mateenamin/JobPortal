import mongoose from "mongoose";
import dotenv from 'dotenv';
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Yeh line aapke internet ke block ko bypass karegi

dotenv.config();

const DB_URL = process.env.DB_URL


const connectDB = async ()=>{
 
    try{
     await mongoose.connect(DB_URL)
      console.log('MongoDB Connected! ')
    }
    catch (error){
        console.log('Error:', error.message)
    }

}

export default connectDB