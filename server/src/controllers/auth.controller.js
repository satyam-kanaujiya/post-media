import { User } from "../models/User.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req,res)=>{
    const {username,password,email,city,relationship,from,desc} = req.body;

    if([username,password,email].some((field)=>field.trim()===""))
    {
        throw new ApiError("Please fill all the fields",400);
    }

    if(!email.includes('@'))
    {
        throw new ApiError("Please enter valid email");
    }

    const checkUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(checkUser)
    {
        throw new ApiError("user already exist",400);
    }

    const profilePicture = "";
    const coverPicture = "";

    const user = await User.create({
        username:username.trim(),
        password,email:email.trim(),
        profilePicture,
        coverPicture,
        city: city || "",
        from: from || "",
        relationship: relationship  || "single",
        desc: desc || ""
    });

    if(!user)
    {
        throw new ApiError("something went wrong while registering the user",500);
    }

    const getUser = await User.findById(user._id).select("-password");

    res.status(201).json({
        message:"User created successfully",
        success:true,
        data:getUser
    });
});


const loginUser = asyncHandler(async (req,res)=>{
    const {username,password,email} = req.body;

    console.log(req.body);

    if([username,password,email].some((field)=>field.trim()===""))
    {
        throw new ApiError("Please fill all the fields",400);
    }

    if(!email.includes('@'))
    {
        throw new ApiError("Please enter valid email");
    }

   
    
    const checkUser = await User.findOne({
        $and:[{username},{email}]
    })
    
    if(!checkUser)
    {
        throw new ApiError("user not found",403);
    }

    const checkPassword = await checkUser.isPasswordCorrect(password);
    console.log("printing password condition ",checkPassword);   
    if(!checkPassword){
        throw new ApiError("incorrect password",403);
    }

    const user = await User.findById(checkUser._id).select("-password");
    return res.status(201).json({
        message:"user logged in",
        success:true,               
        data:user,
    });
    
});

export {registerUser,loginUser};