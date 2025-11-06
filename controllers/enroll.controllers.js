import mongoose from "mongoose";
import Enroll from "../models/enroll.model.js"; 




export const enrollStudent = async (req, res, next) =>{
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
            const {firstname,lastname, email,phoneNumber,gender, track,} = req.body;
            if(!firstname || !lastname || !email || !phoneNumber || !gender || !track){
                  return res.status(400).json({message: "All fields are required"});
            }
            
            const existingEnroll = await Enroll.findOne({email}).session(session);
            if(existingEnroll){
                  return res.status(400).json({message: "Student already enrolled"});
            }
            const newEnroll = await Enroll.create([{firstname,lastname, email,phoneNumber,gender, track,}], {session});  
            await session.commitTransaction();
            session.endSession();
            return res.status(201).json({
                  message: "Student enrolled successfully",
                  enroll: newEnroll
            });

      } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({message: "Something went wrong", error: error.message})
      }
}


