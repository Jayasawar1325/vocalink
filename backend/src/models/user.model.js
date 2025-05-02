import mongoose,{Schema} from 'mongoose'
const userModel = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String, 
        required:true,
    },
    password:{
        type:String, 
        required:true,
        minLength:6
    },
    profilePic:{
        type:String,
        default:''
    }
},{timestamps:true})
export const User = mongoose.model('User',userModel)