import dbConnect from "@/dbConfig/dbConfig";
import Blog from "@/modals/blogModal";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Connect to DB
dbConnect();

export async function POST(req) {
    try {
        const token = cookies().get("token")?.value;
        if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.id;

        const reqBody = await req.json();
        const { _id, title, description, image, content, taglist } = reqBody;

        if (_id) {
            // EDIT blog — do not update title
            const updatedBlog = await Blog.findByIdAndUpdate(
              _id,
              {
                description,
                image,
                content,
                taglist,
              },
              { new: true }
            );
          
            return NextResponse.json({ message: "Blog updated", blog: updatedBlog,success: "update", });
          } else {
            // CREATE blog — check title uniqueness
            const blogExists = await Blog.findOne({ title });
            if (blogExists) {
              return NextResponse.json({ error: "Title already exists" }, { status: 400 });
            }
          
            const newBlog = new Blog({
              title,
              description,
              image,
              content,
              taglist,
              author: userId,
            });
          
            const savedBlog = await newBlog.save();
          
            return NextResponse.json({
              message: "Blog created successfully",
              success: true,
              blog: savedBlog,
            }, { status: 201 });
          }
          
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
