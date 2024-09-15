import mongoose,{Schema} from "mongoose";

const postSchema = new Schema({
  postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  desc:{
    type:String,
    max:500
  },
  img:{
    type:String,
    default:""
  },
  likes:{
    type:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    default:[]
  }
},{timestamps:true});


export const Post = mongoose.model("Post",postSchema);