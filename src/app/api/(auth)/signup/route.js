
import dbConnect from "@/dbConfig/dbConfig";
import User from "@/modals/userModal";
import { NextResponse } from "next/server";

// Connect to DB
dbConnect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 });
        }
        const newUser = new User({
            username,
            email,
            password,
        });
        const savedUser = await newUser.save();
        const response = NextResponse.json(
            {
                message: "Signup success",
                success: true,
                user: savedUser,
            },
            { status: 200 }
        );
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
