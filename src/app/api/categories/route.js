import { Category } from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req){

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });    

        const { name } = await req.json();

        const categoryDoc = await Category.create({ name });
        return Response.json(categoryDoc);
      
}

export async function PUT(req){

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });  

    const {_id, name} = await req.json();
    await Category.updateOne({_id}, {name});
    return Response.json(true);

}
export async function GET(){

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });  

    return Response.json(
        await Category.find()
    )

}
export async function DELETE(req){

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });  

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({_id});

    return Response.json(true);
}