import mongoose from "mongoose";
import { User } from "../../models/user";

export async function POST(req){
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL);

    const pass = body.password;

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    // const hashPassword = bcrypt.hashSync(notHashedPassword, salt);
    const hasedPassword = bcrypt.hashSync(notHashedPassword, salt);
    body.password = hasedPassword;

    const createdUser = await User.create(body);
    return Response.json(createdUser);
}