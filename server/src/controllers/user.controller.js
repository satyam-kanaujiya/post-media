import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//update user - before updation hash password
const updateUser = asyncHandler(async (req,res)=>{
    // console.log(req.files);
    const file = req.files.profile;
    // console.log("file : ",file);

    let localPath = path.resolve(__dirname, '../../public/temp/', + Date.now() + `.${file.name.split(".")[1]}`); ;
    console.log("printing path: ",localPath);
    file.mv(localPath,(error)=>{
        if(!error)console.log("NO error",error);
    });

    // validation
    const supportedType = ["jpeg","png","jpg"];
    const type = file.name.split(".")[1].toLowerCase();
    if(!supportedType.includes(type)){
       throw new ApiError("file type unsupported",403);
    }
    // upload on cloudinary

    const profileUrl = await uploadOnCloudinary(localPath, "socialMediav1",10) || "";
    console.log("printing profileUrl",profileUrl);

    const {id} = req.params;
    // const {userId} = req.body;
    console.log(id);
    // console.log(userId);
    // if(id!=userId && !req.body.isAdmin){
    //     throw new ApiError("you cannot update someone else's profile",400);
    // }
    // if(req.body.password){
    //      req.body.password = await bcrypt.hash(req.body.password,10);
    // }
    const user = await User.findByIdAndUpdate(
        id,
        {
            $set:{
                profilePicture:profileUrl
            }
        },
        {new:true}
    );

    if(!user)
    {
        throw new ApiError("user not found",404);
    }

    const sendData = await User.findOne({_id:user._id});
    sendData.password = undefined;
    res.status(200).json({
        message:"Account updated successfully",
        success:true,
        data:sendData
    })
});

//delete user
const deleteUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;
    console.log(id);
    console.log(userId);
    if(id!=userId && !req.body.isAdmin){
        throw new ApiError("you cannot delete someone else's profile",400);
    }
    
    const user = await User.findByIdAndDelete(id,{new:true});

    if(!user)
    {
        throw new ApiError("user not found",404);
    }
    res.status(200).json({
        message:"Account deleted successfully",
        success:true,
    })
});

//get user
const getUser = asyncHandler(async (req,res)=>{
    const {id,username} = req.query;
    
    const user = id ? await User.findById(id):await User.findOne({username:username});

    if(!user)
    {
        throw new ApiError("user not found",404);
    }
    user.password = undefined;
    res.status(200).json({
        message:"User fetched successfully",
        success:true,
        user
    })
});

//get friends
const getFriends = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.id);   
    const friends = await Promise.all(
        user.following.map(followingId=>{
            return User.findById(followingId).select("_id username profilePicture");
        })
    )
    
    res.status(200).json({
        message:"User following fetched successfully",
        success:true,
        friends:friends || []
    })
});

//follow user
const followUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;

    const followUser = await User.findById(id);
    const followingUser = await User.findById(userId);

    console.log("ia m working");

    if(id === userId ){
        throw new ApiError("you cannot follow yourself",400);
    }

    if(followingUser.following.includes(id))
    {
        throw new ApiError(`you already follow ${followUser.username}`,400)
    }
     
    const followUpdatedUser = await User.findByIdAndUpdate(
        id,
        {
            $push:{followers:userId}
        },
        {new:true}
    ).select("-password");
    if(!followUser){
        throw new ApiError("follow user not found",404);
    }

    const followingUpdatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $push:{following:id}
        },
        {new:true}
    ).select("-password");
    if(!followingUser){
        throw new ApiError("following user not found",404);
    }

    res.status(200).json({
        message:`${followUpdatedUser.username} is followed by ${followingUpdatedUser.username}`,
        success:true,
        followUpdatedUser,
        followingUpdatedUser
    });
});

//Unfollow user
const unfollowUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;

    if(id === userId ){
        throw new ApiError("you cannot unfollow yourself",400);
    }

    const followUser = await User.findById(id);
    const followingUser = await User.findById(userId);
    
    if(!followingUser.following.includes(id))
    {
        throw new ApiError(`you don't follow ${followUser.username}`,400)
    }
     
    const followUpdatedUser = await User.findByIdAndUpdate(
        id,
        {
            $pull:{followers:userId}
        },
        {new:true}
    ).select("-password");
    if(!followUser){
        throw new ApiError("follow user not found",404);
    }

    const followingUpdatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $pull:{following:id}
        },
        {new:true}
    ).select("-password");
    if(!followingUser){
        throw new ApiError("following user not found",404);
    }

    res.status(200).json({
        message:`you unfollowed ${followUpdatedUser.username}}`,
        success:true,
        followUpdatedUser,
        followingUpdatedUser
    });
});

export {updateUser,deleteUser,getUser,followUser,unfollowUser,getFriends};