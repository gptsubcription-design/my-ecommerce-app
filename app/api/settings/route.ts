import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

// ১. ডাটাবেস থেকে সেটিংস ফেচ করার জন্য (GET)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("onecarta"); // আপনার ডাটাবেসের নাম

    // 'global' টাইপের একটি মাত্র ডকুমেন্ট আমরা খুঁজব
    const settings = await db.collection("settings").findOne({ type: "global" });

    if (!settings) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// ২. ডাটাবেসে নতুন সেটিংস সেভ বা আপডেট করার জন্য (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("onecarta");

    // ডাটাবেসে সেভ করার লজিক (upsert: true মানে হলো আগে না থাকলে নতুন তৈরি করবে, আর থাকলে আপডেট করবে)
    const result = await db.collection("settings").updateOne(
      { type: "global" }, 
      { 
        $set: { 
          ...body, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );

    return NextResponse.json({ message: "Settings saved successfully", result }, { status: 200 });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}