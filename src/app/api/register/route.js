import mongoose from "mongoose";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req){
    const body = await req.json()
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Database connected for registration");

    const pass = body.password;

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    // const hashPassword = bcrypt.hashSync(notHashedPassword, salt);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
    body.password = hashedPassword;

    const createdUser = await User.create(body);
    return Response.json({ success: true, user: createdUser });
}