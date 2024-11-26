import mongoose from "mongoose";
import { User } from "../../models/user";

export async function POST(req){
    // MongoUrl should be connected to the drivers in the mongoDb
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL);
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}