import dbConnect from '@/dbConfig/dbConfig';
import Blog from '@/modals/blogModal';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

dbConnect();

export async function GET(req, { params }) {
  const blog = await Blog.findById(params.id);
  return NextResponse.json(blog);
}


// DELETE method
export async function DELETE(req,{ params }) {
  const blogId = params.id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
