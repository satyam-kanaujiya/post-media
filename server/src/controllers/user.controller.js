import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const updateUser = asyncHandler(async (req,res)=>{;
    const {profileUrl} = req.body;
    if(!profileUrl)
    {
        return res.status(202).json({
        message:`Failed, please try again`,
        success:false,
        })
    }
    const {id} = req.params;
    
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
        message:"Profile updated successfully",
        success:true,
        data:sendData
    })
});

//delete user
const deleteUser = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {userId} = req.body;
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