import dbConnect from "@/dbConfig/dbConfig";
import Blog from "@/modals/blogModal";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

dbConnect();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const blogs = await Blog.find({ author: userId }).limit(10);
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

