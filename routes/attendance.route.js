import { Router } from "express";
import { MarkAttendance } from "../controllers/attendance.controller.js";  


const attendanceRouter = Router();


attendanceRouter.post('/attendance/mark', MarkAttendance);

export default attendanceRouter;