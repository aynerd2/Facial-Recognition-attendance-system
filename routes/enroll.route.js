import { Router } from "express";
import { enrollStudent } from "../controllers/enroll.controllers.js";


const enrollRouter = Router();


// Enrollment route
enrollRouter.post('/enroll', enrollStudent);



export default enrollRouter;
