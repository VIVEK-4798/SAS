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
    const page = parseInt(url.searchParams.get('page') || "1");
    const limit = parseInt(url.searchParams.get('limit') || "10");
    const skip = (page - 1) * limit;

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return Response.json({ error: "Order not found" }, { status: 404 });
      }
      return Response.json(order);
    }

    if (admin) {
      const totalOrders = await Order.countDocuments();
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return Response.json({ orders, totalOrders });
    }

    if (userEmail) {
      const userOrders = await Order.find({ userEmail }).sort({ createdAt: -1 });
      return Response.json({ orders: userOrders, totalOrders: userOrders.length });
    }

    return Response.json({ error: "No orders found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const session = await getServerSession(authOptions);
    if (!session || !(await isAdmin())) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return Response.json({ error: "Missing order ID" }, { status: 400 });
    }

    await Order.findByIdAndDelete(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting order:", error);
    return Response.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
