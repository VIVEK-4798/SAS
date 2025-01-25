import bcrypt from 'bcryptjs';
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        validate: pass => {
            if(!pass?.length || pass.length < 5){
                new Error('Password must be at least 5 characters');
                return false;
            }
        }
    }
}, 
{timestamps: true});

UserSchema.post('validate', (user) => {
    const notHashedPassword = user.password;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(notHashedPassword, salt);
    user.password = hashPassword;
})

export const User = models?.User || model('User', UserSchema);