import clientPromise from "@/lib/mongodb";

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db("Travlink");
  const collection = db.collection("travlinkusers");

  // sirf handle se user find
  const user = await collection.findOne(
    { handle: params.handle },
    {
      projection: {
        _id: 0,            // mongo ka id chhupao
        userEmail: 0,      // email ko public mat bhejo
      },
    }
  );

  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: true, message: "User not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, error: false, data: user }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
