import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  const { email } = await req.json();

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        msg: ["Email already exists"],
        success: true,
      });
    }

    await User.create({ email });

    return NextResponse.json({
      msg: ["Email recorded successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      console.error("Error recording email:", error);
      return NextResponse.json({ msg: ["Unable to record email."] });
    }
  }
}
