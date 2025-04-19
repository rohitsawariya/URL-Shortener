import mongoose from 'mongoose';
import { MONGO_URI } from './serverConfig.js';

async function  dbConnect(){
    try{
    await mongoose.connect(MONGO_URI);
    console.log("DB CONNECTED SUCCESSFULLY");
    
    }
    catch(err){
        console.log("server Error");
        console.error("error");
    }
} 
export default dbConnect;