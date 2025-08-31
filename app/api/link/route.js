import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";   // ✅ clean import
import { ObjectId } from "mongodb";                // ✅ require hatao

// -------------------- POST --------------------
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("Travlink");
    const collection = db.collection("travlinkusers");

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ success: false, message: "Not Authenticated" }), { status: 401 });
    }

    const body = await request.json();

    const existingLink = await collection.findOne({ handle: body.handle, userEmail: session.user.email });
    if (existingLink) {
      return new Response(JSON.stringify({ success: false, message: "Your handle already exists" }), { status: 400 });
    }

    await collection.insertOne({
      handle: body.handle,
      description: body.description,
      links: body.links || [],
      profilePicture: body.profilePicture || "",
      userEmail: session.user.email,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, message: "Your TravLink created successfully" }), { status: 201 });
  } catch (err) {
    console.error("POST /api/link error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

// -------------------- GET --------------------
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("Travlink");
    const collection = db.collection("travlinkusers");

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ success: false, message: "Not Authenticated" }), { status: 401 });
    }

    const links = await collection.find({ userEmail: session.user.email }).toArray();
    return new Response(JSON.stringify({ success: true, data: links }), { status: 200 });
  } catch (err) {
    console.error("GET /api/link error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

// -------------------- PUT --------------------
export async function PUT(request) {
  try {
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
      { _id: new ObjectId(id), userEmail: session.user.email },
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
  } catch (err) {
    console.error("PUT /api/link error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

// -------------------- DELETE --------------------
export async function DELETE(request) {
  try {
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

    await collection.deleteOne({ _id: new ObjectId(id), userEmail: session.user.email });

    return new Response(JSON.stringify({ success: true, message: "Travlink deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error("DELETE /api/link error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
