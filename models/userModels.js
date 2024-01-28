import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type: String
    },
    lastName:{
        type: String,
        default: 'lastName'
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    location:{
        type: String,
        default: "myCity"
    },
    role:{
        type: String,
        enum:["admin", "user"],
        default:"user"
    }

})

UserSchema.methods.toJSON = function () {
    let obj = this.toObject()
    delete obj.password;
    return obj
}

export default mongoose.model('User', UserSchema)