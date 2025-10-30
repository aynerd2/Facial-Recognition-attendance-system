import { Router } from "express";
import { enrollStudent } from "../controllers/enroll.controllers.js";


const enrollRouter = Router();

enrollRouter.post('/enroll', enrollStudent);

export default enrollRouter;
