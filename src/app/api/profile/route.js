import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/app/models/user";

export async function PUT(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const data = await req.json();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;

        // Ensure all fields are explicitly set
        const updateData = {
            name: data.name,
            image: data.image,
            phone: data.phone,
            streetAddress: data.streetAddress || "",
            zipCode: data.zipCode || "",
            city: data.city || "",
            country: data.country || "",
        };

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: updateData },  // Use $set to explicitly update the fields
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        return Response.json({ success: true, user: updatedUser });

    } catch (error) {
        console.error("Error updating profile:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const email = session.user.email;
    return Response.json(
        await User.findOne({email})
    )
}