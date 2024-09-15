import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { deleteUser, followUser, getFriends, getUser, unfollowUser, updateUser } from "../controllers/user.controller.js";
import { createPost, deletePost, fetchAllPosts, getAllLinkedPost, getPost, getPosts, likePost, updatePost } from "../controllers/post.controller.js";
const router = Router();

//auth route
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//user route
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);
router.route("/").get(getUser);
router.route("/follow/:id").put(followUser);
router.route("/unfollow/:id").put(unfollowUser);
router.route("/friends/:id").get(getFriends);

//post route
router.route("/posts/create").post(createPost);
router.route("/posts/:id").put(updatePost);
router.route("/posts/:id").delete(deletePost);
router.route("/posts/:id").get(getPost);
router.route("/posts/all/:username").get(getPosts);
router.route("/timeline/:userId").get(getAllLinkedPost);
router.route("/allPosts").get(fetchAllPosts);
//like post
router.route("/posts/likes/:id").put(likePost);
export default router;