import { Schema, model} from 'mongoose';

const userSchema = new Schema({
 username: {type:String, required: true, unique: true},
 email: {type: String, required: true, unique: true},
 password: {type: String, required: true},
 profileImage: {type: String, required: false},
 address: {type: String, required: false},
role: {type: String, required: true, default: "customer"}
}, {
    timestamps: true,
});

export const UserModel = model('User', userSchema);