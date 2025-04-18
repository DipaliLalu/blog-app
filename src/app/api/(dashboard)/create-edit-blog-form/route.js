import dbConnect from "@/dbConfig/dbConfig";
import Blog from "@/modals/blogModal";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Connect to DB
dbConnect();

export async function POST(req) {
    try {
        // Get token from cookies
        const token = cookies().get("token")?.value;
        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        // Decode token to get user
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // adjust to your JWT secret
        const userId = decoded.id;

        const reqBody = await req.json();
        const { title, description, image, content, taglist } = reqBody;

        const blogExits = await Blog.findOne({ title });

        if (blogExits) {
            return NextResponse.json({ error: "Title already exist" }, { status: 400 });
        }
        const newBlog = new Blog({
            title,
            description,
            image,
            content,
            taglist,
            author:userId,
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
