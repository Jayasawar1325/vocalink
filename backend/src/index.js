import { connectDB } from "./utils/mongodb.js";
import { app } from "./app.js";
import { server } from "./utils/socket.js";
 
connectDB()
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log('Mongodb connection failed: ',error)
})