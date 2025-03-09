import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { isAdmin } from "../../../libs/authUtils";
import { authOptions } from "../../../libs/authOptions";
import { Order } from "@/app/models/Order";

export async function GET(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = session?.user?.email;
        const admin = await isAdmin();

        const url = new URL(req.url);
        const _id = url.searchParams.get('_id');

        if (_id) {
            const order = await Order.findById(_id);
            if (!order) {
                return Response.json({ error: "Order not found" }, { status: 404 });
            }
            return Response.json(order);
        }

        if (admin) {
            return Response.json(await Order.find().sort({ createdAt: -1 }));
        }

        if (userEmail) {
            const userOrders = await Order.find({ userEmail }).sort({ createdAt: -1 });
            return Response.json(userOrders);
        }

        return Response.json({ error: "No orders found" }, { status: 404 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
