import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; 
const { ObjectId } = require("mongodb");

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("Travlink");
  const collection = db.collection("travlinkusers");

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ success: false, message: "Not Authenticated" }), { status: 401 });
  }

  const body = await request.json();

  // handle duplicate check for same user
  const existingLink = await collection.findOne({ handle: body.handle, userEmail: session.user.email });
  if (existingLink) {
    return new Response(JSON.stringify({ success: false, message: "Your handle already exists" }), { status: 400 });
  }

  await collection.insertOne({
    handle: body.handle,
    description: body.description,
    links: body.links || [],
    profilePicture: body.profilePicture || "",
    userEmail: session.user.email,  // 👈 kaun user hai
    createdAt: new Date(),
  });

  return new Response(JSON.stringify({ success: true, message: "Your TravLink created successfully" }), { status: 201 });
}

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db("Travlink");
  const collection = db.collection("travlinkusers");

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ success: false, message: "Not Authenticated" }), { status: 401 });
  }

  // 👇 ab sirf apne Travlinks dikhayenge
  const links = await collection.find({ userEmail: session.user.email }).toArray();

  return new Response(JSON.stringify({ success: true, data: links }), { status: 200 });
}

export async function PUT(request) {
  const client = await clientPromise;
  const db = client.db("Travlink");
  const collection = db.collection("travlinkusers");

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ success: false, message: "Not Authenticated" }), { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ success: false, message: "ID is required" }), { status: 400 });
  }

  const body = await request.json();
  await collection.updateOne(
    { _id: new ObjectId(id), userEmail: session.user.email }, // 👈 ensure only owner can update
    {
      $set: {
        handle: body.handle,
        description: body.description,
        links: body.links,
        profilePicture: body.profilePicture,
      },
    }
  );

  return new Response(JSON.stringify({ success: true, message: "Your TravLink updated successfully" }), { status: 200 });
}

export async function DELETE(request) {
  const client = await clientPromise;
  const db = client.db("Travlink");
  const collection = db.collection("travlinkusers");

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ success: false, message: "Not Authenticated" }), { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new Response(JSON.stringify({ success: false, message: "ID required" }), { status: 400 });
  }

  await collection.deleteOne({ _id: new ObjectId(id), userEmail: session.user.email }); // 👈 sirf owner delete kar paaye

  return new Response(JSON.stringify({ success: true, message: "Travlink deleted successfully" }), { status: 200 });
}
