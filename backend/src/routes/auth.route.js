import { Router } from "express";
import { checkAuth, signin, signout, signup, updateProfile } from "../controller/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";
const authRouter = Router()
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.post('/signout',signout)
authRouter.put('/update-profile',protectedRoute,updateProfile)
authRouter.get('/check',protectedRoute,checkAuth)
export {authRouter}