import mongoose,{Mongoose, Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        min:6,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        default:[]
    },
    following:{
        type:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50,
        default:""
    },
    from:{
        type:String,
        max:50,
        default:""
    },
    relationship:{
        type:String,
        enum:["single","married","complicated"]
    }
},{timestamps:true});

userSchema.set("toJSON",{
    transform:(doc,ret)=>{
        delete ret.password;
        delete ret.__v;
    }
});
userSchema.set("toObject",{
    transform:(doc,ret)=>{
        delete ret.password;
        delete ret.__v;
    }
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}


export const User = mongoose.model("User",userSchema);