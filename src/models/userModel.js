import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username :{ 
        type : String,
        required : true,
        unique : true,
    },
    email : {
       type:  String,
       required : true,
    }, 
    password : {
        type :String,
        required : true
    },

    role : {
        type : String,
        required : true,
        enum : ["admin", "author", "reader"],
        default : "reader"
    }
},
    {
        timestamps : true, 
    }
);

const User = mongoose.model("User", userSchema);
export default User;