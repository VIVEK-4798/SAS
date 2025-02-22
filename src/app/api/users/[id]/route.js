import { UserInfo } from '@/app/models/UserInfo';
import { User } from '../../../models/user';
import mongoose from "mongoose";

export async function GET(req, { params }) {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const id = req.nextUrl.pathname.split('/').pop();

    try {
        const user = await User.findById(id);
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        let userInfo = await UserInfo.findOne({ email: user.email });

        if (!userInfo) {
            userInfo = await UserInfo.create({
                email: user.email,
                city: '',
                country: '',
                phone: '',
                streetAddress: '',
                zipCode:'',
            });
        }

        return new Response(JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
            userInfo, 
        }), { status: 200 });

    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(JSON.stringify({ error: 'Error fetching user' }), { status: 500 });
    }
}


export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const id = req.nextUrl.pathname.split('/').pop();
    const body = await req.json();

    try {
        const user = await User.findByIdAndUpdate(id, {
            name: body.name,
            image: body.image,
        }, { new: true });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        console.log("Incoming userInfo:", body.userInfo); // ✅ Debugging

        const userInfo = await UserInfo.findOneAndUpdate(
            { email: user.email }, 
            { 
                $set: {
                    city: body.userInfo.city || '',
                    country: body.userInfo.country || '',
                    phone: body.userInfo.phone || '',
                    zipCode: body.userInfo.zipCode || '',
                    streetAddress: body.userInfo.streetAddress || '',
                },
            },
            { new: true, upsert: true } // ✅ Ensure update & create if missing
        );

        console.log("Updated userInfo:", userInfo); // ✅ Debugging

        return new Response(JSON.stringify({
            message: 'User updated successfully',
            user,
            userInfo,
        }), { status: 200 });

    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ error: 'Error updating user' }), { status: 500 });
    }
}

