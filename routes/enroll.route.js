import { Router } from "express";
import { 
      enrollStudent,
      MarkAttendance
} from "../controllers/enroll.controllers.js";


const enrollRouter = Router();


// Enrollment route
enrollRouter.post('/enroll', enrollStudent);


// Attendance routes
enrollRouter.post('/attendance/mark', MarkAttendance);

export default enrollRouter;
