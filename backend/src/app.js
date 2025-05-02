import express from 'express'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { messageRouter } from './routes/message.route.js'
import path from 'path'
import { app } from './utils/socket.js'
dotenv.config({
    path:'./.env'
})
 app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
const __dirname = path.resolve()
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(___dirname, "../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_-dirname,"../frontend","dist","index.html"))
    })
}
conn
 app.use(express.json({limit: "10mb"}))
 app.use(express.urlencoded({extended: true, limit: "10mb"}))
 app.use(cookieParser())
 app.use('/api/auth',authRouter)
 app.use('/api/messages',messageRouter)
 export {app}
 