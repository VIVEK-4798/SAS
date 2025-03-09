import { User } from "@/app/models/user";
import mongoose from "mongoose";
import { isAdmin } from "../../../libs/authUtils";

export async function GET(){

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });  

    if (await isAdmin()) {
        const users = await User.find();
        return Response.json(users);
    }else{
        return Response.json([]);
    }
}
