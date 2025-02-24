import { Category } from "@/app/models/Category";
import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const data = await req.json();

    // Ensure category exists and is a valid ObjectId
    if (!data.category || !mongoose.Types.ObjectId.isValid(data.category)) {
        return Response.json({ error: "Invalid or missing category ID" }, { status: 400 });
    }

    try {
        const menuItemDoc = await MenuItem.create(data);
        return Response.json(menuItemDoc);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req){

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });  

    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data);
    return Response.json(true);

}

export async function GET(){

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });  
        return Response.json(
            await MenuItem.find()
        )
}

export async function DELETE(req){

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });  

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});

    return Response.json(true);
}