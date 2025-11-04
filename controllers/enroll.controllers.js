import mongoose from "mongoose";
import Enroll from "../models/enroll.model.js"; 


// Helper function to prevent attendance marking on saturdays and Sundays
function isWeekend(date){
      const day = date.getDay()
      return day === 0 || day === 6
      // Sunday is 0, Saturday is 6
}

// Helper function to know the start of the day
function getStartOfDay(date){
      const start = new Date(date);
      start.setHours(0,0,0,0);
      return start
}

// Helper function to know end of the day
function getEndOfDay(date){
      const end = new Date(date);
      end.setHours(23,59,99,999);
      return end
}

// helper function to get working days range (MON - FRI)
const getWorkingDays = (startDate, EndDate)=>{
      const workingDays = [];
      const current = new Date(startDate)
      while(current <= EndDate){
            if (!isWeekend(current)){
                  workingDays.push(new Date(current))
            }
            current.setDate(current.getDate() + 1)
      }
      return workingDays;
}




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


export const markAttendDance = async (req,res,next)=>{
      try {
            const {email} = req.body;

            // check for empty input
            if(!email){
                  return res.status(400).json({message: "Email required!"})
            }

            // Validation - check if student enrolled
            const student = await Enroll.findOne({email});

            if(!student){
               return res.status(400).json({message: "Student not found!"})   
            }

            const today = new Date()
            console.log("Todays Date: ", today)

            // check if today is weekend
            if(isWeekend(today)){
                  return res.status(400).json({message: "Attendance can not be marked on weekends"})
            }

            // prevent student from marking attendance twice in a day
            // This means startOfDay is 0.00 midnight
            // This means endOfDay is 11.59pm today
            // So we are creating a time range that represents today Only!
            const startOfDay = getStartOfDay(today)
            const endOfDay = getEndOfDay(today)
            const allreadyMarked = student.attendance.some((record)=>{
                  const recordDate = new Date(record.date);
                  return recordDate >= startOfDay && recordDate <= endOfDay;
            })

            if(allreadyMarked){
                  return res.status(400).json({Message: "Attendance already marked!"})
            }

            // Mark the student present
            student.attendance.push({
                  date: today,
                  status: "present"
            })

            // save it 
            await student.save();
            return res.status(200).json({
                  message: "Attendance marked successfully!"
            })
         

      } catch (error) {

            return res.status(500).json({
                  message: "Something went wrong",
                  error: error.message
            })
            
      }
}


export const autoMarkabsence = async (req,res,next)=>{

}


export const getOverallAttendance = async (req,res,next)=>{

}

export const getAllStudentWithAttendance = async (req,res,next)=>{

}

export const getStudentAttandance = async (req,res,next)=>{

}