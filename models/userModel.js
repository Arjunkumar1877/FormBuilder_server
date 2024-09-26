import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
}, { timestamps: true });


userSchema.pre("save", async function(next) {
    if(this.isModified('password')){
       this.password = await bcrypt.hash(this.password, 8);
    }
    next();
})



export const UserModel = mongoose.model('User', userSchema);