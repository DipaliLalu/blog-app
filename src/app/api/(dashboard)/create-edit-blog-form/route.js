import dbConnect from "@/dbConfig/dbConfig";
import Blog from "@/modals/blogModal";
import { NextResponse } from "next/server";

// Connect to DB
dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { title, description, image, content,taglist } = reqBody;

        const blogExits = await Blog.findOne({ title });
        if (blogExits) {
            return NextResponse.json({ error: "Title already exist" }, { status: 400 });
        }
        const newBlog = new Blog({
            title,
            description,
            image: image?.path || image,
            content,
            taglist
        });
        const savedBlog = await newBlog.save();
        const response = NextResponse.json(
            {
                message: "Blog created success",
                success: true,
                blog: savedBlog,
            },
            { status: 200 }
        );
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
