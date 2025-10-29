import mongoose from "mongoose";
import { DB_URL } from "../config/env.js";

// The async function to connect to the database
export const ConnectDb = async () =>{
 
      try{
            await mongoose.connect(DB_URL)
            console.log("Mongodb connected successfully");
      } catch(error){
            console.log("Error in Mongodb connection", error);
      }

}

