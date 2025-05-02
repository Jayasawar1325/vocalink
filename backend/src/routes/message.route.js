import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controller/message.controller.js";
const messageRouter = Router()
messageRouter.get( '/users',protectedRoute,getUsersForSidebar)
messageRouter.get('/:id',protectedRoute,getMessages)
messageRouter.post('/send/:id',protectedRoute,sendMessage)

export {messageRouter}