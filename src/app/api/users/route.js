import { User } from "@/app/models/user";
import mongoose from "mongoose";

export async function GET(){

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });  

    const users = await User.find();
    return Response.json(users);
}