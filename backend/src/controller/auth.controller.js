import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from "../models/user.model.js";
import { cloudinary } from "../utils/cloudinary.js";
const generateToken = async (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    res.cookie('jwt',token,{
        maxAge: 7 * 24*60*60*1024,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV !=='development'
    })
    return token

}
export const signup = asyncHandler(async(req,res)=>{
    const {fullName, email, password} = req.body;
    if(!(fullName && email && password)){
        throw new ApiError(400,'All fields are required')
    }
    if(password.length<6){
        throw new ApiError(400,'Password length must be greater than 6')
    }
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new ApiError(400,'User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        fullName, 
        email,
        password:hashedPassword
    });
    await newUser.save();
    generateToken(newUser._id, res);
    res.status(201)
    .json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
    })

})
export const signin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(400,'Invalid credentials')
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        throw new ApiError(400,'Invalid credentials')
    }
    generateToken(user._id,res)
    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilePic:user.profilePic,
        message:'Signed in successfully'

    })
})

export const signout = asyncHandler(async(req,res)=>{
    res.clearCookie('jwt',{
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV !=='development'
    }).status(200)
    .json({
        success:true,
        message:'Signout successful'
    })
})
export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ message: "Profile pic is required" });
      }
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("error in update profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
export const checkAuth = asyncHandler(async(req,res)=>{
    res.status(200)
    .json(req.user)
})