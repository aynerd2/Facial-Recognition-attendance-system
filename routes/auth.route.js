import { Router } from "express";
import { Signin, Signup } from "../controllers/auth.controllers.js";


const authRouter = Router();

authRouter.post('/signup', Signup);

authRouter.post('/signin', Signin)


export default authRouter;