import dbConnect from "@/dbConfig/dbConfig";
import User from "@/modals/userModal";
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { NextResponse } from "next/server";

// Connect to DB
dbConnect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Password doesn't match" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username:user.username,
    };

    const token = JsonWebToken.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login success",
        success: true,
        redirectUrl: user.isAdmin ? "/admin" : "/",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
