import { getUsers } from "@/app/(Server)/lib/connectDB";

// Get Method
export async function GET(request) {
  try {
    // 1. You MUST await the collection/connection
    const userCollection = await getUsers();

    // 2. Await the database query
    const result = await userCollection
      .find()
      .sort({ created_at: -1 })
      .toArray();

    console.log(result);

    return Response.json(
      {
        message: "All data fetch successfully.",
        success: true,
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    // console.error("Database Error:", error);
    return Response.json(
      {
        message: "Failed to found users",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// Post Method
export async function POST(request) {
  try {
    const userCollection = await getUsers();
    const query = await request.json();

    // logic here.

    const data = {
      ...query,
      created_at: new Date(),
    };
    const result = await userCollection.insertOne(data);
    // console.log("query", query);
    return Response.json(
      {
        message: "Added User Data successfully.",
        success: true,
        result,
      },
      { status: 201 },
    );
  } catch (error) {
    // console.error("Database Error:", error);
    return Response.json(
      {
        message: "Failed to added user",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
