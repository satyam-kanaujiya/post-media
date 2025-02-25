import { User } from "../models/User.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/Post.model.js";
import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//create post

const createPost = asyncHandler(async (req,res)=>{
  console.log(req.files);
  const file = req.files?.postFile;
  console.log("file : ",file);

  let localPath = path.resolve(__dirname, '../../public/temp/', + Date.now() + `.${file.name.split(".")[1]}`); ;
  console.log("printing path: ",localPath);
  await file.mv(localPath,(error)=>{
      if(!error)console.log("NO error",error);
  });

  // validation
  const supportedType = ["jpeg","png","jpg"];
  const type = file.name.split(".")[1].toLowerCase();
  if(!supportedType.includes(type)){
     throw new ApiError("file type unsupported",403);
  }
  //upload on cloudinary
  let postUrl = "";
  try {
    postUrl = await uploadOnCloudinary(localPath, "socialMediav1",10);
  } catch (error) {
     throw new ApiError("image uploadation failed, please try again",403);
  }
  if(!postUrl)
  {
    return res.status(202).json({
      message:`Failed, please try again`,
      success:false,
    })
  }
  console.log("printing postFile",postUrl);

      const newPost = new Post({
        ...req.body,img:postUrl
      });
      const savedPost = await newPost.save();
      const findUser = await User.findById(savedPost.postedBy);
      res.status(201).json({
        message:`new post created by ${findUser.username}`,
        success:true,
        post:savedPost
      })
});

//update post
const updatePost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {postedBy} = req.body;
    const post = await Post.findById(id);
    if(!(postedBy!==post.postedBy))
    {
        throw new ApiError("you cannot update post of different user",400);
    }
   await post.updateOne({$set:req.body});
    res.status(201).json({
      message:"post updated successfully",
      success:true,
      post
    })
});

//delete post
const deletePost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {postedBy} = req.body;
    const post = await Post.findById(id);
    if(!(postedBy!==post.postedBy))
    {
        throw new ApiError("you cannot delete post of different user",400);
    }
   await post.deleteOne();
    res.status(201).json({
      message:"post deleted successfully",
      success:true,
    })
});

//like-unlike a post
const likePost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const {likedBy} = req.body;

    const post = await Post.findById(id);
    if(post.likes.includes(likedBy))
    {
       await post.updateOne({$pull:{likes:likedBy}});
       return res.status(201).json({
        message:"post has been unliked "
       })
    }

    await post.updateOne({$push:{likes:likedBy}});
    res.status(201).json({
      message:"post has been liked",
      success:true,
    })
});

//get a post
const getPost = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    
    const post = await Post.findById(id);
    res.status(201).json({
      message:"post fetched successfully",
      success:true,
      post
    })
});

//get all post of a user
const getPosts = asyncHandler(async (req,res)=>{
  const {username} = req.params;
  const user = await User.findOne({username:username});
  const userPosts = await Post.find({postedBy:user._id});
  res.status(201).json({
    message:"users all post fetched successfully",
    success:true,
    allPost:userPosts || []
  })
});

//get all post - all posts of user and all posts of user's following 
const getAllLinkedPost = asyncHandler(async (req,res)=>{
    const {userId} = req.params;
    // const {postedBy} = req.body;
    const user = await User.findById(userId);
    let userPosts = await Post.find({postedBy:user._id});
    const allFollowingPosts = await Promise.all(
        user.following.map(followingId => Post.find({postedBy:followingId}))
    );
    userPosts = userPosts.concat(...allFollowingPosts);
    res.status(201).json({
      message:"post fetched successfully",
      success:true,
      allPost:userPosts || [], 
      length:userPosts.length
    })
});

//get all post - all posts of user and all posts of user's following 
const fetchAllPosts = asyncHandler(async (req,res)=>{
  const userPosts = await Post.find();
  res.status(201).json({
    message:"all posts fetched successfully",
    success:true,
    allPost:userPosts || [],
    length:userPosts.length
  })
});

export {createPost,updatePost,deletePost,likePost,getPost,getPosts,getAllLinkedPost,fetchAllPosts};