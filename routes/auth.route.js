import { Router } from "express";
import { Signin, Signup } from "../controllers/auth.controllers.js";


const authRouter = Router();

authRouter.post('/signup', Signup);

authRouter.get('/signin', Signin)


export default authRouter;