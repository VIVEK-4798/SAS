import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/user";

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
        return Response.json({ success: false, message: "User not authenticated" }, { status: 401 });
    }

    const update = {};
    if (data.name) update.name = data.name;
    if (data.image) update.image = data.image;

    if (Object.keys(update).length > 0) {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return Response.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return Response.json({ success: true, user: updatedUser });
    }

    return Response.json({ success: false, message: "No updates provided" }, { status: 400 });
}
