import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../libs/authOptions";
import { User } from "@/app/models/user";
import { UserInfo } from "@/app/models/UserInfo";

export async function PUT(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const data = await req.json();
        
        const { _id, name, image, userInfo } = data; 
         
        const session = await getServerSession(authOptions);  
        
        if (_id) {
            await User.findOneAndUpdate(
                { _id },
                { $set: { name, image } },
                { new: true, runValidators: true }
            );

            if (userInfo) {
                await UserInfo.findOneAndUpdate(
                    { userId: _id },
                    { $set: userInfo },
                    { new: true, runValidators: true, upsert: true }
                );
            }
        } else {
            if (!session?.user?.email) {
                return Response.json({ error: "Unauthorized" }, { status: 401 });
            }
    
            const email = session.user.email;
    
            if (!email) {
                return Response.json({});
            }

            const updateUserInfoData = userInfo || {};

            await User.findOneAndUpdate(
                { email },
                { $set: { name, image } },
                { new: true, runValidators: true }
            );

            const updatedUserInfo = await UserInfo.findOneAndUpdate(
                { email },
                { $set: updateUserInfoData },  
                { new: true, runValidators: true, upsert: true }
            );

            const updatedUser = await User.findOne({ email }).select("name email image emailVerified").lean();

            if (!updatedUser) {
                return Response.json({ error: "User not found" }, { status: 404 });
            }
    
            return Response.json({ success: true, user: updatedUser, userInfo: updatedUserInfo || {} });
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET() {
    try {
            await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        const user = await User.findOne({ email });
        const userInfo = await UserInfo.findOne({ email });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        return Response.json({
            success: true,
            user,
            userInfo: userInfo || {} 
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        return Response.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
    }
}
